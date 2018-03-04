import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import * as API from '../utils/API'
import * as helpers from '../utils/Helpers'

import {setPosts, setPostErrors} from '../actions/postsActions'

import AddPost from './AddPost'
import FilterControl from './FilterControl'
import PostList from './PostList'
import NoPosts from './NoPosts'
import VotePost from './VotePost'
import { Segment , Label, Divider, List, Icon} from 'semantic-ui-react'


class PostContainer extends Component {

    state = {
        loading: true
    }

    componentDidMount(){
        let category = this.checkCategory(this.props)
        
        this.fetchPosts(category)
    }

    componentWillReceiveProps(nextProps){

        const {posts} = this.props

        let actualcategory = this.checkCategory(this.props)
        let newcategory = this.checkCategory(nextProps)

        if(actualcategory != newcategory)
            this.fetchPosts(newcategory)
    }

    checkCategory(props){
        const {params} = props.match
        if(params.category) return params.category;
        return null
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

    render(){

        const {posts} = this.props
        const {loading} = this.state

        let actualcategory = this.checkCategory(this.props)
        return(
            !helpers.isNotEmpty(posts) && !loading?
            <Segment>
                <Label color='blue' size='large' attached='top'>
                    No Posts Found :(
                </Label> 
                <Divider hidden></Divider>  
                <label>Click on the button to add a post!</label>
                <AddPost actualCategory={actualcategory}/>
            </Segment>
            :
            helpers.isNotEmpty(posts) && 
            <Segment raised color='blue'>
                <Label color='blue' size='large' attached='top'>
                    Posts 
                </Label>

                <AddPost actualCategory={actualcategory}/>
                <FilterControl />
                <Divider hidden></Divider>
                <PostList/>
            </Segment> 
        )
    }
}

function MapStateToProps({postsReducer}){
    return{
        posts: postsReducer.posts
    }
}


function mapDispatchToProps(dispatch) {
    return{
        setPosts: (posts) => dispatch(setPosts(posts)),
        setError: (error) => dispatch(setPostErrors(error))
    }  
}


export default connect(MapStateToProps, mapDispatchToProps)(PostContainer)