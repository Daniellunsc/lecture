import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Segment, Icon, Label, Button, Confirm, Divider } from 'semantic-ui-react';

import * as Helpers from '../../utils/Helpers'
import * as API from '../../utils/API'
import {addPost, alterPost, setPostErrors} from '../../actions/postsActions'
import {setcomments} from '../../actions/commentsActions'

import VotePost from './VotePost'

import {Link} from 'react-router-dom'
import NoPosts from '../SharedComponents/NoPosts';
import Comments from '../Comments/Comments';

class PostDetails extends Component{

    state = {
        confirmOpen: false,
        loading: true,
        noPost: false,
        editMode: false,
    }

    componentDidMount(){

        const {post, addPostInStore, setPostErrors} = this.props
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
        const {author} = this.props
        return(
            <Segment key={post.id}>
                 
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
                    <Label.Detail>{this.props.comments.length}</Label.Detail>
                 </Label>
                {
                    post.author === author 
                    ?
                    <Button.Group floated='right' size='tiny'>
                        <Button icon labelPosition='left' size='tiny' color='red' floated='right' onClick={this.handleDelete}>
                            <Icon name='delete'/> Delete
                        </Button>

                        <Button icon labelPosition='left'  as={Link} to={`/e/${post.id}`} size='tiny' color='blue' floated='right'>
                            <Icon name='edit'/> Edit
                        </Button>
                    </Button.Group>       
                    :
                    <div></div>
                }
                

                 <Confirm 
                     open={confirmOpen}
                     onCancel={this.handleCancel}
                     onConfirm={this.handleConfirm}
                     content='Are you sure you want to delete this post?'
                 />
                <Divider />
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

function mapStateToProps({postsReducer, commentsReducer, loginReducer}, props){

    const post = postsReducer.posts
                    .find(post => post.id === props.match.params.postID && post.deleted === false)

    const comments = commentsReducer.comments
                    .filter(comment=> comment.deleted === false)

    return{
        post,
        comments,
        author: loginReducer.username
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