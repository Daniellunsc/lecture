import React, {Component} from 'react'
import { Button, Icon, Modal, Form, Loader} from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as API from '../utils/API'
import * as Helpers from '../utils/Helpers'
import {addPost} from '../actions/postsActions'

class AddPost extends Component {

  state = {
    modalOpen:false,
    title:'',
    body: '',
    author: '',
    category: 'react'
  }

  handleOpen = () => this.setState({modalOpen:true})
  handleClose = () => this.setState({modalOpen:false})
  handleFormEdit = (e, { name, value }) => this.setState({ [name]: value })
  handleClick = () => {

       API.MakePost(this.state).then(res=>{
         const {addNewPost} = this.props
        

         this.setState({
          title:'',
          body: '',
          author: '',
          modalOpen: false,
         })

         if(this.state.category == this.props.actualCategory) {
            addNewPost(res) 
         }
       })    

  }

  render(){

    const {title, body, author, category, loading} = this.state
    const {categories} = this.props
    return(
      <Modal 
      trigger={
        <Button animated floated='right' positive onClick={this.handleOpen} size='tiny'>
          <Button.Content visible>Add Post</Button.Content>
            <Button.Content hidden>
              <Icon name='plus'/>
          </Button.Content>
        </Button>
      }
      open={this.state.modalOpen}
      onClose={this.handleClose}
      >
      <Modal.Header>Add a post</Modal.Header>

      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <Form.Input fluid label='Post Title' name='title' value={title} placeholder='The main content of the post' onChange={this.handleFormEdit}/>
            </Form.Field>
            <Form.Field>
              <Form.TextArea label='Post Description' name='body' value={body} placeholder='Write about...' onChange={this.handleFormEdit}/>
            </Form.Field>
            <Form.Field>
              <Form.Input fluid label='Author' name='author' value={author} placeholder='Tell us your name or nickname' onChange={this.handleFormEdit}/>
            </Form.Field>
            {
            Helpers.isNotEmpty(categories) && 
            <Form.Field>
              <Form.Select fluid label='Category' name='category' options={
                categories.map(cat => {
                  cat.key = cat.name
                  cat.value = cat.name
                  cat.text = cat.name
                  return cat
                })
              } value={category} placeholder='Category' onChange={this.handleFormEdit}/>
            </Form.Field>
            }
          </Form>
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button color='green' onClick={this.handleClick}>
          Submit Post
        </Button>
        <Button color='red' onClick={this.handleClose}>
          Cancel
        </Button>
      </Modal.Actions>
      
    </Modal>
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

function mapDispatchToProps(dispatch) {
  return{
      addNewPost: (posts) => dispatch(addPost(posts))
  }  
}

export default connect(MapStateToProps, mapDispatchToProps)(AddPost)