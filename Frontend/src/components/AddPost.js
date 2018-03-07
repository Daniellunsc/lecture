import React, {Component} from 'react'
import {Segment, Form, Label, Icon} from 'semantic-ui-react'
import * as Helpers from '../utils/Helpers'
import * as API from '../utils/API'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


class AddPost extends Component {

    state = {
        title:'',
        body: '',
        author: '',
        category: 'react',
        fireRedirect: false,
        newPostID: '',
      }

    handleFormEdit = (e, { name, value }) => this.setState({ [name]: value })
    handleSubmit = () => {
        API.MakePost(this.state)
          .then(res=>this.setState({newPostID: res.id}))
          .then(res=>this.setState({fireRedirect:true}))   
    }

    render(){
        const {title, body, author, category, fireRedirect, newPostID} = this.state
        const {categories} = this.props
        return(
           <Segment>
                <Label attached='top' color='blue'>
                <Icon name='arrow circle left' onClick={()=>this.props.history.goBack()}/>
                    Create new post
                </Label>
                <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <Form.Input required fluid label='Post Title' name='title' value={title} placeholder='The main content of the post' onChange={this.handleFormEdit}/>
                </Form.Field>
                <Form.Field>
                  <Form.TextArea required label='Post Description' name='body' value={body} placeholder='Write about...' onChange={this.handleFormEdit}/>
                </Form.Field>
                <Form.Field>
                  <Form.Input required fluid label='Author' name='author' value={author} placeholder='Tell us your name or nickname' onChange={this.handleFormEdit}/>
                </Form.Field>
                {
                Helpers.isNotEmpty(categories) && 
                <Form.Field>
                  <Form.Select required fluid label='Category' name='category' options={categories} value={category} placeholder='Category' onChange={this.handleFormEdit}/>
                </Form.Field>
                }
                <Form.Button content='Add new post' positive/>
              </Form>             
              {
                fireRedirect && <Redirect to={`/p/${category}/${newPostID}`} />
              }
           </Segment>
        )
    }
}

function MapStateToProps({categoriesReducer, postsReducer}){
    return{
        categories : categoriesReducer.categories.map(cat => {
         return {
           ...cat,
           key: cat.name,
           value: cat.name,
           text: cat.name
         }
        }),
    }
  }

  export default connect(MapStateToProps, null)(AddPost)