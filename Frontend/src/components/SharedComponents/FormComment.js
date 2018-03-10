import React, {Component} from 'react'
import {Segment,Form, Button, Header} from 'semantic-ui-react'

class FormComment extends Component{

  state = {
    body: '',
  }

  handleFormEdit = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit(){

    this.setState({
      body: '',
    })

    this.props.onSubmit(this.state)

    
  }

  render(){

    const {body, author} = this.state

    return(
      <Segment>
      <Header>Add a comment!</Header>
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.TextArea required name='body'  placeholder='Comment' value={body} onChange={this.handleFormEdit}/>
        <Button content='Send Comment' labelPosition='left' icon='edit' primary />
      </Form>
      </Segment>
    )
  }
}

export default FormComment

