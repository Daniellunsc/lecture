import React, { Component } from 'react';
import PageHeader from './components/PageHeader'
import PostSection from './components/PostSection'
import PostByCategory from './components/PostByCategory'
import {Container} from 'semantic-ui-react'
import './App.css';
import {Route} from 'react-router-dom'

class App extends Component {

  onMenuClick = (item) => {
    console.log(item)
  }

  render() {
    
    

    return (
        <Container>

          <PageHeader onMenuClick={this.onMenuClick}/>
          
          <Route exact path='/' render={()=>(
            <PostSection />
          )} />

          <Route exact path='/:category' component={PostByCategory} />
          

        </Container>   
    );
  }
}

export default App;
