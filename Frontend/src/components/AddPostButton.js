import React, {Component} from 'react'
import {Button, Icon} from 'semantic-ui-react'

class AddPostButton extends Component {
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

export default AddPostButton