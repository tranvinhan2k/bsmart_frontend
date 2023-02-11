// import defaultTheme from '@themes/index';
import { ThemeProvider } from '@mui/material';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import MainRoute from '~/routes/MainRoute';
import store from '~/redux/store';
import defaultTheme from '~/themes';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<MainRoute />} />
    </Routes>
  );
}

const queryClient = new QueryClient();

function Wrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          <HashRouter>
            <App />
          </HashRouter>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default Wrapper;
