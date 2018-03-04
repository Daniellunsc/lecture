import React from 'react'
import AddPost from '../components/AddPost'
import {Segment, Label, Divider} from 'semantic-ui-react'

const NoPost = () => (
    <Segment clearing>
        <Label color='blue' size='large' attached='top'>
            No Post Found :(
        </Label> 
        <Divider hidden></Divider>  
        <label>Click on the button to add a post!</label><AddPost />
     </Segment>
)

export default NoPost