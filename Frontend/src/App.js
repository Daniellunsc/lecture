import React, { Component } from 'react';
import PageHeader from './components/PageHeader'
import PostDetails from './components/PostDetails'
import PostContainer from './components/PostContainer'
import {Container} from 'semantic-ui-react'
import './App.css';
import {Route, Switch} from 'react-router-dom'

class App extends Component {

  render() {

    return (
        <Container>

          <PageHeader />

          <Switch>

          {/*
              <Route path='/:category/:postID' component={PostDetails} />
          */}

          <Route exact path='/' component={PostContainer} />
          <Route exact path='/:category' component={PostContainer} />
           
          </Switch>
        
        </Container>   
    );
  }
}

export default App;
