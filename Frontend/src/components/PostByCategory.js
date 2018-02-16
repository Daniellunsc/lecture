import React, {Component} from 'react'
import {Segment} from 'semantic-ui-react'
import PostList from './PostList'
import * as API from '../utils/API'
import {connect} from 'react-redux'
import {setPosts} from '../actions'

class PostByCategory extends Component{

    componentWillMount(){
        const {category} = this.props.match.params
        API.getPostByCategory(category).then(posts=>this.props.definePosts(posts))
    }

    componentWillReceiveProps(nextProps){
        const {category} = nextProps.match.params
        API.getPostByCategory(category).then(posts=>this.props.definePosts(posts))
    }

    render () {
        const {category} = this.props.match.params
        return (
        <Segment>
            Post By Category {category}
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

export default connect(null, mapDispatchToProps)(PostByCategory)