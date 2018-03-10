import React, {Component} from 'react'
import {Modal, Header, Form} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {loginUser} from '../../actions/loginActions' 

class LoginForm extends Component {

    state  = {
        username: ''
    }

    handleFormEdit = (e, { name, value }) => this.setState({ [name]: value })
    handleSubmit(){

        const {username} = this.state
        const {PerformLogin} = this.props

        PerformLogin(username)

    }

    render(){

        const {username} = this.state

        return(
            <Modal open={true}>
                <Modal.Header>Before we continue....</Modal.Header>
                <Modal.Content image>
                <Modal.Description>
                    <Header>We identified that dont have a username!</Header>
                    <p>Please, tell us who you are</p>

                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Field>
                            <Form.Input
                                required 
                                fluid 
                                type="text" 
                                value={username} 
                                placeholder="Username" 
                                name="username" 
                                onChange={this.handleFormEdit}/>
                        </Form.Field>
                        <Form.Button positive>Continue</Form.Button>
                    </Form>
                    
                </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        PerformLogin: (username)=>dispatch(loginUser(username))
    }
}

export default connect(null, mapDispatchToProps)(LoginForm)