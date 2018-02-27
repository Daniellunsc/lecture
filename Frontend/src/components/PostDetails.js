import React, {Component} from 'react'
import {Segment} from 'semantic-ui-react'

class PostDetails extends Component {

    state = {
        postID: ''
    }

    componentWillMount(){
        console.log(this.props)
        this.setState({postID: this.props.match.params.postID})
        console.log(this.state)
    }

    render(){
        return(
            <Segment>
                <p>{this.state.postID}</p>
            </Segment>
        )
    }
}

export default PostDetails