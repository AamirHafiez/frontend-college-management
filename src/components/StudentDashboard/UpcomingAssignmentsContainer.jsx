import React from 'react';
import AssignmentTab from './AssignmentTab';

import axios from 'axios';
import {apis} from '../../apis/apis';
import {NotificationManager} from 'react-notifications';
import cookie from 'react-cookies';

class UpcomingAssignmentsContainer extends React.Component{

    constructor() {
        super();
        this.state = {
            animationClass: 'slide-from-left',
            assignments: [],
            showNoUpComingAssignments: false
        }
    }

    componentDidMount() {
        let auth = cookie.load('auth');
        axios.get(apis.getUpcomingAssignments, {
            headers: {
                'Authorization': `bearer ${auth}`
            }
        })
        .then((response) => {
            let showNoUpComingAssignments = false;
            if(response.data.assignments.length <= 0){  
                showNoUpComingAssignments = true
            }
            this.setState({
                assignments: response.data.assignments,
                showNoUpComingAssignments
            });
        })  
        .catch((error) => {
            NotificationManager.error('Something went wrong', 'Server error:', 3000);
            console.log('error', error);
        });
    }

    handleClickCloseBtn = () => {
        this.setState({
            animationClass: 'slide-to-down'
        });
        setTimeout(() => this.props.handleToggleShowUpcomingAssignments() , 500);
        
    }
    
    afterAssignmentIsUploaded = () => {
        let auth = cookie.load('auth');
        axios.get(apis.getUpcomingAssignments, {
            headers: {
                'Authorization': `bearer ${auth}`
            }
        })
        .then((response) => {
            let showNoUpComingAssignments = false;
            if(response.data.assignments.length <= 0){  
                showNoUpComingAssignments = true
            }
            this.setState({
                assignments: response.data.assignments,
                showNoUpComingAssignments
            });
        })  
        .catch((error) => {
            NotificationManager.error('Something went wrong', 'Server error:', 3000);
            console.log('error', error);
        });
    }

    render() {

        const {
            animationClass,
            assignments,
            showNoUpComingAssignments
        } = this.state;

        return(
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh', width: '100vw', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0}}>
                <div className={animationClass + " col-11 col-lg-6"} style={{boxShadow: '6px 6px 7px 2px rgba(0, 0, 0, 0.4)', height: '80vh', backgroundColor: 'white'}}>
                    <div className="mt-2 d-flex justify-content-end col-12" style={{paddingRight: 15, cursor: 'pointer'}} title="close">
                        <img onClick={this.handleClickCloseBtn} height={20} width={20} src={'https://www.flaticon.com/svg/static/icons/svg/1828/1828665.svg'} alt="close"/>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <p style={{fontSize: 38}}>Your upcoming assignments</p>                       
                    </div>
                    <div style={{height: '80%', overflowY: 'auto'}}>
                        {
                            assignments.map((assignment) => {
                                return <AssignmentTab
                                    data={assignment}
                                    key={assignment._id}
                                    afterAssignmentIsUploaded={this.afterAssignmentIsUploaded}
                                />
                            })
                        }
                        {
                            showNoUpComingAssignments &&
                            <div style={{textAlign: 'center'}}>
                                <p className="text-success mt-5" style={{fontSize: 26}}>No Upcoming Assignments</p>
                                <img className="mt-4" height={60} width={60} src={'https://www.flaticon.com/svg/static/icons/svg/1828/1828640.svg'} alt="Done"/>
                                <p className="text-primary mt-5" style={{fontSize: 22}}>You are all caught up!</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default UpcomingAssignmentsContainer;