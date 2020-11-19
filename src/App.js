import Home from './views/Home';
import Jackets from './views/Jackets';
import Shirts from './views/Shirts';
import Accessories from './views/Accessories';
import SideBar from './components/Sidebar';
import './App.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


// This for changing the primary color for the themes
const theme = createMuiTheme({
  palette: { 
    primary: {
      main: '#1c6644',
    },
  },
  typography: {
    fontFamily: [
      "Jost"
    ].join(',')
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
      }
    },
    MuiList: {
      root: {
        "& .MuiButton-root.active": {
          backgroundColor: "#bcf5db",
          borderLeft: "5px solid #1c6644",
        },
        "& .MuiButton-root": {
          borderRadius: 0,
        }
      }
    },
    MuiTableCell: {
      root: {  //This can be referred from Material UI API documentation. 
          padding: '8px 8px',
      },
    }
  }  
});

const App = () => {


  return (
    <>
      <MuiThemeProvider theme={ theme }>
        <CssBaseline />
          <BrowserRouter>
            <aside>
              <SideBar />
            </aside>
            <Box 
              p={4} 
              pt={1}
              width={1} 
              bgcolor="#fcf8fd">
              <Switch>
                <Route exact path="/">
                  <Redirect to="/home"/>
                </Route>
                <Route exact path="/home" component={Home} />
                <Route exact path="/jackets" component={Jackets} />
                <Route exact path="/shirts" component={Shirts} />
                <Route exact path="/accessories" component={Accessories} />
                <Route render={()  => <h1>not-found</h1>} />
              </Switch>
            </Box>
          </BrowserRouter>
      </MuiThemeProvider>
    </>
  );
}


export default App;
