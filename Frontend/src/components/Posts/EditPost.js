import React, {Component} from 'react'
import {Segment, Form, Label, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {addPost, alterPost, setPostErrors} from '../../actions/postsActions'
import * as API from '../../utils/API'
import * as Helpers from '../../utils/Helpers';

class EditPost extends Component {

    state ={
        id: '',
        title: '',
        body: '',
        fireRedirect: false,
        loading: true
    }

    componentDidMount(){
        if(!Helpers.isNotEmpty(this.props.post)){
            API.fetchPost(this.props.match.params.postID)
            .then(res=> {
                if(Helpers.isNotEmpty(res))
                    this.props.addPostInStore(res)      
                }       
            )
            .catch(err=>this.props.setErrors(err))
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
            id: props.post.id,
            title: props.post.title,
            body: props.post.body,
            category: props.post.category,
            loading: false
        })
    }

    handleFormEdit = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        API.editPost(this.state)
            .then(res=> this.props.alterPostInStore(res))
            .then(this.setState({fireRedirect: true}))
            .catch(err=>this.props.setErrors(err))      
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
                fireRedirect && <Redirect to={`/${category}/${id}`} />
                }
            </Segment>
        )    
    }
}

function mapStateToProps({postsReducer}, props){
    const post = postsReducer.posts.find(post=> post.id===props.match.params.postID)
    return{
        post
    }
}

function mapDispatchToProps(dispatch){
    return{
        addPostInStore: (post)=>dispatch(addPost(post)),
        alterPostInStore: (post)=>dispatch(alterPost(post)),
        setErrors: (postError)=>dispatch(setPostErrors(postError))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)