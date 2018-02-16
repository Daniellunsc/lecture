import React, {Component} from 'react'
import {Segment} from 'semantic-ui-react'
import PostList from './PostList'

class PostByCategory extends Component{
    render () {
        const {category} = this.props.match.params
        return (
        <Segment>
            Post Section {category}
            <PostList />
        </Segment>     
        )
    }
} 

export default PostByCategory