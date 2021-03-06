import React from 'react';
import App from '../../components/app/app';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import $ from 'jquery';
import SignUp from '../../components/auth/signup';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
global.$ = global.jQuery = $;
configure({ adapter: new Adapter() });
import { MemoryRouter as Router, withRouter } from 'react-router-dom' // 4.0.0

it('Signin component renders the signin correctly', () => {
  const rendered = renderer.create(
     <Router><App ><SignUp updateSignedIn="False"/></App></Router>
    );

  expect(rendered.toJSON()).toMatchSnapshot();
})