import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class NewWorkout extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            intervalOne: null,
            intervalTwo: null,
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
      <div>
        <Button onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <form onSubmit={this.props.createWorkout.bind(null, this.state)}>
          <ModalBody>
            
                
                    name: <input onChange={this.updateState} type="text" name="name"/><br/>
                    intervalOne: <input onChange={this.updateState} type="text" name="intervalOne"/><br/>
                    intervalTwo: <input onChange={this.updateState} type="text" name="intervalTwo"/><br/>
                    cycles: <input onChange={this.updateState} type="text" name="cycles"/><br/>
                    
                

          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={this.toggle}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default NewWorkout;




// import React, {Component} from 'react';

// class NewWorkout extends Component {
//     constructor(){
//         super();
//         this.state = {
//             name: '',
//             intervalOne: null,
//             intervalTwo: null,
//             cycles: null,
//             modal: false
//         }
//         this.toggle = this.toggle.bind(this);
//     }

//     updateState = (e) =>{
//         e.preventDefault();
//         this.setState({
//             [e.currentTarget.name]: e.currentTarget.value
//         })
//     }

//     render(){
//         // console.log(this.state, 'new workout')
//         return(
//             <div>
//                 <p>New Werkout form here</p>
//                 <form onSubmit={this.props.createWorkout.bind(null, this.state)}>
//                     name: <input onChange={this.updateState} type="text" name="name"/><br/>
//                     intervalOne: <input onChange={this.updateState} type="text" name="intervalOne"/><br/>
//                     intervalTwo: <input onChange={this.updateState} type="text" name="intervalTwo"/><br/>
//                     cycles: <input onChange={this.updateState} type="text" name="cycles"/><br/>
//                     <button type="submit">Submit</button>
//                 </form>

//             </div>
//         )
//     }
// }

// export default NewWorkout;