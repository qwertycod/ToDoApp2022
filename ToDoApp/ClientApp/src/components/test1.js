import React, { Component } from 'react';

changeHandler = (e) => {
    this.setState({
        [e.target.name] : e.targer.value
    })
}

handleButtonClick = () => {
    this.setState({
        p: 1,
        p2 : 2
    })
}

class test1 extends Component {
    render() {
        return (
            <div>
                <input type="text" name="fname" onChange={this.changeHandler} />
                <button type="button" onClick={this.handleButtonClick}/>
            </div>
        );
    }
}

export default test1;