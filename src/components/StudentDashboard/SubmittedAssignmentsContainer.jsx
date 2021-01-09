import React from 'react';
import SubmittedAssignmentTab from './SubmittedAssignmentTab';

import axios from 'axios';
import {apis} from '../../apis/apis';
import {NotificationManager} from 'react-notifications';
import cookie from 'react-cookies';

class SubmittedAssignmentsContainer extends React.Component{

    constructor() {
        super();
        this.state = {
            animationClass: 'slide-from-right',
            assignmentsSubmitted: [],
            showNoAssignmentsSubmitted: true,
        }
    }

    componentDidMount() {
        let auth = cookie.load('auth');
        axios.get(apis.getSubmittedAssignments, {
            headers: {
                'Authorization': `bearer ${auth}`
            }
        })
        .then((response) => {
            console.log('-------------------------------------------------',response.data);
            if(response.data.assignmentsSubmitted === 'none'){
                this.setState({
                    assignmentsSubmitted: [],
                    showNoAssignmentsSubmitted: true
                });
                return;
            }
            this.setState({
                assignmentsSubmitted: response.data.assignmentsSubmitted,
                showNoAssignmentsSubmitted: false
            });
        })
        .catch((error) => {
            NotificationManager.error('Something went wrong','Server Error:', 3000);
            console.log('error', error);
        });
    }

    handleClickCloseBtn = () => {
        this.setState({
            animationClass: 'slide-to-down'
        });
        setTimeout(() => this.props.handleToggleShowSubmittedAssignments() , 300);
    }
    
    render() {

        const {
            animationClass,
            assignmentsSubmitted,
            showNoAssignmentsSubmitted
        } = this.state;

        return(
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh', width: '100vw', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0}}>
                <div className={animationClass + " col-11 col-lg-6"} style={{boxShadow: '6px 6px 7px 2px rgba(0, 0, 0, 0.4)', height: '80vh', backgroundColor: 'white'}}>
                    <div className="mt-2 d-flex justify-content-end col-12" style={{paddingRight: 15, cursor: 'pointer'}} title="close">
                        <img onClick={this.handleClickCloseBtn} height={20} width={20} src={'https://www.flaticon.com/svg/static/icons/svg/1828/1828665.svg'} alt="close"/>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <p style={{fontSize: 38}}>Submitted assignments</p>                       
                    </div>
                    <div style={{height: '80%', overflowY: 'auto'}}>
                        {
                            assignmentsSubmitted.map((assignment) => {
                                return(
                                    <SubmittedAssignmentTab
                                        assignment={assignment}
                                        key={assignment.id  }
                                    />
                                )
                            })
                        }
                        {
                            showNoAssignmentsSubmitted &&
                            <div style={{textAlign: 'center'}}>
                                <img height={180} width={180} src={'https://www.flaticon.com/svg/static/icons/svg/1720/1720481.svg'} alt="nothing"/>
                                <p className="text-primary mt-5" style={{fontSize: 25}}>You have not submitted any assignments yet!</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default SubmittedAssignmentsContainer;