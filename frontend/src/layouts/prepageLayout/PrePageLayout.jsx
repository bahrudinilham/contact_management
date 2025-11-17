import {Component} from 'react';
import style from './prepageLayout.module.css';
import {Outlet} from 'react-router-dom';

export default class PrePageLayout extends Component {
  render() {
    return (
      <div className={`${style.prepage_layout}`}>
        <Outlet />
      </div>
    );
  }
}
