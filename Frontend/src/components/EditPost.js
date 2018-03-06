import React, {Component} from 'react'
import {Segment, Form, Label, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {addPost, alterPost} from '../actions/postsActions'
import * as API from '../utils/API'
import * as Helpers from '../utils/Helpers';

class EditPost extends Component {

    state ={
        id: '',
        title: '',
        body: '',
        fireRedirect: false,
        loading: true
    }

    componentWillMount(){
        if(!Helpers.isNotEmpty(this.props.post)){
            API.fetchPost(this.props.match.params.postID)
            .then(res=> {
                if(Helpers.isNotEmpty(res))
                    this.props.addPostInStore(res)      
                }       
            )
            .then(console.log(this.state))
            .catch(err=>console.log(err))
        }else{
            this.definePostState(this.props)
        }
    }

    componentWillReceiveProps(nextProps){
        if(Helpers.isNotEmpty(nextProps.post)){
            this.definePostState(nextProps)
        }
    }

    definePostState(props){
        this.setState({
            id: props.post[0].id,
            title: props.post[0].title,
            body: props.post[0].body,
            category: props.post[0].category,
            loading: false
        })
    }

    handleFormEdit = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        API.editPost(this.state)
            .then(res=> this.props.alterPostInStore(res))
            .then(this.setState({fireRedirect: true}))      
    }

    render(){
        const {title, body, id, category, fireRedirect, loading} = this.state
        return(
            <Segment loading={loading}>
                <Label attached='top' color='blue'>
                <Icon name='arrow circle left' onClick={()=>this.props.history.goBack()}/>
                    Editing post
                </Label>
                <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <Form.Input 
                        required fluid label='Post Title'
                        name='title' value={title} 
                        placeholder='The main content of the post' 
                        onChange={this.handleFormEdit}/>
                </Form.Field>
                <Form.Field>
                <Form.TextArea required label='Post Description' name='body' value={body} placeholder='Write about...' onChange={this.handleFormEdit}/>
                </Form.Field>
                <Form.Button content='Edit post' positive/>
            </Form>             
                {
                fireRedirect && <Redirect to={`/p/${category}/${id}`} />
                }
            </Segment>
        )    
    }
}

function mapStateToProps({postsReducer}, props){
    const post = postsReducer.posts.filter(post=> post.id===props.match.params.postID)
    return{
        post
    }
}

function mapDispatchToProps(dispatch){
    return{
        addPostInStore: (post)=>dispatch(addPost(post)),
        alterPostInStore: (post)=>dispatch(alterPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)