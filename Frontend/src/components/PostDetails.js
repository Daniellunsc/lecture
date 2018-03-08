import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Segment, Icon, Label, Button ,Confirm} from 'semantic-ui-react';

import * as Helpers from '../utils/Helpers'
import * as API from '../utils/API'
import {addPost, alterPost, setPostErrors} from '../actions/postsActions'
import {setcomments} from '../actions/commentsActions'

import VotePost from './VotePost'

import {Link} from 'react-router-dom'
import NoPosts from './NoPosts';
import Comments from './Comments';

class PostDetails extends Component{

    state = {
        confirmOpen: false,
        loading: true,
        noPost: false,
        editMode: false,
    }

    componentDidMount(){

        const {post, addPostInStore, setPostErrors, addCommentsToStore} = this.props
        const {postID} = this.props.match.params

        if(Helpers.isNotEmpty(post))
        {
            this.setState({loading:false})
            this.getComments()
            
        }else{           
            API.fetchPost(postID)
            .then(res=> {
                if(Helpers.isNotEmpty(res))
                    addPostInStore(res)          
                }       
            )
            .then(this.getComments())
            .then(res=> this.setState({loading:false}))     
            .catch(err=> setPostErrors(err))
        }          
    }

    handleDelete = () => this.setState({confirmOpen: true})
    handleCancel = () => this.setState({confirmOpen: false})
    getComments(){

        const {postID} = this.props.match.params
        const {addCommentsToStore} = this.props
        API.fetchComments(postID)
        .then(res=> {
            if(Helpers.isNotEmpty(res))
            {
                addCommentsToStore(res)
            }else{
                addCommentsToStore([])
            }   
        })
    }

    handleConfirm = () => {

        const {post, alterPostInStore, setPostErrors} = this.props

        API.deletePost(post.id)
            .then(res=> alterPostInStore(res))
            .then(this.setState({confirmOpen: false}))
            .catch(err=> setPostErrors(err))
    }

    renderPost(post){
        const {confirmOpen} = this.state

        return(
            <Segment key={post.id} clearing>
                 
                 <Label attached='top' size='large' color='blue'>
                     <Icon name='arrow circle left' onClick={()=>this.props.history.goBack()}/>
                     {post.title}
                 
                     <Label.Detail>
                         Posted by <b>{post.author}</b> in {Helpers.handleDateTime(post.timestamp)}
                     </Label.Detail>
                 </Label>

                 <p>{post.body}</p>

                 <VotePost post={post} />

                 <Label size='large' color='blue'>
                    <Icon name='comments' />
                    <Label.Detail>{post.commentCount}</Label.Detail>
                </Label>

                 <Button size='tiny' color='red' floated='right' onClick={this.handleDelete}>
                     <Icon name='delete'/> Delete
                 </Button>

                 <Button as={Link} to={`/e/${post.id}`}size='tiny' color='blue' floated='right'>
                     <Icon name='edit'/> Edit
                 </Button>

                 <Confirm 
                     open={confirmOpen}
                     onCancel={this.handleCancel}
                     onConfirm={this.handleConfirm}
                     content='Are you sure you want to delete this post?'
                 />

                <Comments postID={post.id}/>
            </Segment>
        )
    }


    render(){
        const {post} = this.props   
        return(
            Helpers.isNotEmpty(post) ? 
            this.renderPost(post) 
            :
            <NoPosts />
        )
    }
}

function mapStateToProps({postsReducer}, props){

    const post = postsReducer.posts
                    .find(post => post.id === props.match.params.postID && post.deleted === false)
    return{
        post,
    }
}

function mapDispatchToProps(dispatch){
    return{
        alterPostInStore: (post)=> dispatch(alterPost(post)),
        addPostInStore: (post)=>dispatch(addPost(post)),
        setErrors: (postError)=>dispatch(setPostErrors(postError)),
        addCommentsToStore: (comments)=>dispatch(setcomments(comments)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)