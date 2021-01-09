import React from 'react';
import DashboardOverview from './DashboardOverview';
import StudentProfileSettings from './StudentProfileSettings';
import UpcomingAssignmentsContainer from './UpcomingAssignmentsContainer.jsx';
import SubmittedAssignmentsContainer from './SubmittedAssignmentsContainer.jsx';

import cookie from 'react-cookies';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';

import {apis} from '../../apis/apis';
import '../../assets/css/StudentDashboard.css';

class StudentDashboardContainer extends React.Component {
    
    constructor() {
        super();
        this.state = {
            studentData: {},
            showProfileSettings: false,
            showUpcomingAssignments: false,
            showSubmittedAssignments: false
        }
    }

    componentDidMount() {
        let auth = cookie.load('auth');
        if(!auth){
            this.props.history.push('/');
            return;
        }
        axios.get(apis.getUserDetails, {
            headers: {
                "Authorization" : `bearer ${auth}`
            }
        })
        .then((response)  => {
            if(response.data) {
                NotificationManager.success('Logged in', 'You are', 3000);
            }
            this.setState({
                studentData: response.data.data
            });
        })
        .catch((error) => {
            console.log('error:', error);
            if(error.response.status === 401){
                this.props.history.push('/');
                return;
            }
            NotificationManager.error('Server error', 'Error:', 3000);
        });
    }

    handleToggleEditProfile = () => {
        let { showProfileSettings } = this.state;
        showProfileSettings = !showProfileSettings;
        this.setState({
            showProfileSettings
        });
    }

    handleToggleShowUpcomingAssignments = () => {
        let {showUpcomingAssignments} = this.state;
        showUpcomingAssignments = !showUpcomingAssignments;
        this.setState({
            showUpcomingAssignments
        });
    }

    handleToggleShowSubmittedAssignments = () => {
        let {showSubmittedAssignments} = this.state;
        showSubmittedAssignments = !showSubmittedAssignments;
        this.setState({
            showSubmittedAssignments
        });
    }

    render() {
        const {
            showProfileSettings,
            studentData,
            showUpcomingAssignments,
            showSubmittedAssignments
        } = this.state;


        return(
            <div>
                <div className="col-12 mt-2 mb-5">
                    <p className="" style={{fontSize: 50, textAlign: 'center', fontWeight: 'bold', color: '#5255AC'}}>My Classroom</p>
                </div>
                <DashboardOverview
                    handleToggleEditProfile={this.handleToggleEditProfile}
                    studentData={studentData}
                    handleToggleShowUpcomingAssignments={this.handleToggleShowUpcomingAssignments}
                    handleToggleShowSubmittedAssignments={this.handleToggleShowSubmittedAssignments}
                />
                {
                    showProfileSettings &&
                    <StudentProfileSettings
                        handleToggleEditProfile={this.handleToggleEditProfile}
                        studentData={studentData}
                    />
                }
                {
                    showUpcomingAssignments &&
                    <UpcomingAssignmentsContainer
                        handleToggleShowUpcomingAssignments={this.handleToggleShowUpcomingAssignments}
                    />
                }
                {
                    showSubmittedAssignments &&
                    <SubmittedAssignmentsContainer
                        handleToggleShowSubmittedAssignments={this.handleToggleShowSubmittedAssignments}
                    />
                }

            </div>
        );
    }
}

export default withRouter(StudentDashboardContainer);