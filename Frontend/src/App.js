import React, { Component } from 'react';
import PageHeader from './components/PageHeader'
import PostSection from './components/PostSection'
import PostByCategory from './components/PostByCategory'
import PostDetails from './components/PostDetails'
import {Container} from 'semantic-ui-react'
import './App.css';
import {Route, Switch} from 'react-router-dom'

class App extends Component {

  render() {

    return (
        <Container>

          <PageHeader />

          <Switch>
            <Route exact path='/' render={()=>(
              <PostSection />
            )} />

            <Route exact path='/:category' component={PostByCategory} />
            <Route path='/:category/:postID' component={PostDetails} />
          </Switch>
        
        </Container>   
    );
  }
}

export default App;
