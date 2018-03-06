import React, {Component} from 'react'
import {Button, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {setPostOrder} from '../actions/postsActions'

class FilterControl extends Component{

    state = {
        filterToggleVote: 1,
        filterToggleRecent: 1
    }

    componentWillMount(){
        const {setOrder} = this.props
        setOrder('voteScore', this.state.filterToggleVote)
    }

    defineOrder(order, asc){
        const {setOrder} = this.props
        setOrder(order, this.state[asc]*-1)
        this.setState({[asc]: this.state[asc]*-1}) 
    }
    render(){
        return(
            <Button.Group floated='right' size='tiny'>
                <Button icon labelPosition='left' onClick={()=> this.defineOrder('voteScore', 'filterToggleVote')}>
                    <Icon name={this.state.filterToggleVote === 1 ? 'chevron up' : 'chevron down'}/>
                    Vote Score
                </Button>
                <Button icon labelPosition='left' onClick={()=> this.defineOrder('timestamp', 'filterToggleRecent')}>
                    <Icon name={this.state.filterToggleRecent === 1 ? 'chevron up' : 'chevron down'}/>
                    Most Recent
                </Button>
            </Button.Group>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return{
        setOrder: (postOrder, order) => dispatch(setPostOrder(postOrder, order))
    }  
}

export default connect(null, mapDispatchToProps)(FilterControl)