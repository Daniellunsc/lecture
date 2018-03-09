import React from 'react'
import {Button,Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {alterPost} from '../actions/postsActions'

const VoteControl = ({handleVote, voteScore}) => {
        return(
            <Button.Group size='tiny'>
                <Button animated positive onClick={()=>handleVote(1)}>
                <Button.Content visible>Upscore</Button.Content>
                <Button.Content hidden>
                    <Icon name='plus'/>
                </Button.Content>
                </Button>
                <Button.Or text={voteScore}/> 
                <Button animated negative onClick={()=>handleVote(-1)}>
                <Button.Content visible>DownScore</Button.Content>
                <Button.Content hidden>
                    <Icon name='minus'/>
                </Button.Content>
                </Button>
            </Button.Group>
     )
}

export default VoteControl