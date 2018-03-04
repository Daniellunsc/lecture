import React from 'react'
import AddPost from '../components/AddPost'
import {Segment, Label, Divider} from 'semantic-ui-react'

const NoPosts = () => (
    <Segment>
        <Label color='blue' size='large' attached='top'>
            No Posts Found :(
        </Label> 
        <Divider hidden></Divider>  
        <label>Click on the button to add a post!</label>
        <AddPost />
     </Segment>
)

export default NoPosts