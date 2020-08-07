import React, { Component } from 'react';
import './InputBox.css';

class InputBox extends React.Component {
    render() {
        const {label,type,name,value,onValueChange,error} = this.props;
        return (
            <div className="input-container">
                <label>{label}</label>
                <input type={type} className="input-box" name={name} value={value} onChange={(e)=>{onValueChange(e)}} />
                <div className="input-error">{error}</div>
            </div>
        )
    }
}
export default InputBox;
