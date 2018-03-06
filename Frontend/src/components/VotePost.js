import React, {Component} from 'react'
import {Button,Icon} from 'semantic-ui-react'
import * as API from '../utils/API'
import {connect} from 'react-redux'
import {alterPost} from '../actions/postsActions'

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
            <Button.Group size='tiny'>
                <Button animated positive onClick={()=>this.handleVote(1)}>
                <Button.Content visible>Upscore</Button.Content>
                <Button.Content hidden>
                    <Icon name='plus'/>
                </Button.Content>
                </Button>
                <Button.Or text={this.props.post.voteScore}/> 
                <Button animated negative onClick={()=>this.handleVote(-1)}>
                <Button.Content visible>DownScore</Button.Content>
                <Button.Content hidden>
                    <Icon name='minus'/>
                </Button.Content>
                </Button>
            </Button.Group>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        changePostVote: (post) => dispatch(alterPost(post))
    }
}

export default connect(null, mapDispatchToProps)(VotePost)