import React, {Component} from 'react'
import {Segment, Label, Icon, Button, Confirm} from 'semantic-ui-react'
import * as API from '../utils/API'
import * as helpers from '../utils/Helpers'
import {connect} from 'react-redux'
import {setPosts} from '../actions/postsActions'
import  VotePost from './VotePost'

class PostDetails extends Component {

    state = {
        confirmOpen : false
    }

    componentWillMount(){
        const {postID} = this.props.match.params
        const {definePost} = this.props

        API.fetchPost(postID)
            .then(post=>this.props.definePost([post]))
            .catch(err=>console.log(err))
    }

    componentWillReceiveProps(nextProps){

        const {post, definePost} = this.props
        const {postID} = nextProps.match.params

        if(post){
            if(postID !== post.id){
                API.fetchPost(postID)
                    .then(post=>definePost([post]))
                    .catch(err=>console.log(err))
            }
        }
    }

    handleDelete = () => this.setState({confirmOpen: true})
    handleCancel = () => this.setState({confirmOpen: false})

    handleConfirm = () => {

        const {post, definePost} = this.props

        API.deletePost(post.id)
            .then(res=> definePost(res))
            .then(res=> this.setState({confirmOpen: false}))
    }

    render(){
        const {post} = this.props
        const {confirmOpen} = this.state
        return(
              post !== undefined && Object.keys(post).length > 0 ? 
              <Segment>
                <Label attached='top' size='large' color='blue'>
                    {post.title}
                    <Label.Detail>Posted by <b>{post.author}</b> in {helpers.handleDateTime(post.timestamp)}  </Label.Detail>
                </Label>

                <p> {post.body}</p>
                
                <VotePost post={post}/>

                <Button size='tiny' color='red' floated='right' onClick={this.handleDelete}>
                    <Icon name='delete'/> Delete
                </Button>

                <Button size='tiny' color='blue' floated='right'>
                    <Icon name='edit'/> Edit
                </Button>
               
                <Confirm 
                    open={confirmOpen}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                    content='Are you sure you want to delete this post?'
                />
            </Segment>
              : 
            <div>Post Deleted or Not Found</div>
        )
    }
}

function mapStateToProps({postsReducer}){
    return{
        post: postsReducer.posts[0]
    }
    
}

function MapDispatchToProps(dispatch){
    return{
        definePost: (post) => dispatch(setPosts(post))
    }
}

export default connect(mapStateToProps, MapDispatchToProps)(PostDetails)