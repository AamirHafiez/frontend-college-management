import React from 'react';
import axios from 'axios';
import qs from 'qs';
import cookie from 'react-cookies';
import {NotificationManager} from 'react-notifications';
import {withRouter} from 'react-router-dom';

import {apis} from '../../apis/apis';

class LoginAsStudent extends React.Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    handleInputChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleLoginClick = () => {
        const {
            email,
            password
        } = this.state;
        if(email.length <= 0 || password.length < 8){
            NotificationManager.error('Enter valid email or password', 'Check:', 3000);
            return;
        }
        let params = {
            'email': email,
            'password': password
        }
        axios.post(apis.studentLogin, qs.stringify(params))
        .then((response) => {
            if(response.data.message) {
                if(response.data.message === 'student not found'){
                    NotificationManager.error('Please register', 'Student not found', 3000);
                    return;
                }else if(response.data.message === 'email/password invalid'){   
                    NotificationManager.error('Email or password is invalid', 'Check:', 3000);
                    return;
                }else if(response.data.message === 'student authenticated'){
                    NotificationManager.success('Logged in', 'Successfully', 3000);
                    cookie.save('auth', response.data.data.token, { secure: false});
                    cookie.save('type', 'student', { secure: false});
                    this.props.history.push('/student/dashboard');
                    return;
                }
            }
        })
        .catch((error) => {
            console.log('error:', error);
            NotificationManager.error('Server error', 'Error:', 3000);
        });
    }

    render() {

        const { handleClickOnLoginAsBtn } = this.props;

        const {
            email,
            password
        } = this.state;

        return(
            <div className="mt-5 pt-1">
                <div className="mt-5">
                    <p className="text-light" style={{fontSize: 35, textAlign: 'center'}}>Student Login</p>
                </div>
                <div className="mb-5">
                    <div className="col-6 mx-auto mb-3">
                        <input name="email" value={email} onChange={this.handleInputChange} className="form-control" maxLength={40} type="email" placeholder="Your Email"/>
                    </div>
                    <div className="col-6 mx-auto">
                        <input name="password" value={password} onChange={this.handleInputChange} className="form-control" maxLength={30} type="password" placeholder="Your Password"/>
                    </div>
                    <div className="col-6 mx-auto mt-3" style={{textAlign: 'center'}}>
                        <button onClick={this.handleLoginClick} className="col-10 btn btn-primary" style={{height: 40}}>
                            Login
                        </button>
                    </div>
                </div>

                <div className="d-flex justify-content-end col-11">
                    <button onClick={() => handleClickOnLoginAsBtn('checkLogin')} className="btn btn-success">
                        Go back
                    </button>
                </div>
            </div>
        );
    }
} 

export default withRouter(LoginAsStudent);