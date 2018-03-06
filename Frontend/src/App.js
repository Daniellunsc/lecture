import React, { Component } from 'react';
import PageHeader from './components/PageHeader'
import PostDetails from './components/PostDetails'
import PostContainer from './components/PostContainer'
import {Container} from 'semantic-ui-react'
import './App.css';
import {Route, Switch} from 'react-router-dom'
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';

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
          <Route exact path='/p/:category' component={PostContainer} />
          <Route exact path='/p/:category/:postID' component={PostDetails} />
          <Route exact path='/add' component={AddPost} />
          <Route exact path='/e/:postID' component={EditPost} />
           
          </Switch>
        
        </Container>   
    );
  }
}

export default App;
