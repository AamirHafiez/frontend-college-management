import React from "react";

import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import cookie from 'react-cookies';
import {apis} from '../../apis/apis';
import qs from 'qs';
import download from 'downloadjs';

class SubmittedTab extends React.Component {

    constructor(props) {
        super(props);

        let disableGrading = false, grade = 'O';
        if(this.props.student.isGraded){
            disableGrading = true;
            grade = this.props.student.grade
        }

        this.state = {
            grade: grade,
            disableGrading: disableGrading
        }
    }

    onChangeGrade = (event) => {
        this.setState({
            grade: event.target.value
        });
    }

    onClickSubmitGrade = () => {
        let { grade } = this.state;
        let auth = cookie.load('auth');
        axios.post(apis.addGrade, qs.stringify({
            'grade': grade,
            'student': this.props.student._id,
            'assignment': this.props.assignment._id
        }), {
            headers: {
                'Authorization': `bearer ${auth}`
            }
        })
        .then((response) => {
            if(response.data.message === 'grade added'){
                NotificationManager.success('', 'Grade added', 3000);
                this.setState({
                    disableGrading: true
                });
                return;
            }
        })
        .catch((error) => {
            console.log(error);
            NotificationManager.error('Something went wrong', 'Error:', 3000);
        });
    }


    onClickDownloadButton = () => {
        let auth = cookie.load('auth');
        axios.get(apis.downloadPDF, {
            headers: {
                'Authorization': `bearer ${auth}`,
            },
            responseType: 'blob',
            params: {
                student: this.props.student._id,
                assignment: this.props.assignment._id
            }
        })
        .then((response) => {
            download(response.data, this.props.assignment.title + '-' + this.props.student.name, 'application/pdf');
        })
        .catch((error) => {
            console.log(error);
            NotificationManager.error('Something went wrong', 'Error:', 3000);
        });
    }

    render() {

        const {
            grade,
            disableGrading
        } = this.state

        const {
            name,
            email,
            year,
            
        } = this.props.student;

        let disabled;
        disableGrading ? disabled = 'disabled' : disabled = '';

        return(
            <div className="d-flex flex-wrap shadow rounded justify-content-between bg-light p-3 mb-2">
                <div className="col-5">
                    <p className="m-0 p-0" style={{fontSize: 22, fontWeight: "bold"}}>{name}</p>
                    <p className="m-0 p-0">{email}</p>
                </div>
                <div>
                    <p className="m-0 p-0" style={{fontSize: 18, fontWeight: 'bold'}}>Year</p>
                    <p className="m-0 p-0">{year}</p>
                </div>
                <div>
                    <p className="m-0 p-0" style={{fontSize: 18, fontWeight: 'bold'}}>Assignment</p>
                    <button onClick={this.onClickDownloadButton} className="btn btn-danger">
                        Download
                    </button>
                </div>
                <div className="justify-content-center align-items-center mt-n2">
                    <div>
                        
                            {
                                disableGrading 
                                ? <p className="m-0 p-0" style={{fontSize: 18, fontWeight: 'bold'}}> Already Graded </p>
                                : <p className="m-0 p-0" style={{fontSize: 18, fontWeight: 'bold'}}> Grade </p>
                            }
                       
                        
                    </div>
                    <div className="d-flex">
                        
                        <div style={{marginRight: 6}}>
                        <select className="form-select" disabled={disabled} value={grade} onChange={this.onChangeGrade} name="grade" id="">
                            <option value="O">O</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                        </select>
                        </div>
                        
                        <button onClick={this.onClickSubmitGrade} disabled={disabled} className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubmittedTab;