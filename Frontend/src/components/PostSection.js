import React, {Component} from 'react'
import PostList from './PostList'
import {Segment} from 'semantic-ui-react'

class PostSection extends Component{
    render () {
        return (
        <Segment>
            Post Section
            <PostList />
        </Segment>     
        )
    }
} 

export default PostSection