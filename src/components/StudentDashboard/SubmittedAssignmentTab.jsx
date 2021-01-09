import React from 'react';

import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import cookie from 'react-cookies';
import {apis} from '../../apis/apis';

class SubmittedAssignmentTab extends React.Component {

    constructor() {
        super();
        this.state = {
            grade: ''
        }
    }

    handleViewGradeClick = () => {
        let auth = cookie.load('auth');
        axios.get(apis.getGrade, {
            headers: {
                'Authorization': `bearer ${auth}`
            },
            params: {
                'assignment': this.props.assignment._id
            }
        })
        .then((response) => {
            if(response.data.grade !== ''){
                this.setState({
                    grade: response.data.grade
                });
            }else{
                NotificationManager.info('', 'This assignment has not been graded yet!', 3000);
            }
        })
        .catch((error) => {
            console.log(error);
            NotificationManager.error('Something went wrong', 'Server Error:', 3000);
        });
    }

    render () {
        const {
            assignment
        } = this.props;
    
        let {
            title,
            deadline
        } = assignment;
    
        deadline =  deadline.slice(8, 10) + '-' + deadline.slice(5, 7) + '-' + deadline.slice(0, 4);

        const {
            subject,
            name
        } = assignment.teacher;

        const {
            grade
        } = this.state;
        
        console.log(grade);
        let disabled, btnText;
        if(grade === ''){
            disabled = '';
            btnText = 'View Grade';
        }else{
            disabled='disabled';
            btnText = `Grade ${grade}`;
        }

        return(
            <div style={{boxShadow: '2px 2px 8px 0 rgba(0,0,0,0.5)'}} className="mb-4 rounded bg-success col-11 mx-auto pt-2 pb-2">
                <div className="col-11 mx-auto d-flex justify-content-between align-items-center">
                    <div>
                        <div>
                            <p className="m-0 p-0 text-light" style={{fontSize:24, fontWeight: 'bold'}}>{title}</p>
                        </div>
                        <div>
                            <p className="m-0 p-0 text-light">Subject - {subject}</p>
                        </div>
                        <div>
                            <p className="m-0 p-0 text-light">Teacher - {name}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p className="p-0 m-0 text-warning">Deadline | {deadline}</p>
                        </div>
                        <button disabled={disabled} onClick={this.handleViewGradeClick} className="btn btn-light bg-gradient">
                            {btnText}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubmittedAssignmentTab;