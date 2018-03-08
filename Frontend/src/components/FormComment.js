import React, {Component} from 'react'
import {Segment,Form, Button, Header} from 'semantic-ui-react'

class FormComment extends Component{

  state = {
    body: '',
    author: ''
  }

  handleFormEdit = (e, { name, value }) => this.setState({ [name]: value })

  render(){

    const {body, author} = this.state

    return(
      <Segment>
      <Header>Add a comment!</Header>
      <Form onSubmit={() => this.props.onSubmit(this.state)}>
        <Form.Field>
          <Form.Input required name='author' placeholder='Author' value={author} onChange={this.handleFormEdit}/>
        </Form.Field>
        <Form.TextArea required name='body'  placeholder='Comment' value={body} onChange={this.handleFormEdit}/>
        <Button content='Send Comment' labelPosition='left' icon='edit' primary />
      </Form>
      </Segment>
    )
  }
}

export default FormComment

