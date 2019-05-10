import React, {Component} from 'react';

class NewWorkout extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            intervalOne: null,
            intervalTwo: null,
            cycles: null
        }
    }

    updateState = (e) =>{
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    render(){

        return(
            <div>
                <p>New Werkout form here</p>
                <form onSubmit={this.props.createWorkout.bind(null, this.state)}>
                    name: <input onChange={this.updateState} type="text" name="name"/><br/>
                    intervalOne: <input onChange={this.updateState} type="text" name="intervalOne"/><br/>
                    intervalTwo: <input onChange={this.updateState} type="text" name="intervalTwo"/><br/>
                    cycles: <input onChange={this.updateState} type="text" name="cycles"/><br/>
                    <button type="submit">Submit</button>
                </form>

            </div>
        )
    }
}

export default NewWorkout;