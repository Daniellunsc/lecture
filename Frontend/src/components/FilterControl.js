import React, {Component} from 'react'
import {Button, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {orderPosts} from '../actions/postsActions'

class FilterControl extends Component{

    state = {
        filterToggleVote: -1,
        filterToggleRecent: -1
    }

    orderByVoteScore(){

        let newPost;

        const {posts, definePosts} = this.props
        if(this.state.filterToggleVote === -1) { // Decrescente

            newPost = posts.sort(function(a,b){
                return a.voteScore - b.voteScore
            })
            this.setState({filterToggleVote:1})
            
        }else if(this.state.filterToggleVote === 1){

            newPost = posts.sort(function(a,b){ //Crescente
                return b.voteScore - a.voteScore
            })
            this.setState({filterToggleVote:-1})
        }

        definePosts(newPost)
    }
    
    orderByDate(){

        const {posts, definePosts} = this.props

        let newPost;

        if(this.state.filterToggleRecent === -1) { // Decrescente

            newPost = posts.sort(function(a,b){
                return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            })
            this.setState({filterToggleRecent:1})
            
        }else if(this.state.filterToggleRecent === 1){

            newPost = posts.sort(function(a,b){ //Crescente
                return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            })
            this.setState({filterToggleRecent:-1})
        }

        definePosts(newPost)
    }

    render(){

        return(
            <Button.Group floated='right' size='tiny'>
                <Button icon labelPosition='left' onClick={this.orderByVoteScore.bind(this)}>
                    <Icon name={this.state.filterToggleVote === 1 ? 'chevron up' : 'chevron down'}/>
                    Vote Score
                </Button>
                <Button icon labelPosition='left' onClick={this.orderByDate.bind(this)}>
                    <Icon name={this.state.filterToggleRecent === 1 ? 'chevron up' : 'chevron down'}/>
                    Most Recent
                </Button>
            </Button.Group>
        )
    }
}

function MapStateToProps({postsReducer}){
    return{
        posts: postsReducer.posts
    }
}

function mapDispatchToProps(dispatch) {
    return{
        definePosts: (posts) => dispatch(orderPosts(posts))
    }  
}

export default connect(MapStateToProps, mapDispatchToProps)(FilterControl)