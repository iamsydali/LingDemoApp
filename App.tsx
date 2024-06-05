import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import LeaderBoardScreen from './src/screens/LeaderBoardScreen';
import {ThemeProvider} from 'styled-components';
import {theme} from './src/theme/theme';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LeaderBoardScreen />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
