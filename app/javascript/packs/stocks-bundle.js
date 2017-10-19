import ReactOnRails from 'react-on-rails';

import Stocks from '../bundles/stocks/components/stocks';

// This is how react_on_rails can see the stocks in the browser.
ReactOnRails.register({
  Stocks,
});
