import React, { Component } from 'react';
import PageHeader from './components/PageHeader'
import PostSection from './components/PostSection'
import PostByCategory from './components/PostByCategory'
import {Container} from 'semantic-ui-react'
import './App.css';
import {Route} from 'react-router-dom'

class App extends Component {

  render() {

    {/*

      DOC: O PostSection busca todos os posts SEM categoria
      DOC: O PostByCategory busca todos os posts baseados na categoria passada
      DOC: O Componente Post que vai fazer a renderização Baseada na Store.

    */}
    
    return (
        <Container>

          <PageHeader />
          
          <Route exact path='/' render={()=>(
            <PostSection />
          )} />

          <Route exact path='/:category' component={PostByCategory} />
          

        </Container>   
    );
  }
}

export default App;
