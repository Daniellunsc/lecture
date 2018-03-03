import React, {Component} from 'react'
import { Segment , Label, Divider} from 'semantic-ui-react'
import AddPost from './AddPost'
import FilterControl from './FilterControl'
import PostList from './PostList'
import * as API from '../utils/API'
import {connect} from 'react-redux'
import {setPosts, setPostErrors} from '../actions/postsActions'

class PostContainer extends Component {

    state = {
        loading: false
    }

    componentWillMount(){
        let category = this.checkCategory(this.props)
        
        this.fetchPosts(category)
    }

    componentWillReceiveProps(nextProps){
        let category = this.checkCategory(nextProps)
        this.fetchPosts(category)
    }

    fetchPosts(category){

        this.setState({loading: true})
        const {setPosts, setPostErrors} = this.props

        if(category){
            API.getPostByCategory(category)
                .then(posts=> posts.sort((a,b) => b.voteScore - a.voteScore))
                .then(filteredPosts=>setPosts(filteredPosts.filter(post=> post.deleted===false)))
                .then(res=> this.setState({loading: false}))
                .catch(err=> setPostErrors(err))
        }else{
            API.getAllPosts()
                .then(posts=> posts.sort((a,b) => b.voteScore - a.voteScore))
                .then(filteredPosts=>setPosts(filteredPosts.filter(post=> post.deleted===false)))
                .then(res=> this.setState({loading: false}))
                .catch(err=> setPostErrors(err))
        }
       
    }

    checkCategory(props){
        const {params} = props.match
        if(params.category) return params.category;
        return null
    }

    render(){
        return(
        <Segment raised loading={this.state.loading} color='blue' clearing>
            <Label color='blue' size='large' attached='top'>
                Posts 
            </Label>
            <AddPost />
            <FilterControl />
            <Divider hidden></Divider>
            <PostList />
        </Segment> 
        )
    }
}

function mapDispatchToProps(dispatch) {
    return{
        setPosts: (posts) => dispatch(setPosts(posts)),
        setError: (error) => dispatch(setPostErrors(error))
    }  
}


export default connect(null, mapDispatchToProps)(PostContainer)