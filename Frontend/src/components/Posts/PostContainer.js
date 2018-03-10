import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import * as API from '../../utils/API'
import * as Helpers from '../../utils/Helpers'

import {setPosts, setPostErrors} from '../../actions/postsActions'


import FilterControl from './FilterControl'
import PostList from './PostList'
import NoPosts from '../SharedComponents/NoPosts'
import { Segment , Label, Divider, Button} from 'semantic-ui-react'


class PostContainer extends Component {

    state = {
        loading: true
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
        const {loading} = this.state
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