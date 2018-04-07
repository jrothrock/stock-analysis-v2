import React from 'react';
import App from '../../components/app/app';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import $ from 'jquery';
import Stock from '../../components/stock/stock';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
global.$ = global.jQuery = $;
configure({ adapter: new Adapter() });
import { MemoryRouter as Router, withRouter } from 'react-router-dom' // 4.0.0

it('Stock component renders the stock correctly', () => {
  const rendered = renderer.create(
     <Router><App ><Stock /></App></Router>
    );

  expect(rendered.toJSON()).toMatchSnapshot();
})