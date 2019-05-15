import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class UserLogin extends Component {
    constructor(){
        super();
        this.state = {
            userName: '',
            userPassword: '',
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }

    updateState = (e) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('handle submit function');
    }
    
    toggle() {
        this.setState(prevState => ({
        modal: !prevState.modal
        }));
    }

    render() {
        console.log(this.state, "state");
        

        return (
        <div className="flex-container">
            <Button className="newButton loginModalButton" onClick={this.toggle}>{this.props.buttonLabel}</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Login / Register</ModalHeader>
            <form onSubmit={this.handleSubmit}>
            <ModalBody>
                
                    <div>
                        <p>Register New User</p>
                        Name: <input onChange={this.updateState} type="text" name="userName"/><br/>
                        Password: <input onChange={this.updateState} type="password" name="userName"/><br/>                    
                    </div>
                    <div>
                        <p>Login Existing User</p>
                        Name: <input onChange={this.updateState} type="text" name="userName"/><br/>
                        Password: <input onChange={this.updateState} type="password" name="userPassword"/><br/>                    
                    </div>
                        
                    

            </ModalBody>
            <ModalFooter>
                <Button type="submit" color="primary" onClick={this.toggle}>Submit</Button>{' '}
                <Button color="secondary" id="cancel" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </form>
            </Modal>
        </div>
        );
        }
    }

    export default UserLogin;

