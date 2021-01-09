import React from 'react';
import cookie from 'react-cookies';

const DashboardOverview = (props) => {

    const {
        handleToggleEditProfile,
        studentData,
        handleToggleShowUpcomingAssignments,
        handleToggleShowSubmittedAssignments
    } = props;

    const handleClickLogout = () => {
        cookie.remove('auth');
        window.location.reload(true);
    }

    return(
        <div>
            <div className="col-10 mx-auto">
                <p style={{textAlign: 'center', fontSize: 30}}>Welcome {studentData.name}!</p>
            </div>
            <div className="col-10 mx-auto border">
                <div className="mt-4">
                    <p style={{textAlign: 'center', fontSize: 24}}>View your:</p>
                </div>
                <div className="d-flex col-8 justify-content-around mx-auto">
                    <div onClick={handleToggleShowSubmittedAssignments} className="sub-assign" style={{cursor: 'pointer', textAlign:'center'}}>
                        <img height={200} width={200} src={'https://www.flaticon.com/svg/static/icons/svg/892/892639.svg'} alt="prev"/>
                        <p style={{textAlign:'center', fontSize: 28}}>Submitted Assignments</p>
                    </div>
                    <div onClick={handleToggleShowUpcomingAssignments} className="up-assign" style={{cursor: 'pointer', textAlign:'center'}}>
                        <img height={200} width={200} src={'https://www.flaticon.com/svg/static/icons/svg/892/892655.svg'} alt="next"/>
                        <p style={{textAlign:'center', fontSize: 28}}>Upcoming Assignments</p>
                    </div>
                </div>
            </div>
            <div className="mt-3" style={{textAlign: 'center'}}>
                <button onClick={handleToggleEditProfile} className="btn btn-primary col-md-4 col-lg-2 col-8">
                    Profile Settings
                </button>
            </div>
            <div className="mt-3" style={{textAlign: 'center'}}>
                <button onClick= {handleClickLogout} className="btn btn-success col-md-4 col-lg-2 col-8">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default DashboardOverview;