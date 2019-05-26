import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import orange from '@material-ui/core/colors/orange';
import Header from "../src/AppBar";
import TextPage from "../src/TextPage";
import styled from 'styled-components'
import ArrayTextsPage from "../src/ArrayTextsPage";

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: orange,
  },
});

const TabContainer = styled(Paper)`
  margin: 20px;
  padding: 20px;
`

class App extends Component {

  state = {
    value: 0
  }

  handleChangeTabs = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state
    return (
      <MuiThemeProvider theme={theme}>
        <Header />

        <AppBar position="static" color="default">
          <Tabs
              value={value}
              onChange={this.handleChangeTabs}
              indicatorColor="primary"
              textColor="primary"
          >
            <Tab label="Classify Text" />
            <Tab label="Classify Array of Texts" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>
                            <TextPage />
                        </TabContainer>}
        {value === 1 && <TabContainer>
                            <ArrayTextsPage />
                        </TabContainer>}

      </MuiThemeProvider>
    );
  }
}

export default App;
