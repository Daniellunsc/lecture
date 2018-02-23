import React, {Component} from 'react'
import {Button, Icon, Modal} from 'semantic-ui-react'

class AddPost extends Component {
  render(){
    return(
      <Button animated floated='right' positive>
        <Button.Content visible>Add Post</Button.Content>
        <Button.Content hidden>
          <Icon name='plus'/>
        </Button.Content>
      </Button>
    )
  }
}

export default AddPost