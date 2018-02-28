import React, {Component} from 'react'
import {Segment, Label, Header, Icon, Button} from 'semantic-ui-react'
import * as API from '../utils/API'
import * as helpers from '../utils/Helpers'

class PostDetails extends Component {

    state = {
        post: {

        },
        comments: {

        }
    }

    componentWillMount(){

        const {postID} = this.props.match.params

        API.fetchPost(postID).then(res=>this.setState({post: res}))

    }

    render(){

        const {post} = this.state

        return(
            <Segment>

            </Segment>
           
        )
    }
}

export default PostDetails