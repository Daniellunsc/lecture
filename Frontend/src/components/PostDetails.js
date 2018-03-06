import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Segment, Icon, Label, Button ,Confirm} from 'semantic-ui-react';

import * as Helpers from '../utils/Helpers'
import * as API from '../utils/API'
import {addPost, alterPost} from '../actions/postsActions'

import VotePost from './VotePost'

import {Link} from 'react-router-dom'
import NoPosts from './NoPosts';

class PostDetails extends Component{

    state = {
        confirmOpen: false,
        loading: true,
        noPost: false,
        editMode: false,
    }

    componentDidMount(){
        if(Helpers.isNotEmpty(this.props.post))
        {
            this.setState({loading:false})
        }else{           
            API.fetchPost(this.props.match.params.postID)
            .then(res=> {
                if(Helpers.isNotEmpty(res))
                    this.props.addPostInStore(res)          
                }       
            )
            .then(res=> this.setState({loading:false}))
            .catch(err=>console.log(err))
        }          
    }

    handleDelete = () => this.setState({confirmOpen: true})
    handleCancel = () => this.setState({confirmOpen: false})

    handleConfirm = () => {

        const {post} = this.props

        API.deletePost(post[0].id)
            .then(res=> this.props.alterPostInStore(res))
            .then(this.setState({confirmOpen: false}))
    }

    renderPost(post){
        const {confirmOpen} = this.state

        return(post.map(postdetail=>(
            <Segment key={postdetail.id} clearing>
                 
                 <Label attached='top' size='large' color='blue'>
                     <Icon name='arrow circle left' onClick={()=>this.props.history.goBack()}/>
                     {postdetail.title}
                 
                     <Label.Detail>
                         Posted by <b>{postdetail.author}</b> in {Helpers.handleDateTime(postdetail.timestamp)}
                     </Label.Detail>
                 </Label>

                 <p>{postdetail.body}</p>

                 <VotePost post={postdetail} />

                 <Button size='tiny' color='red' floated='right' onClick={this.handleDelete}>
                     <Icon name='delete'/> Delete
                 </Button>

                 <Button as={Link} to={`/e/${postdetail.id}`}size='tiny' color='blue' floated='right'>
                     <Icon name='edit'/> Edit
                 </Button>

                 <Confirm 
                     open={confirmOpen}
                     onCancel={this.handleCancel}
                     onConfirm={this.handleConfirm}
                     content='Are you sure you want to delete this post?'
                 />
            </Segment>)
        ))
    }


    render(){
        const {post} = this.props   
        return(
            Helpers.isNotEmpty(post) ? 
            this.renderPost(post) 
            :
            <NoPosts />
        )
    }
}

function mapStateToProps({postsReducer}, props){

    const post = postsReducer.posts
                .filter(post=> post.id === props.match.params.postID)
                .filter(post=> post.deleted === false)
    return{
        post,
    }
}

function mapDispatchToProps(dispatch){
    return{
        alterPostInStore: (post)=> dispatch(alterPost(post)),
        addPostInStore: (post)=>dispatch(addPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)