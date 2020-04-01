import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/login.css'

class TextInput extends Component {
    constructor(){
        super()
        this.state = {
            inputValue:"",
            showPass:false
        }
    }

    render = ()=>{
        return (
            <div>
                <input type="text"></input>
            </div>
        );
    }
}

TextInput.propTypes = {
    showPass: PropTypes.bool
}

export default TextInput;

