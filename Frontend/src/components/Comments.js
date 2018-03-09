import React, {Component} from 'react'
import { Segment, Comment, Form, Header, Button, Icon, Divider, Label, Transition, List, Confirm} from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as Helpers from '../utils/Helpers'
import AddComment from './AddComment'
import {Link} from 'react-router-dom'
import VotePost from './VotePost';
import VoteComment from './VoteComment';
import * as API from '../utils/API'
import {alterComment} from '../actions/commentsActions'

class Comments extends Component {

    state = {
        loading: true,
        confirmOpen: false
    }

    componentDidMount(){

        const {comments} = this.props

        if(Helpers.isNotEmpty(comments)){
            this.setState({loading: false})
        }else{
            this.setState({loading: false})
        }
    }

    handleDelete = () => this.setState({confirmOpen: true})
    handleCancel = () => this.setState({confirmOpen: false})
    handleConfirm = (commentID) => {

        API.deleteComment(commentID)
            .then(res=> this.props.removeFromStore(res))
            .then(this.setState({confirmOpen: false}))
    }

    render(){
        console.log(this.props)
        const {comments, postID} = this.props
        const {loading, confirmOpen} = this.state

        return(
        <Comment.Group>
        <Transition.Group
        duration={400}
        animation='fade up'
        >   
        {
            Helpers.isNotEmpty(comments) ? 
                comments.map(comment => (
                                  
                    <Segment key={comment.id} clearing>
                       <Label attached='top' color='teal'>
                            {comment.author}
                            <Label.Detail>at {Helpers.handleDateTime(comment.timestamp)}</Label.Detail>          
                       </Label>

                       <p>{comment.body}</p>

                       <VoteComment post={comment}/>

                        <Button icon labelPosition='left' size='tiny' color='red' floated='right' onClick={this.handleDelete}>
                            <Icon name='delete' attached='right'/> 
                            Delete
                        </Button>

                        <Confirm 
                        open={confirmOpen}
                        onCancel={this.handleCancel}
                        onConfirm={()=>this.handleConfirm(comment.id)}
                        content='Are you sure you want to delete this comment?'
                        />
                    </Segment>   
                      
                ))          
            :
            <div>No Comments Found :(</div>
        }
        </Transition.Group>   
        <AddComment postID={postID}/>
        </Comment.Group>
        )
    }
}

function mapStateToProps({commentsReducer}){

    let comments = commentsReducer.comments
                    .filter(comment => comment.deleted == false)
                    .sort(function(a,b){
                        return b.timestamp - a.timestamp
                    })
    
    return{
        comments,
    }
}

function mapDispatchToProps(dispatch){
    return{
        removeFromStore: (comment)=> dispatch(alterComment(comment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)