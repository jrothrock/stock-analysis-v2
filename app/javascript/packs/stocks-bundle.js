import ReactOnRails from 'react-on-rails';

import App from '../bundles/stocks/components/app';
import Home from '../bundles/stocks/components/home';
import Navbar from '../bundles/stocks/components/navbar';
import Signin from '../bundles/stocks/components/signin';
import Signup from '../bundles/stocks/components/signup';

// This is how react_on_rails can see the stocks in the browser.
ReactOnRails.register({
  App,
  Home,
  Navbar,
  Signin,
  Signup
});
