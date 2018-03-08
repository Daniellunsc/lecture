import React, {Component} from 'react'
import {Segment, Comment, Form, Header, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as Helpers from '../utils/Helpers'
import AddComment from './AddComment'

class Comments extends Component {

    state = {
        loading: true
    }

    componentDidMount(){

        const {comments} = this.props

        if(Helpers.isNotEmpty(comments)){
            this.setState({loading: false})
        }else{
            this.setState({loading: false})
        }
    }

    render(){
        console.log(this.props)
        const {comments, postID} = this.props
        const {loading} = this.state

        return(
        <Segment loading={loading}>
        <Comment.Group>
        {
            Helpers.isNotEmpty(comments) ? 
                comments.map(comment => (
                    
                    <Comment key={comment.id}>
                    <Comment.Content>
                        <Comment.Author as='a'>{comment.author}</Comment.Author>
                        <Comment.Metadata>
                        <div>at {Helpers.handleDateTime(comment.timestamp)}</div>
                        </Comment.Metadata>
                        <Comment.Text>{comment.body}</Comment.Text>
                        <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                    </Comment>
                    
                ))
            :
            <div>No Comments Found :(</div>
        }
        <AddComment postID={postID}/>
        </Comment.Group>
        </Segment>
        )
    }
}

function mapStateToProps({commentsReducer}){
    return{
        comments: commentsReducer.comments
    }
}

export default connect(mapStateToProps, null)(Comments)