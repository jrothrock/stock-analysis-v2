import React from 'react';
import App from '../../components/app/app';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import $ from 'jquery';
import Home from '../../components/home/home';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
global.$ = global.jQuery = $;
configure({ adapter: new Adapter() });
import { MemoryRouter as Router, withRouter } from 'react-router-dom' // 4.0.0

it('Home component renders the home correctly', () => {
  const rendered = renderer.create(
     <Router><App ><Home/></App></Router>
    );

  expect(rendered.toJSON()).toMatchSnapshot();
})