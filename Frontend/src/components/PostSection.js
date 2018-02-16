import React, {Component} from 'react'
import PostList from './PostList'
import {Segment} from 'semantic-ui-react'
import * as API from '../utils/API'
import {connect} from 'react-redux'
import {setPosts} from '../actions'

class PostSection extends Component{

    componentWillMount(){
        API.getAllPosts().then(posts=>this.props.definePosts(posts))   
    }

    render () {
        return (
        <Segment>
            Post Section
            <PostList />
        </Segment>     
        )
    }
} 

function mapDispatchToProps(dispatch) {
    return{
        definePosts: (posts) => dispatch(setPosts(posts))
    }  
}

export default connect(null, mapDispatchToProps)(PostSection)