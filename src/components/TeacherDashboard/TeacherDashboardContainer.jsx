import React from 'react';
import TeacherDashboardOverview from './TeacherDashboardOverview';
import TeacherProfileSettings from './TeacherProfileSettings';
import AddAssignmentContainer from './AddAssignmentContainer';
import ViewSubmissionsContainer from './ViewSubmissionsContainer';

import cookie from 'react-cookies';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';

import {apis} from '../../apis/apis';
import '../../assets/css/TeacherDashboard.css';


class TeacherDashboardContainer extends React.Component {

    constructor () {
        super();
        this.state = {
            teacherData: {},
            showProfileSettings: false,
            showAddAssignment: false,
            showViewSubmissionsContainer: false,
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
                teacherData: response.data.data
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

    handleToggleAddAssignment = () => {
        let {showAddAssignment} = this.state;
        showAddAssignment = !showAddAssignment;
        this.setState({
            showAddAssignment
        });
    }

    handleToggleViewSubmissionsContainer = () => {
        let {showViewSubmissionsContainer} = this.state;
        showViewSubmissionsContainer = !showViewSubmissionsContainer;
        this.setState({
            showViewSubmissionsContainer
        });
    }

    render() {

        const {
            teacherData,
            showProfileSettings,
            showAddAssignment,
            showViewSubmissionsContainer
        } = this.state;

        return (
            <div>
                <div className="col-12 mt-2 mb-5">
                    <p className="" style={{fontSize: 50, textAlign: 'center', fontWeight: 'bold', color: '#5255AC'}}>My Classroom</p>
                </div>

                <TeacherDashboardOverview
                    teacherData={teacherData}
                    handleToggleEditProfile={this.handleToggleEditProfile}
                    handleToggleAddAssignment={this.handleToggleAddAssignment}
                    handleToggleViewSubmissionsContainer={this.handleToggleViewSubmissionsContainer}
                />

                {
                    showProfileSettings &&
                    <TeacherProfileSettings
                        handleToggleEditProfile={this.handleToggleEditProfile}
                        teacherData={teacherData}
                    />
                }

                {
                    showAddAssignment &&
                    <AddAssignmentContainer
                        handleToggleAddAssignment={this.handleToggleAddAssignment}
                    />
                }
                {
                    showViewSubmissionsContainer &&
                    <ViewSubmissionsContainer
                        handleToggleViewSubmissionsContainer={this.handleToggleViewSubmissionsContainer}
                    />
                }
            </div>
        );
    }
}

export default withRouter(TeacherDashboardContainer);