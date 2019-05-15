import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';

class UserLogin extends Component {
    constructor(){
        super();
        this.state = {
            user: {
                userName: '',
                userPassword: '',
                isLogged: false
            },
            
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

    createUser = async (formData, e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const createdUser = await fetch('http://localhost:9000/users', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const parsedResponse = await createdUser.json();
            console.log(parsedResponse, "parsed response");
            this.setState({
                isLogged: true
            })

        } catch(err) {
            console.log(err)
        }
    
    }

    loginUser = (e) => {
        e.preventDefault();
        console.log('loginUser function');
    
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
            
            <ModalBody>
                <form onSubmit={this.createUser.bind(null, this.state)}>
                    <div>
                        <p>Register New User</p>
                        Name: <input onChange={this.updateState} type="text" name="userName"/><br/>
                        Password: <input onChange={this.updateState} type="password" name="userPassword"/><br/>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <form onSubmit={this.loginUser}>
                    <div>
                        <p>Login Existing User</p>
                        Name: <input onChange={this.updateState} type="text" name="userName"/><br/>
                        Password: <input onChange={this.updateState} type="password" name="userPassword"/><br/> 
                        <button type="submit">Submit</button>                   
                    </div>
                </form>
                    

            </ModalBody>

            </Modal>
        </div>
        );
        }
    }

    export default UserLogin;

