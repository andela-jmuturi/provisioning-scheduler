import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { AppHeaderContainer } from './containers';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#9ac433'
  }
});

const App = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className='row'>
      <div className='col-xs-12'>
        <AppHeaderContainer />
        <div className='container'>
          <h1>Hello World!</h1>
        </div>
      </div>
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: React.PropTypes.node
};

export default App;
