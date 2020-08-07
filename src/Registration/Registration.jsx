import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';

import './Registration.css';
import InputBox from '../InputBox/InputBox';



const validationSchema = yup.object().shape({
    firstname: yup
        .string()
        .required()
        .max(20)
        .matches(/^[a-z A-Z]+$/, "First name cannot contain numbers")
        .typeError('Firstname should not be a number'),
    lastname:yup
        .string()
        .required(),
    email:yup
        .string()
        .required(),
    telephone : yup
        .number()
        .required(),
    state : yup
        .string()
        .required(),
    interest : yup
        .string()
        .required()
       
});
class Registration extends React.Component {
    constructor() {
        super();
        /*Intitial State */
        this.state = {
            user: {
                firstname: '',
                lastname:'',
                email: '',
                age: "",
                email: '',
                telephone: '',
                country: '',
                state: '',
                addr: '',
                addr1: '',
                addr2: '',
                interest: '',
                interestArray: [],
                isSubscribe: false,
                imagePreviewUrl: '',

            },
            error: {
                firstname: '',
                lastname: '',
                age: "",
                email: '',
                telephone: '',
                country: '',
                state: '',
                interest: '',
            }
        }
    }

    

    componentDidMount() {
        /*if its edit profile */
        if (this.props.match.params.id && localStorage.getItem('user') != null) {
            let user = JSON.parse(localStorage.getItem('user')).splice(this.props.match.params.id, 1)

            if (user == '')
                return;
            /*Setting data to the fields*/
            this.setState({
                user: {
                    interestArray : user[0].interest.split(','),
                    ...user[0]
                }
            })
        }
    }

    /*Function invoked on image  upload*/
    fileUpload = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                user: {
                    ...this.state.user,
                    imagePreviewUrl: reader.result
                }
            });
        }
        reader.readAsDataURL(file)
    }


    /*Delete interest*/
    deleteItem = (index,formikProps) => {
        let array = this.state.user.interestArray;
        array.splice(index, 1);
        this.setState({
            user: {
                ...this.state.user,
                interestArray: array,
            }
        })
        formikProps.setFieldValue("interest",array.join(','))
    }

    /*Function ivoked on submitting the form*/
    submitForm = (values) => {
        values ={
            ...values,
            imagePreviewUrl:this.state.user.imagePreviewUrl
        }
        if (localStorage.getItem('user') != null) { 
            let userArray = JSON.parse(localStorage.getItem('user'));
            /*check if it is edit profile or not*/
            if (this.props.match.params.id != null) {
                /*Updating existimg object*/
                userArray.splice(this.props.match.params.id, 1, values);
            }
            else {
                /*Pushing new object to array*/
                userArray.push(values)
            }
            /*Setting value to local Storage*/
            localStorage.setItem('user', JSON.stringify(userArray));

        }
        else {
            localStorage.setItem('user', JSON.stringify([values]));

        }
        this.props.history.push('/list');
    }

    addInterest = (interest)=>{
        this.setState({
            user:{
                ...this.state.user,
                interestArray : interest.trim().split(',')

            }
    })
}


    render() {
        
        return (
            <div className="container">
                <div className="box">
                    <div className="box-left">
                        <div className="upload-photo">
                            {this.state.user.imagePreviewUrl != '' ?  <img className="upload-photo" src={this.state.user.imagePreviewUrl} alt="profile-image" /> : null}
                        </div>
                        {this.props.match.params.editProfilepic || this.props.location.pathname == '/register' ||  this.props.location.pathname == '/register/'?<><span className="upload-text">{this.state.user.imagePreviewUrl == '' ? "Upload your photo": "Change your photo"} </span> 
                        <input type="file" className="input-file" onChange={this.fileUpload} /></>: null}
                        
                    </div>
                    <div className="box-right">
                        <Formik 
                            initialValues={{
                                firstname: this.state.user.firstname,
                                lastname:  this.state.user.lastname,
                                email: this.state.user.email,
                                telephone:this.state.user.telephone,
                                interest:this.state.user.interest,
                                state:this.state.user.state,
                                country:this.state.user.country,
                                age:this.state.user.age,
                                addr1:this.state.user.addr1,
                                addr2:this.state.user.addr2 ,
                                addr:this.state.user.addr,
                                isSubscribed : false                         
                             }}
                            enableReinitialize
                            onSubmit={(values) => {
                                this.submitForm(values)
                            }}
                            validationSchema={validationSchema}

                        >
                            {formikProps => (
                                <Form>
                                    <div className="input-container">
                                        <label>Name</label>
                                        <Field type="text" className="input-box" onChange={formikProps.handleChange} onBlur={formikProps.handleBlur} name="firstname" value={formikProps.values.firstname}
                                            placeholder="firstname" />
                                        <Field type="text" name="lastname" placeholder="lastname" value={formikProps.values.lastname} onBlur={formikProps.handleBlur} onChange={formikProps.handleChange} />
                                        {formikProps.errors.firstname && formikProps.touched.firstname &&
                                            <div className="input-error" style={{left:'100px'}}>
                                                {formikProps.errors.firstname}
                                            </div>}
                                           { formikProps.errors.lastname && formikProps.touched.lastname &&
                                           <div className="input-error" style={{ position: "absolute", right: "0" }}>{formikProps.errors.lastname}</div>}
                                    </div>
                                                             
                                    <div className="input-container">
                                        <label>Age</label>
                                        <input type="range" className="input-box" name="age" value={formikProps.values.age} min="18" max="80" onBlur={formikProps.handleBlur} onChange={formikProps.handleChange}/>
                                            {formikProps.values.age}
                                    </div>
                                    

                                    <div className="input-container">
                                        <label>Email</label>
                                        <Field type="text" className="input-box" name="email" value={formikProps.values.email} onBlur={formikProps.handleBlur} onChange={formikProps.handleChange}/>
                                        {formikProps.errors.email && formikProps.touched.email &&
                                            <div className="input-error" style={{left:'100px'}}>
                                                {formikProps.errors.email}
                                            </div>}
                                    </div>
                                    <div className="input-container">
                                        <label>Tel</label>
                                        <Field type="text" name="telephone" className="input-box"  placeholder="Telephone" value={formikProps.values.telephone} onBlur={formikProps.handleBlur} onChange={formikProps.handleChange} />
                                        {formikProps.errors.telephone && formikProps.touched.telephone &&
                                            <div className="input-error" style={{left:'100px'}}>
                                                {formikProps.errors.telephone}
                                            </div>}
                                    </div>       
                                    <div className="input-container">
                                        <label>Country</label>
                                        <select className="input-box" name="country" value={formikProps.values.country} onBlur={formikProps.handleBlur} onChange={formikProps.handleChange} >
                                            <option value="">Select</option>
                                            <option value="India">India</option>
                                            <option value="Germany">Germany</option>
                                            <option value="France">France</option>
                                        </select>
                                    </div>
                                    <div className="input-container">
                                        <label>State</label>
                                        <select className="input-box" name="state" value={formikProps.values.state} onBlur={formikProps.handleBlur} onChange={formikProps.handleChange} >
                                            <option value="">Select</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Berlin">Berlin</option>
                                            <option value="Paris">Paris</option>
                                        </select>

                                        {formikProps.errors.state && formikProps.touched.state &&
                                            <div className="input-error" style={{left:'100px'}}>
                                                {formikProps.errors.state}
                                        </div>}
                                    </div>
                                    <div className="input-container">
                                        <label>Address</label>
                                        <select className="input-box" name="addr" value={formikProps.values.addr} onBlur={formikProps.handleBlur} onChange={formikProps.handleChange} >
                                            <option>Select</option>
                                            <option value="home">Home</option>
                                            <option value="company">Company</option>
                                        </select>
                                    </div>
                                    {formikProps.values.addr !== '' && formikProps.values.addr != null ? <div className="input-container">
                                        <label></label>
                                        <input type="text" className="input-box" name="addr1" placeholder={this.state.user.addr == 'home' ? 'Address1' : 'Company Address1'} value={formikProps.values.addr1} onBlur={formikProps.handleBlur} onChange={formikProps.handleChange} />
                                        <input type="text" name="addr2" placeholder={formikProps.values.addr == 'home' ? 'Address2' : 'Company Address2'} value={formikProps.values.addr2} onBlur={formikProps.handleBlur} onChange={formikProps.handleChange} />
                                    </div> : null}

                                    <div className="input-container">
                                        <label>Interests</label>
                                        <Field type="text" name="interest" className="input-box" placeholder="Interest1,Interest2" value={formikProps.values.interest} onChange={(e)=>{formikProps.handleChange('interest')(e);this.addInterest(e.target.value)}} />
                                        {formikProps.errors.interest && formikProps.touched.interest &&
                                            <div className="input-error" style={{left:'100px'}}>
                                                {formikProps.errors.interest}
                                            </div>}
                                    </div> 
                                    <div className="interest-wrapper">
                                        <label></label>
                                        {this.state.user.interestArray.map((item, index) => {
                                            return (
                                                item.trim() != '' ? <div className="interest-box" key={index}>
                                                    <span className="interest-item">{item}</span><span className="close-icon" onClick={() => { this.deleteItem(index,formikProps) }}>&times;</span>
                                                </div> : null
                                            )
                                        })}</div>

                                    <div className="input-container">
                                        <label></label>
                                        <input type="checkbox" className="input-box" name="subscribe" value={formikProps.values.isSubscribed} onBlur={formikProps.handleBlur} onChange={formikProps.handleChange}  />
                                        <label className="subscribe-label">Subscribe to news letter</label>

                                    </div>
                                    <div>
                                        <button type="submit" className="submit-btn" onClick={formikProps.handleSubmit}>Submit</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }
}
export default Registration;
