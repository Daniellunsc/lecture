import React, {Component} from 'react'

import {Button} from 'semantic-ui-react'

import {Link} from 'react-dom'

class AddPostButton extends Component {

    render(){
        return(
            <Button as={Link} to={'/add'} floated='right' positive size='tiny'>Add Post</Button>
        )
    }

}
    


export default AddPostButton