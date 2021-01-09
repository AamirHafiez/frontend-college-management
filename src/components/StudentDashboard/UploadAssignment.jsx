import React from 'react';

import {NotificationManager} from 'react-notifications';
import axios from 'axios';
import cookie from 'react-cookies';
import {apis} from '../../apis/apis';

class UploadAssignment extends React.Component {

    constructor() {
        super();
        this.state = {
            animation: 'increase-height',
            selectedFile: null
        }
    }

    handleCloseBtnClick = () => {
        this.setState({
            animation: 'decrease-height'
        });
        setTimeout(() => this.props.toggleShowUploadAssignment(), 300);
    }

    handleFileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    handleOnClickSubmit = (event) => {
        event.preventDefault();
        let { selectedFile } = this.state;
        if(selectedFile === null){
            NotificationManager.error('Please upload a file before submitting', 'Error', 3000);
            return;
        }
        if(selectedFile.type !== "application/pdf"){
            NotificationManager.error('Please upload only PDFs', 'Error', 3000);
            return;
        }
        if(selectedFile.size > 6000000){
            NotificationManager.error('Please upload PDFs of size less than 5MB', 'Error', 3000);
            return;
        }

        const data = new FormData();
        data.append('file', selectedFile);
        let auth = cookie.load('auth');
        axios.post(apis.uploadAssignmentPDF, data, {
            headers: {
                'Authorization': `bearer ${auth}`,
                'Content-Type': 'multipart/form-data',
                'id': this.props.assignmentId
            } 
        })
        .then((response) => {
            if(response.data.message === 'assignment uploaded'){
                NotificationManager.success('Assignment Submitted', '', 3000);
                this.props.afterAssignmentIsUploaded();
            }else{
                NotificationManager.error('Something went wrong', 'Server error:', 3000);
            }
        })
        .catch((error) => {
            NotificationManager.error('Something went wrong', 'Server error:', 3000);
            console.log('error', error);
        });
    }

    render() {

        const {
            animation,
        } = this.state;

        return(
            <div className={animation}>
                <hr/>
                <div>
                    <div>
                        <div className="d-flex justify-content-end">
                            <img onClick={this.handleCloseBtnClick} style={{cursor: 'pointer'}} title="close upload" height={20} width={20} src={'https://www.flaticon.com/svg/static/icons/svg/1828/1828665.svg'} alt=""/>
                        </div>
                        <div>
                            <form action="">
                                <div className="form-group col-6 mt-2">
                                    <label htmlFor="upload-file">
                                        <p className="p-0 m-0 text-light">Upload only pdf files* (size less than 5MB)</p>
                                    </label>
                                    <input onChange={this.handleFileChange} accept=".pdf" type="file" name="" id="upload-file" className="form-control"/>
                                </div>
                                <div>
                                    <button onClick={this.handleOnClickSubmit} className="btn btn-success mt-2">
                                        Submit Assignment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadAssignment;