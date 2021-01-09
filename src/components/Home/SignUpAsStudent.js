import React from 'react';
import axios from 'axios';
import qs from 'qs';
import {NotificationManager} from 'react-notifications'

import {apis} from '../../apis/apis';

class SignUpAsStudent extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            verify_password: '',
            branch: 'computer',
            year: '2020'
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
            year
        } = this.state;

        if(name === ''){
            NotificationManager.error('', `Please enter your valid name`,3000);
            return;
        }

        if(email === ''){
            NotificationManager.error('', `Please enter your valid name`,3000);
            return;
        }

        if(password !== verify_password){
            NotificationManager.error('Password and verify password', `Don't match`,3000);
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
            'year': year
        }

        axios.post(apis.createStudent, qs.stringify(params))
        .then((response) => {
            if(response.data.message && response.data.message === 'user already exists'){
                NotificationManager.info('Login instead of signing in', 'Already Exists', 3000);
                return;
            }
            NotificationManager.success('New student created', 'Sucess:', 3000);
            this.setState({
                name : '',
                email: '',
                password: '',
                verify_password: '',
                branch: 'computer',
                year: '2020'
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
            year
        } = this.state;

        return(
            <div>
                <div>
                    <p className='text-light mt-2' style={{fontSize: 30, textAlign: 'center'}}>Sign up as Student</p>
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
                        <select value={branch} onChange={this.handleInputChange} className="form-select" name="branch" id="">
                            <option value="computer">Computer</option>
                            <option value="electronics">Electrical</option>
                            <option value="mechanical">Mechanical</option>
                            <option value="chemical">Chemical</option>
                            <option value="production">Production</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <p className="mb-1">Year of joining</p>
                        <select value={year} onChange={this.handleInputChange} name="year" id="">
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                            <option value="2012">2012</option>
                            <option value="2013">2013</option>
                            <option value="2014">2014</option>
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                        </select>
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

export default SignUpAsStudent;