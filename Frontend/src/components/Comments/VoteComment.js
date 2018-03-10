import React, {Component} from 'react'
import * as API from '../../utils/API'
import {connect} from 'react-redux'
import {alterComment} from '../../actions/commentsActions'
import VoteControl from '../SharedComponents/VoteControl'

class VoteComment extends Component {

    handleVote(vote){
        const {post, changeCommentVote} = this.props
        
        let optionString = vote === 1 ? 'upVote' : 'downVote'

        API.voteComment(post.id, optionString).then(res=> 
            changeCommentVote(res)
        )
    }
    
    render(){
        return(
            <VoteControl voteScore={this.props.post.voteScore} handleVote={this.handleVote.bind(this)} />
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        changeCommentVote: (comment) => dispatch(alterComment(comment))
    }
}

export default connect(null, mapDispatchToProps)(VoteComment)