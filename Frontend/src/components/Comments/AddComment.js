import React, {Component} from 'react'
import FormComment from '../SharedComponents/FormComment'
import * as API from '../../utils/API'
import {connect} from 'react-redux'
import {addComment} from '../../actions/commentsActions'
 
class AddComment extends Component{

  handleSubmit(value){

    const {body} = value
    const {author} = this.props

    API.makeComment({
      parentId: this.props.postID,
      body,
      author,
    }).then(res=>this.props.addCommentToStore(res, this.props.postID, 1))
  }

  render(){
    return(
      <FormComment onSubmit={this.handleSubmit.bind(this)}/>
    )
  }
}

function mapStateToProps({loginReducer}){
  return{
    author: loginReducer.username
  }
}

function mapDispatchToProps(dispatch){
  return{
    addCommentToStore: (comment, postid, value) => dispatch(addComment(comment, postid, value))
  }
}

  export default connect(mapStateToProps, mapDispatchToProps)(AddComment)