import React, {Component} from 'react'
import {Button,Icon} from 'semantic-ui-react'
import * as API from '../utils/API'
import {connect} from 'react-redux'
import {alterPost} from '../actions/postsActions'

class VoteControl extends Component {

   
    
    render(){
        return(
            <Button.Group size='tiny'>
                <Button animated positive onClick={()=>this.props.handleVote(1)}>
                <Button.Content visible>Upscore</Button.Content>
                <Button.Content hidden>
                    <Icon name='plus'/>
                </Button.Content>
                </Button>
                <Button.Or text={this.props.voteScore}/> 
                <Button animated negative onClick={()=>this.props.handleVote(-1)}>
                <Button.Content visible>DownScore</Button.Content>
                <Button.Content hidden>
                    <Icon name='minus'/>
                </Button.Content>
                </Button>
            </Button.Group>
        )
    }
}



export default VoteControl