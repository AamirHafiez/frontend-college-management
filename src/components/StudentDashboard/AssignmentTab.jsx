import React from 'react';
import ViewAssignment from './ViewAssignment';
import UploadAssignment from './UploadAssignment';

class AssignmentTab extends React.Component{

    constructor(props) {
        super(props);
        const { data } = this.props;
        let date = data.deadline;
        date = date.slice(8, 10) + '-' + date.slice(5, 7) + '-' + date.slice(0, 4);
        this.state = {
            title: data.title,
            subject: data.teacher.subject,
            deadline: date,
            teacher: data.teacher.name,
            showViewAssignment: false,
            showUploadAssignment: false,
        }
    }

    toggleShowViewAssignment = () => {
        let { showViewAssignment, showUploadAssignment } = this.state;
        showViewAssignment = !showViewAssignment;
        if(showUploadAssignment){
            showUploadAssignment = !showUploadAssignment
        }
        this.setState({
            showViewAssignment,
            showUploadAssignment
        });
    }

    toggleShowUploadAssignment = () => {
        let { showUploadAssignment, showViewAssignment } = this.state;
        showUploadAssignment = !showUploadAssignment;
        if(showViewAssignment){
            showViewAssignment = !showViewAssignment
        }
        this.setState({
            showUploadAssignment,
            showViewAssignment
        });
    }

    render() {

        const { 
            title,
            subject,
            deadline,
            teacher,
            showViewAssignment,
            showUploadAssignment
        } = this.state;

        const {
            data,
            afterAssignmentIsUploaded
        } = this.props;

        return(
            <div  style={{boxShadow: '2px 2px 8px 0 rgba(0,0,0,0.5)'}} className="mb-4 mx-auto rounded p-2 bg-primary col-11">
                <div className="d-flex flex-wrap justify-content-between">
                    <div>
                        <div>
                            <p style={{fontSize:24, fontWeight: 'bold'}} className="p-0 m-0 text-light">{title}</p>
                        </div>
                        <div>
                            <p className="p-0 m-0 text-light">Subject - {subject}</p>
                        </div>
                        <div>
                            <p className="p-0 m-0 text-light">Teacher - Prof. {teacher}</p>
                        </div>
                    </div>
                    <div className="d-flex col-4 d-flex flex-wrap justify-content-around align-items-center">
                        <div className="mb-1">
                            {
                                !showViewAssignment && 
                                <button className="btn btn-danger" onClick={this.toggleShowViewAssignment}>
                                    View
                                </button>
                            }
                            
                        </div>
                        <div className="mb-1">
                            {
                                !showUploadAssignment &&
                                <button className="btn btn-success" onClick={this.toggleShowUploadAssignment}>
                                    Upload
                                </button>
                            }

                        </div>
                        <div>
                            <p style={{fontWeight: 'bolder'}} className="p-0 m-0 text-warning">Deadline</p>
                            <p style={{fontWeight: 'bolder'}} className="p-0 m-0 text-light">{deadline}</p>
                        </div>
                    </div>
                </div>
                {
                    showViewAssignment &&
                    <ViewAssignment
                        toggleShowViewAssignment = {this.toggleShowViewAssignment}
                        data={data}
                    />
                }
                {
                    showUploadAssignment &&
                    <UploadAssignment
                        toggleShowUploadAssignment = {this.toggleShowUploadAssignment}
                        assignmentId = {data._id}
                        afterAssignmentIsUploaded={afterAssignmentIsUploaded}
                    />
                }
            </div>
            
        );
    }
}

export default AssignmentTab;