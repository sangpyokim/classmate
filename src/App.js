import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter';
import GlobalStyles from './components/GlobalStyles';
import { ThemeProvider } from 'styled-components'
import theme from './components/theme'


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme} >
        <GlobalStyles />
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
