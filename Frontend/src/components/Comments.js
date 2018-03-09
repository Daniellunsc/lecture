import React, {Component} from 'react'
import { Segment, Comment, Form, Header, Button, Icon, Divider, Label, Transition, List, Confirm} from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as Helpers from '../utils/Helpers'
import AddComment from './AddComment'
import {Link} from 'react-router-dom'
import VotePost from './VotePost';
import VoteComment from './VoteComment';
import * as API from '../utils/API'
import {alterComment, markAsEditing} from '../actions/commentsActions'

class Comments extends Component {

    state = {
        loading: true,
        confirmOpen: false,
        selectedComment: '',
        body: ''
    }

    componentDidMount(){

        const {comments, editing} = this.props

        if(Helpers.isNotEmpty(comments)){
            this.setState({loading: false})     
        }else{
            this.setState({loading: false})
        }
    }

    componentWillReceiveProps(nextProps){

        const {comments, editing} = nextProps
        let postToControl = comments.find(comment=> comment.id==editing)

        if(postToControl){
            this.setState({body: postToControl.body})
        }
    }

    handleDelete = (comment) => this.setState({confirmOpen: true, selectedComment: comment})
    handleCancel = () => this.setState({confirmOpen: false})
    handleFormEdit = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmitEdit(){

        const {editing} = this.props
        const { body } = this.state
        
        API.editComment(editing, body)
            .then(res=> this.props.alterCommentInStore(res))
            .then(this.props.markEditing(''))
    
        this.setState({
            body: '',
        })    
      }

    handleConfirm = (commentID) => {

        const {selectedComment} = this.state
         API.deleteComment(selectedComment)
             .then(res=> this.props.alterCommentInStore(res))
             .then(this.setState({confirmOpen: false}))
    }

    render(){
        const {comments, postID, editing} = this.props
        const {loading, confirmOpen, body} = this.state

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

                       

                       {editing === comment.id ?

                            <Form onSubmit={()=>this.handleSubmitEdit()}>
                            <Form.Field>
                            <Form.Input required name='body' placeholder='Comment' value={body} onChange={this.handleFormEdit}/>
                            </Form.Field>
                            <Button content='Edit Comment' labelPosition='left' icon='edit' primary />
                            <Button content='Cancel' labelPosition='left' icon='delete' onClick={()=>this.props.markEditing('')}/>
                            </Form>

                        :
                            <div>
                            <p>{comment.body}</p>
                            <VoteComment post={comment}/>

                            <Button icon labelPosition='left' size='tiny' color='red' floated='right' onClick={()=>this.handleDelete(comment.id)}>
                                <Icon name='delete' attached='right'/> 
                                Delete
                            </Button>

                            <Button icon labelPosition='left' size='tiny' color='blue' floated='right' onClick={()=>this.props.markEditing(comment.id)}>
                                <Icon name='edit' attached='right'/> 
                                Edit
                            </Button>

                            <Confirm 
                            open={confirmOpen}
                            onCancel={this.handleCancel}
                            onConfirm={this.handleConfirm}
                            content='Are you sure you want to delete this comment?'
                            />
                            </div>
                        }

                      
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
        editing: commentsReducer.editingID
    }
}

function mapDispatchToProps(dispatch){
    return{
        alterCommentInStore: (comment)=> dispatch(alterComment(comment)),
        markEditing: (commentID)=> dispatch(markAsEditing(commentID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)