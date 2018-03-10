import React, { Component } from 'react';
import PageHeader from './components/SharedComponents/PageHeader'
import PostDetails from './components/Posts/PostDetails'
import PostContainer from './components/Posts/PostContainer'
import AddPost from './components/Posts/AddPost';
import EditPost from './components/Posts/EditPost';

import {Container} from 'semantic-ui-react'

import {Route, Switch, withRouter} from 'react-router-dom'

import LoginForm from './components/LoginForm/LoginForm'
import {connect} from 'react-redux'

import './App.css';

class App extends Component {

  render() {

    const {user} = this.props

    return (
        <Container>

          <PageHeader />

          <Switch>

          {/*
              <Route path='/:category/:postID' component={PostDetails} />
          */}

          <Route exact path='/' render={(props)=> user ? <PostContainer {...props}/> : <LoginForm />} />
          <Route exact path='/p/:category'render={(props)=> user ? <PostContainer {...props}/> : <LoginForm />} />
          <Route exact path='/p/:category/:postID' render={(props)=> user ? <PostDetails {...props}/> : <LoginForm />} />
          <Route exact path='/add' render={(props)=> user ? <AddPost {...props}/> : <LoginForm />}  />
          <Route exact path='/e/:postID' render={(props)=> user ? <EditPost {...props}/> : <LoginForm />} />
           
          </Switch>
        
        </Container>   
    );
  }
}

function mapStateToProps({loginReducer}){
  return{
    user: loginReducer.username
  }
}

export default withRouter(connect(mapStateToProps, null)(App));
