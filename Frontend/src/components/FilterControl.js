import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {orderPosts} from '../actions'

class FilterControl extends Component{

    state = {
        filterToggle: -1
    }

    orderByVoteScore(){

        const {posts} = this.props
        if(this.state.filterToggle == -1) { // Decrescente

            var newPost = posts.sort(function(a,b){
                return a.voteScore - b.voteScore
            })
            this.setState({filterToggle:1})
            
        }else if(this.state.filterToggle == 1){

            var newPost = posts.sort(function(a,b){ //Crescente
                return b.voteScore - a.voteScore
            })
            this.setState({filterToggle:-1})
        }

        this.props.definePosts(newPost)
    }
    
    orderByDate(){

        const {posts} = this.props
        if(this.state.filterToggle == -1) { // Decrescente

            var newPost = posts.sort(function(a,b){
                return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            })
            this.setState({filterToggle:1})
            
        }else if(this.state.filterToggle == 1){

            var newPost = posts.sort(function(a,b){ //Crescente
                return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            })
            this.setState({filterToggle:-1})
        }

        this.props.definePosts(newPost)
    }

    render(){
        return(
            <Button.Group floated='right'>
                <Button onClick={this.orderByVoteScore.bind(this)}>VoteScore</Button>
                <Button onClick={this.orderByDate.bind(this)}>Most Recent</Button>
            </Button.Group>
        )
    }
}

function MapStateToProps({posts}){
    return{
        posts
    }
}

function mapDispatchToProps(dispatch) {
    return{
        definePosts: (posts) => dispatch(orderPosts(posts))
    }  
}

export default connect(MapStateToProps, mapDispatchToProps)(FilterControl)