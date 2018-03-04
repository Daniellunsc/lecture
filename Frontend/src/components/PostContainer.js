import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import * as API from '../utils/API'
import * as helpers from '../utils/Helpers'

import {setPosts, setPostErrors} from '../actions/postsActions'
import AddPost from './AddPost'
import FilterControl from './FilterControl'
import PostList from './PostList'
import NoPost from './NoPost'
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

        let actualcategory = this.checkCategory(this.props)
        let newcategory = this.checkCategory(nextProps)

        if(actualcategory != newcategory)
            this.fetchPosts(newcategory)
            
        if(actualcategory != null){
            console.log('deferente')
            this.props.posts.filter(post=> post.category == actualcategory)
        }
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

    renderPosts(posts){
        return(
            posts.map(post=> (
                <List.Item key={post.id}>
                
                    <Icon name='comments outline' size='large' />
                    <List.Content>

                        <List.Header as={Link} name='post' to={`/${post.category}/${post.id}`}>
                        <h3>
                            {post.title}
                        </h3>    
                        </List.Header>      

                            <List.Description style={{paddingTop:10}}>

                                <VotePost post={post}/>

                                <Label>
                                <Icon name='comments' color='blue'/> {post.commentCount}
                                </Label>
                                <Label>
                                Posted by <b>{post.author}</b> in {helpers.handleDateTime(post.timestamp)}  
                                </Label>              
                            </List.Description>
                    </List.Content>
                </List.Item>
            ))
        )
    }

    render(){

        const {posts} = this.props
        const {loading} = this.state

        let actualcategory = this.checkCategory(this.props)

        return(
            posts.length === 0 ?
            <NoPost />
            :
            <Segment raised color='blue' clearing loading={loading}>
                <Label color='blue' size='large' attached='top'>
                    Posts 
                </Label>

                <AddPost />
                <FilterControl />
                <Divider hidden></Divider>

                <List relaxed='very' selection animated divided>
                    {
                        actualcategory != null ? 
                        this.renderPosts(posts
                            .filter(post=>post.category == actualcategory))
                        :
                        this.renderPosts(posts)
                    }
                </List>
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