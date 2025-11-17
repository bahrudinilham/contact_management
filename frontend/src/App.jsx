import {Component} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// Layout
import PrePageLayout from './layouts/prepageLayout/PrePageLayout';

// Component
import RegisterForm from './components/registerForm/RegisterForm';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrePageLayout />}>
            <Route path="/register" element={<RegisterForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
