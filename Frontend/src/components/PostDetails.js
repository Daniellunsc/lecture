import React, {Component} from 'react'
import {Segment, Label, Header, Icon, Button, Divider} from 'semantic-ui-react'
import * as API from '../utils/API'
import * as helpers from '../utils/Helpers'

class PostDetails extends Component {

    state = {
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

    render(){

        const {post} = this.state

        return(
            <Segment>
                
                <Label attached='top' size='large'>
                    {post.title}
                </Label>

                <p> {post.body}</p>
                
                <Button.Group size='tiny'>
                    <Button animated positive onClick={()=>this.handleVote(1)}>
                    <Button.Content visible>Upscore</Button.Content>
                    <Button.Content hidden>
                        <Icon name='plus'/>
                    </Button.Content>
                    </Button>
                    <Button.Or />
                    <Button animated negative onClick={()=>this.handleVote(-1)}>
                    <Button.Content visible>DownScore</Button.Content>
                    <Button.Content hidden>
                        <Icon name='minus'/>
                    </Button.Content>
                    </Button>
                </Button.Group>
                
                <Label size='large'>
                    <Icon name='heart' /> {post.voteScore}
                </Label>
                <Label size='large'>
                    Posted by <b>{post.author}</b> in {helpers.handleDateTime(post.timestamp)}  
                </Label>

                
            </Segment>
           
        )
    }
}

export default PostDetails