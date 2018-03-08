import React, {Component} from 'react'
import FormComment from './FormComment'
import * as API from '../utils/API'
 
class AddComment extends Component{

  handleSubmit(value){

    console.log(this.props)

    API.makeComment({
      parentId: this.props.postID,
      ...value
    }).then(res=>console.log(res))
  }

  render(){
    console.log(this.props)
    return(
      <FormComment onSubmit={this.handleSubmit.bind(this)}/>
    )
  }
}

export default AddComment