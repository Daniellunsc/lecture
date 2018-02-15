import React, { Component } from 'react';
import logo from './logo.svg';
import PageHeader from './components/PageHeader'
import {Container} from 'semantic-ui-react'
import './App.css';

class App extends Component {
  render() {
    return (
        <Container>
          <PageHeader />
        </Container>   
    );
  }
}

export default App;
