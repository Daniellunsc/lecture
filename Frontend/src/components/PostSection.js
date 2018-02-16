import React, {Component} from 'react'
import PostList from './PostList'
import {Segment} from 'semantic-ui-react'
import * as API from '../utils/API'
import {connect} from 'react-redux'
import {setPosts} from '../actions'
import FilterControl from './FilterControl'

class PostSection extends Component{

    componentWillMount(){
        API.getAllPosts()
            .then(posts=> posts.sort((a,b) => b.voteScore - a.voteScore))
            .then(orderedPosts => this.props.definePosts(orderedPosts))
    }
    
    render () {
        return (
        <Segment>
       
            Post Section

            <FilterControl />
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