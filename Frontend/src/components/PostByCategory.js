import React, {Component} from 'react'
import {Segment} from 'semantic-ui-react'
import PostList from './PostList'
import * as API from '../utils/API'
import {connect} from 'react-redux'
import {setPosts} from '../actions'
import FilterControl from './FilterControl'

class PostByCategory extends Component{

    componentWillMount(){
        const {category} = this.props.match.params
        API.getPostByCategory(category)
        .then(posts=> posts.sort((a,b) => b.voteScore - a.voteScore))
        .then(filteredPosts=>this.props.definePosts(filteredPosts))
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

export default connect(null, mapDispatchToProps)(PostByCategory)