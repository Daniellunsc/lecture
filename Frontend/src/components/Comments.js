import React, {Component} from 'react'
import { Segment, Comment, Form, Header, Button, Icon, Divider, Label, Transition, List} from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as Helpers from '../utils/Helpers'
import AddComment from './AddComment'
import {Link} from 'react-router-dom'
import VotePost from './VotePost';
import VoteComment from './VoteComment';

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
        <Comment.Group>
       
        {
            Helpers.isNotEmpty(comments) ? 
                <Transition.Group
                duration={600}
                animation='fade up'
                >   
                {comments.map(comment => (
                                  
                    <Segment key={comment.id} clearing>
                       <Label attached='top' color='teal'>
                            {comment.author}
                            <Label.Detail>at {Helpers.handleDateTime(comment.timestamp)}</Label.Detail>          
                       </Label>

                       <p>{comment.body}</p>

                       <VoteComment post={comment}/>
                    </Segment>   
                      
                ))}
                </Transition.Group>         
            :
            <div>No Comments Found :(</div>
        }
        
        <AddComment postID={postID}/>
        </Comment.Group>
        )
    }
}

function mapStateToProps({commentsReducer}){

    let comments = commentsReducer.comments.sort(function(a,b){
        return b.timestamp - a.timestamp
    })
    
    return{
        comments,
    }
}

export default connect(mapStateToProps, null)(Comments)