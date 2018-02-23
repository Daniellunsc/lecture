import React, {Component} from 'react'
import {Button, Icon, Modal, Header} from 'semantic-ui-react'

class AddPost extends Component {
  render(){
    return(
      <Modal trigger={
        <Button animated floated='right' positive>
          <Button.Content visible>Add Post</Button.Content>
            <Button.Content hidden>
              <Icon name='plus'/>
          </Button.Content>
        </Button>
      }>
      <Modal.Header>Add a post</Modal.Header>
      <Modal.Content>
        
      </Modal.Content>
    </Modal>
    )
  }
}

export default AddPost