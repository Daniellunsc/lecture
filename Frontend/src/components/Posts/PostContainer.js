import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import * as API from '../../utils/API'
import * as Helpers from '../../utils/Helpers'

import {setPosts, alterPost, setPostErrors} from '../../actions/postsActions'


import FilterControl from './FilterControl'
import PostList from './PostList'
import NoPosts from '../SharedComponents/NoPosts'
import { Segment , Label, Divider, Button, Confirm} from 'semantic-ui-react'


class PostContainer extends Component {

    state = {
        loading: true,
        confirmOpen: false,
        selectedPost: ''
    }

    componentDidMount(){
        let category = this.checkCategory(this.props)
        this.fetchPosts(category)
    }

    componentWillReceiveProps(nextProps){

        let actualcategory = this.checkCategory(this.props)
        let newcategory = this.checkCategory(nextProps)

        if(actualcategory !== newcategory)
            this.fetchPosts(newcategory)
    }

    handleDelete = (post) => this.setState({confirmOpen: true, selectedPost:post})
    handleCancel = () => this.setState({confirmOpen: false})

    handleConfirm = () => {

        const {alterPostInStore, setPostErrors} = this.props

         API.deletePost(this.state.selectedPost)
             .then(res=> alterPostInStore(res))
             .then(this.setState({confirmOpen: false, selectedPost: ''}))
             .catch(err=> setPostErrors(err))
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
                .then(this.setState({loading: false}))
                .catch(err=> setPostErrors(err))
        }else{
            API.getAllPosts()
                .then(posts=> posts.sort((a,b) => b.voteScore - a.voteScore))
                .then(filteredPosts=>setPosts(filteredPosts.filter(post=> post.deleted===false)))         
                .then(this.setState({loading: false}))
                .catch(err=> setPostErrors(err))
        } 
    }

    render(){
        const {posts} = this.props
        const {loading, confirmOpen} = this.state
        return(
            !Helpers.isNotEmpty(posts) && !loading?
            <NoPosts />
            :
            Helpers.isNotEmpty(posts) && 
            <Segment raised color='blue'>
                <Label color='blue' size='large' attached='top'>
                    Posts 
                </Label>

                <Button as={Link} to={'/add'} floated='right' positive size='tiny'>Add Post</Button>
                <FilterControl />
                <Divider hidden></Divider>
                <PostList handleDelete={this.handleDelete}/>
                <Confirm 
                     open={confirmOpen}
                     onCancel={this.handleCancel}
                     onConfirm={this.handleConfirm}
                     content='Are you sure you want to delete this post?'
                 />
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
        alterPostInStore: (post)=> dispatch(alterPost(post)),
        setPosts: (posts) => dispatch(setPosts(posts)),
        setError: (error) => dispatch(setPostErrors(error))
    }  
}

export default connect(MapStateToProps, mapDispatchToProps)(PostContainer)