import React, {Component} from 'react'
import * as API from '../utils/API'
import {connect} from 'react-redux'
import {alterPost} from '../actions/postsActions'
import VoteControl from './VoteControl'

class VotePost extends Component {

    handleVote(vote){
        const {post, changePostVote} = this.props
        
        let optionString = vote === 1 ? 'upVote' : 'downVote'

        API.votePost(post.id, optionString).then(res=> 
            changePostVote(res)
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
        changePostVote: (post) => dispatch(alterPost(post))
    }
}

export default connect(null, mapDispatchToProps)(VotePost)