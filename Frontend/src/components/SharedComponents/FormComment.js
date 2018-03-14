import React, {Component} from 'react'
import {Segment,Form, Button, Header} from 'semantic-ui-react'

class FormComment extends Component{

  state = {
    body: '',
  }

  handleFormEdit = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () =>{

    this.props.onSubmit(this.state)

    this.setState({
      body: '',
    })
    
  }

  render(){

    const {body} = this.state

    return(
      <Segment>
      <Header>Add a comment!</Header>
      <Form onSubmit={this.handleSubmit}>
        <Form.TextArea required name='body'  placeholder='Comment' value={body} onChange={this.handleFormEdit}/>
        <Button content='Send Comment' labelPosition='left' icon='edit' primary />
      </Form>
      </Segment>
    )
  }
}

export default FormComment

