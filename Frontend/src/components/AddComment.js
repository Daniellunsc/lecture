import React, {Component} from 'react'
import FormComment from './FormComment'
import * as API from '../utils/API'
import {connect} from 'react-redux'
import {AddCommentToStore} from '../actions/commentsActions'
 
class AddComment extends Component{

  handleSubmit(value){

    console.log(this.props)

    API.makeComment({
      parentId: this.props.postID,
      ...value
    }).then(res=>this.props.addCommentToStore(res, this.props.postID, 1))
  }

  render(){
    console.log(this.props)
    return(
      <FormComment onSubmit={this.handleSubmit.bind(this)}/>
    )
  }
}

function mapDispatchToProps(dispatch){
  return{
    addCommentToStore: (comment, postid, value) => dispatch(AddCommentToStore(comment, postid, value))
  }
}

  export default connect(null, mapDispatchToProps)(AddComment)