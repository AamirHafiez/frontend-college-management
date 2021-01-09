import React from 'react';
import axios from 'axios';
import qs from 'qs';
import {NotificationManager} from 'react-notifications'

import {apis} from '../../apis/apis';

class SignUpAsTeacher extends React.Component {
    
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            verify_password: '',
            branch: 'computer',
            subject: ''
        }
    }
    
    handleInputChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSignUpClick = () => {
        const {
            name,
            email,
            password,
            verify_password,
            branch,
            subject
        } = this.state;

        if(name === ''){
            NotificationManager.error('', `Please enter your valid name`,3000);
            return;
        }

        if(email === ''){
            NotificationManager.error('', `Please enter your valid email`,3000);
            return;
        }

        if(password !== verify_password){
            NotificationManager.error('Password and verify password', `Don't match`,3000);
            return;
        }

        if(subject === ''){
            NotificationManager.error('', `Please enter your valid subject`,3000);
            return;
        }

        if(password.length < 8) {
            NotificationManager.error('Please enter a password with minimum 8 characters', 'Password Length short', 3000);
            return;
        }

        let params ={
            'name' : name,
            'email': email,
            'password': password,
            'verify_password': verify_password,
            'branch': branch,
            'subject': subject
        }

        axios.post(apis.createTeacher, qs.stringify(params))
        .then((response) => {
            if(response.data.message && response.data.message === 'user already exists'){
                NotificationManager.info('Login instead of signing in', 'Already Exists', 3000);
                return;
            }
            NotificationManager.success('New teacher created', 'Sucess:', 3000);
            this.setState({
                name : '',
                email: '',
                password: '',
                verify_password: '',
                branch: 'computer',
                subject: ''
            });
            this.props.toggleLogin();
        })
        .catch((error) => {
            console.log('error:', error);
            NotificationManager.error('Server error', 'Error:', 3000);
        });
    }
    
    render() {

        const { handleClickOnSignUpAsBtn } = this.props;

        const {
            name,
            email,
            password,
            verify_password,
            branch,
            subject
        } = this.state;

        return(
            <div>
                <div>
                    <p className='text-light mt-2' style={{fontSize: 30, textAlign: 'center'}}>Sign up as Teacher</p>
                </div>
                <div className="col-7 mx-auto">
                    <div className="mb-2">
                        <input value={name} onChange={this.handleInputChange} name="name" className="form-control" type="text" placeholder="Full name" maxLength={40}/>
                    </div>
                    <div className="mb-2">
                        <input value={email} onChange={this.handleInputChange} name="email" className="form-control" type="email" placeholder="Your email" maxLength={40}/>
                    </div>
                    <div className="mb-2">
                        <input value={password} onChange={this.handleInputChange} name="password" className="form-control" type="password" placeholder="Password" maxLength={30}/>
                    </div>
                    <div className="mb-2">
                        <input value={verify_password} onChange={this.handleInputChange} name="verify_password" className="form-control" type="password" placeholder="Verify password" maxLength={30}/>
                    </div>
                    <div className="mb-2">
                        <p className="mb-1">Your branch</p>
                        <select className="form-select" value={branch} onChange={this.handleInputChange} name="branch" id="">
                            <option value="computer">Computer</option>
                            <option value="electronics">Electrical</option>
                            <option value="mechanical">Mechanical</option>
                            <option value="chemical">Chemical</option>
                            <option value="production">Production</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <input value={subject} onChange={this.handleInputChange} name="subject" className="form-control" type="text" placeholder="Subject" maxLength={30}/>
                    </div>

                    <div style={{textAlign: 'center'}}>
                        <button onClick={this.handleSignUpClick} className="btn btn-primary col-6">
                            Sign up
                        </button>
                    </div>
                </div>

                <div className="d-flex justify-content-end col-11">
                    <button onClick={() => handleClickOnSignUpAsBtn('checkSignUp')} className="btn btn-success">
                        Go back
                    </button>
                </div>
            </div>
        );
    }
}

export default SignUpAsTeacher;