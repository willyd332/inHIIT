import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class NewWorkout extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            intervalone: null,
            intervaltwo: null,
            cycles: null,
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }

    updateState = (e) =>{
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div className='flex-container'>
        <Button className='newButton' onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>New Workout</ModalHeader>
          <form onSubmit={this.props.createWorkout.bind(null, this.state)}>
            <ModalBody>


              Name: <input onChange={this.updateState} type='text' name='name'/><br/>
              IntervalOne: <input onChange={this.updateState} type='text' name='intervalone'/><br/>
              IntervalTwo: <input onChange={this.updateState} type='text' name='intervaltwo'/><br/>
              Cycles: <input onChange={this.updateState} type='text' name='cycles'/><br/>



            </ModalBody>
            <ModalFooter>
              <Button type='submit' color='primary' onClick={this.toggle}>Submit</Button>{' '}
              <Button color='secondary' id='cancel' onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default NewWorkout;
