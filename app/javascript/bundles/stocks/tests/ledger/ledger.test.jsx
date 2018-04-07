import React from 'react';
import App from '../../components/app/app';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import $ from 'jquery';
import Ledger from '../../components/ledger/ledger';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
global.$ = global.jQuery = $;
configure({ adapter: new Adapter() });
import { MemoryRouter as Router, withRouter } from 'react-router-dom' // 4.0.0

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
};
global.localStorage = new LocalStorageMock;

it('Navbar component renders the navbar correctly', () => {
  const rendered = renderer.create(
     <Router><App ><Ledger/></App></Router>
    );

  expect(rendered.toJSON()).toMatchSnapshot();
})