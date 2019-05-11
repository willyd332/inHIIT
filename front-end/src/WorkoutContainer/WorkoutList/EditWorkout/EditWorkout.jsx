import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EditWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false,

    };

    this.toggle = this.toggle.bind(this);
  }

  selectThisWorkout = () => {
      this.props.modalShows(this.props.workout);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    

    return (
      <div>
        
        <Button color="danger" onClick={(e)=>{this.toggle(); this.selectThisWorkout();}}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit your workout!</ModalHeader>
          
          <form onSubmit={this.props.editWorkout}>
          <ModalBody>
                
                    name: <input onChange={this.props.handleFormChange} type="text" name="name"/><br/>
                    intervalOne: <input onChange={this.props.handleFormChange} type="text" name="intervalOne"/><br/>
                    intervalTwo: <input onChange={this.props.handleFormChange} type="text" name="intervalTwo"/><br/>
                    cycles: <input onChange={this.props.handleFormChange} type="text" name="cycles"/><br/>
                    id: <h1>{this.props.workoutID}</h1>
                
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={this.toggle}>Let's Go!</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </form>
        </Modal>
        
      </div>
    );
  }
}

export default EditWorkout;