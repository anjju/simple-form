import React, { Component } from 'react';
import './List.css';

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }

    }
    
    redirectPage = (index,type) => {

        if(type == 'p')
            this.props.history.push('register/' + index);

        else{
            this.props.history.push('register/' + index+"/1") 
        }
    }
    render() {
        return (
            <div className="container">
                <div className="box">
                    {this.state.user.map((item, index) => {
                        return (
                            <div className="box-conatiner" key={index}>
                                <div className="box-left">
                                    <div className="upload-photo">
                                        {item.imagePreviewUrl != '' ? <img src={item.imagePreviewUrl} className="upload-photo" alt="profile-photo" /> : null}
                                    </div>
                                    <div className="link-text"  onClick={() => { this.redirectPage(index,"i")}} >Edit Image</div>
                                    <div className="link-text"onClick={() => { this.redirectPage(index,"p") }}>Edit Profile</div>
                                </div>
                                <div className="box-right">

                                    <div>
                                        <span>I am {item.firstname} {item.lastname} and I am  {item.age} years and
                                    you can send your mails to {item.email}.I live in the state of {item.state}.
                                    I like to </span>
                                    {item.interest.split(',').map((interest, index) => {

                                            return (
                                                < React.Fragment key={index}>
                                                    {index == item.interest.split(',').length - 1 && item.interest.split(',').length > 1 ? <span> and </span> : index != 0 ? "," : null} <span>{interest}</span>
                                                </React.Fragment >
                                            )
                                        })} 
                                        
                                        <span>
                                            .And please send me the news letters.Please reach out
                             to my phone on {item.telephone}.</span>
                                    </div>



                                </div>
                            </div>)
                    })}
                </div>
            </div>
        )
    }
}
export default List;
