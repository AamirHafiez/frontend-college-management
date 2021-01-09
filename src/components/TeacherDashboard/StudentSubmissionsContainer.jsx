import React from 'react';
import SubmittedTab from './SubmittedTab';

import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import cookie from 'react-cookies';
import {apis} from '../../apis/apis';

class StudentSubmissionsContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            animation: 'slide-down-bounce',
            submittedBy: []
        }
    }

    componentDidMount() {
        let auth = cookie.load('auth');
        axios.get(apis.getSubmissions, {
            headers: {
                'Authorization': `bearer ${auth}`
            },
            params: {
                'id': this.props.assignment._id
            }
        })
        .then((response) => {
            this.setState({
                submittedBy: response.data.submittedBy
            });
        })
        .catch((error) => {
            console.log(error);
            NotificationManager.error('Something went wrong', 'Server Error', 3000);
        });
    }

    handleClickCloseBtn = () => {
        this.setState({
            animation: 'slide-to-down'
        });
        setTimeout(() => {this.props.toggleShowSubmissionsOfStudents()}, 450);
    }

    render() {
        
        const {
            animation,
            submittedBy
        } = this.state;

        const {
            title
        } = this.props.assignment;

        let noOneSubmitted = true;
        submittedBy.length <= 0 ? noOneSubmitted = true : noOneSubmitted = false;

        return(
            <div className="d-flex justify-content-center align-items-center" style={{height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', position:'absolute', top: 0, left: 0, overflow: 'hidden'}}>
                <div className={animation + " col-11 col-md-8 bg-success"} style={{height: '80%', boxShadow: '2px 2px 5px 0 rgba(0,0,0,0.4)', overflowY: 'auto'}}>
                    <div className="mt-2 d-flex justify-content-end col-12" style={{paddingRight: 15, cursor: 'pointer'}} title="close">
                        <img onClick={this.handleClickCloseBtn} height={40} width={40} src={'https://www.flaticon.com/svg/static/icons/svg/992/992491.svg'} alt="close"/>
                    </div>
                    <div>
                        <p className="text-light p-0 m-0" style={{textAlign: 'center', fontSize: 28}}>{title}</p>
                        <p className="text-light" style={{textAlign: 'center', fontSize: 18}}>Submissions</p>
                    </div>
                    <div>
                        <p className="text-light p-2 m-0">Submitted by -</p>
                    </div>
                    
                    <div className="col-11 mx-auto p-2" style={{height: '70%', overflowY: 'auto'}}>
                        {
                            submittedBy.map((student) => {
                                return(
                                    <SubmittedTab
                                        student={student}
                                        key={student._id}
                                        assignment={this.props.assignment}
                                    />
                                );
                            })
                        }
                        {
                            noOneSubmitted &&
                            <div style={{textAlign: 'center'}}>
                                <p style={{fontSize: 30}} className="mt-5 text-danger">No assignment has been submitted yet</p>
                                <img height={150} width={150} src={'https://www.flaticon.com/svg/static/icons/svg/817/817778.svg'} alt="oops"/>
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentSubmissionsContainer;