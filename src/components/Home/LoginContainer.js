import React from 'react';
import CheckLogin from './CheckLogin';
import LoginAsStudent from './LoginAsStudent';
import LoginAsTeacher from './LoginAsTeacher';

class LoginContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            showLoginComponent: 'checkLogin'
        }
    }

    handleClickOnLoginAsBtn = (component) => {
        this.setState({
            showLoginComponent: component
        });
    }

    render() {

        const { showLoginComponent } = this.state;

        return(
            <div className="fade-in" style={{backgroundColor: '#989DDD' ,position: 'absolute', height: '110%', width: '95%', marginLeft: '5%'}}> 
                {
                    showLoginComponent === 'checkLogin' && 
                    <CheckLogin
                        handleClickOnLoginAsBtn ={this.handleClickOnLoginAsBtn}
                    />
                }
                {
                    showLoginComponent === 'loginAsStudent' &&
                    <LoginAsStudent
                        handleClickOnLoginAsBtn={this.handleClickOnLoginAsBtn}
                    />
                }
                {
                    showLoginComponent === 'loginAsTeacher' &&
                    <LoginAsTeacher
                        handleClickOnLoginAsBtn={this.handleClickOnLoginAsBtn}
                    />
                }
            </div>
        );
    }
}

export default LoginContainer;