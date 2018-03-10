import React from 'react'
import {Segment, Label, Divider, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const NoPosts = () => (
    <Segment>
        <Label color='blue' size='large' attached='top'>
            No Post Found :(
        </Label> 
        <Divider hidden></Divider>  
        <label>Click on the button to add a post!</label>
        <Divider hidden></Divider>
        <Button as={Link} to={'/add'} fluid positive size='tiny'>Add Post</Button>
    </Segment>
)

export default NoPosts