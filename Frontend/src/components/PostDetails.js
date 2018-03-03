import React, {Component} from 'react'
import {Segment, Label, Header, Icon, Button, Divider, Confirm} from 'semantic-ui-react'
import * as API from '../utils/API'
import * as helpers from '../utils/Helpers'
import VotePost from './VotePost';

class PostDetails extends Component {

    state = {
        confirmOpen: false,
        post: {

        },
        comments: {

        }
    }

    componentWillMount(){

        const {postID} = this.props.match.params

        API.fetchPost(postID)
            .then(res=>this.setState({post: res}))
            .then()

    }

    handleVote(vote){

        const {post} = this.state
        
        let optionString = vote == 1 ? 'upVote' : 'downVote'

        API.votePost(post.id, optionString).then(res=> this.setState({post: res}))

    }

    handleDelete = () => this.setState({confirmOpen: true})
    handleCancel = () => this.setState({confirmOpen: false})

    handleConfirm = () => {

        API.deletePost(this.state.post.id)
            .then(res=> this.setState({confirmOpen: false, post: res}))
    }

    render(){

        const {post, confirmOpen} = this.state

        return(
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
           
        )
    }
}

export default PostDetails