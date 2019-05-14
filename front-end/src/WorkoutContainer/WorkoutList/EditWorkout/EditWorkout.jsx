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
        
        <button onClick={(e)=>{this.toggle(); this.selectThisWorkout();}}>Edit</button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit your workout!</ModalHeader>
          
          <form onSubmit={this.props.editWorkout}>
          <ModalBody>
                
                    name: <input onChange={this.props.handleFormChange} type="text" name="name" placeholder={this.props.workout.name}/><br/>
                    intervalOne: <input onChange={this.props.handleFormChange} type="text" name="intervalOne" placeholder={this.props.workout.intervalOne}/><br/>
                    intervalTwo: <input onChange={this.props.handleFormChange} type="text" name="intervalTwo" placeholder={this.props.workout.intervalTwo}/><br/>
                    cycles: <input onChange={this.props.handleFormChange} type="text" name="cycles" placeholder={this.props.workout.cycles}/><br/>

                
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={this.toggle}>Let's Go!</Button>
            <Button color="secondary" id="cancel" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </form>
        </Modal>
        
      </div>
    );
  }
}

export default EditWorkout;