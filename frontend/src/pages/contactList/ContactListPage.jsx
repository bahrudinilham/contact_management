import {Component} from 'react';
import style from './style.module.css';
import HeaderContent from '../../components/ui/headerContent/HeaderContent';
import SearchBar from '../../components/ui/searchbar/SearchBar';
import {Link} from 'react-router';
import {FaPlus} from 'react-icons/fa';
import ContactService from '../../services/ContactService';
import Helper from '../../libs/helpers';
import ContactGroup from '../../components/ui/contactGroup/ContactGroup';
import ContactCard from '../../components/ui/contactCard/ContactCard';
import Pagination from '../../components/ui/pagination/Pagination';
import withHooks from '../../libs/hoc/withHooks';
import {contactListHookMapper} from '../../libs/hooksMappers';

class ContactListPage extends Component {
  constructor(props) {
    super(props);

    const params = props.searchParams;
    const pageFromURL = Number(params.get('page')) || 1;
    const searchQueryFromURL = params.get('search') || '';

    this.state = {
      search: searchQueryFromURL,
      contacts: {},
      currentPage: pageFromURL,
      totalPage: null,
      isReload: false,
    };

    this.setSearchHandler = this.setSearchHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.submitSearchHandler = this.submitSearchHandler.bind(this);
    this.clearSearchHandler = this.clearSearchHandler.bind(this);
    this.fetchContacts = this.fetchContacts.bind(this);
    this.changePageHandler = this.changePageHandler.bind(this);
    this.reloadToggle = this.reloadToggle.bind(this);
  }

  async componentDidMount() {
    await this.fetchContacts();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      const newPage = Number(this.props.searchParams.get('page')) || 1;
      const newSearch = this.props.searchParams.get('search') || '';

      this.setState(
        {currentPage: newPage, search: newSearch},
        async () => await this.fetchContacts()
      );
    }

    if (prevState.isReload !== this.state.isReload) {
      await this.fetchContacts();
    }
  }

  setSearchHandler(value) {
    this.setState({
      search: value,
    });
  }

  submitSearchHandler(e) {
    e.preventDefault();

    this.searchHandler(this.state.search);
  }

  async clearSearchHandler() {
    this.setSearchHandler('');

    await this.fetchContacts();
  }

  changePageHandler(newPage) {
    const {navigate, searchParams} = this.props;

    searchParams.set('page', newPage);
    navigate(`?${searchParams.toString()}`);
  }

  searchHandler(keywords) {
    const {navigate, searchParams} = this.props;

    if (keywords) {
      searchParams.set('search', keywords);
    } else {
      searchParams.delete('search');
    }

    searchParams.delete('page');

    navigate(`?${searchParams.toString()}`);
  }

  async fetchContacts() {
    try {
      const response = await ContactService.contactList({
        keywords: this.state.search,
        page: this.state.currentPage,
      });

      if (response.status === 200) {
        const data = Helper.groupContactsByAlphabet(response.data.data);
        const labels = Helper.getAlphabet(data);
        this.setState({
          contacts: {
            labels: labels,
            data: data,
          },
          totalPage: response.data.paging.total_page,
        });
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  reloadToggle() {
    this.setState({
      isReload: !this.state.isReload,
    });
  }

  render() {
    return (
      <div className={`${style.contact_list}`}>
        <HeaderContent
          title={'Contacts'}
          backTo={this.state.search ? '/dashboard/contacts' : ''}
        />

        <main className={`${style.container}`}>
          <section className={`${style.header}`}>
            <SearchBar
              query={this.state.search}
              setQuery={(value) => this.setSearchHandler(value)}
              handleSubmit={(e) => this.submitSearchHandler(e)}
              handleClearQuery={async () => await this.clearSearchHandler()}
              className={`${style.searchbar}`}
            />

            <Link
              className={`${style.add_button}`}
              to={'/dashboard/contacts/add'}>
              <div className={`${style.icon_wrapper}`}>
                <FaPlus />
              </div>
              <span className={`${style.button_text}`}>Add New</span>
            </Link>
          </section>
          {JSON.stringify(this.state.contacts.data) !== '{}' ? (
            <section className={`${style.body}`}>
              {this.state.contacts.labels &&
              this.state.contacts.labels.length > 0
                ? this.state.contacts.labels.map((item) => {
                    return (
                      <ContactGroup title={item} key={item}>
                        {this.state.contacts.data[item]
                          ? this.state.contacts.data[item].map((contact) => {
                              return (
                                <ContactCard
                                  iddata={contact.id}
                                  firstname={contact.first_name}
                                  lastname={contact.last_name}
                                  key={contact.id}
                                  reloadtoggle={() => this.reloadToggle()}
                                />
                              );
                            })
                          : ''}
                      </ContactGroup>
                    );
                  })
                : ''}

              <Pagination
                currentPage={this.state.currentPage || 1}
                totalPage={this.state.totalPage || 1}
                onChangePage={(value) => this.changePageHandler(value)}
              />
            </section>
          ) : (
            <section>No Data Found</section>
          )}
        </main>
      </div>
    );
  }
}

const WithContactListPage = withHooks(contactListHookMapper)(ContactListPage);

export default WithContactListPage;
