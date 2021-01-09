import React from 'react';
import cookie from 'react-cookies';

const TeacherDashboardContainer = (props) => {
    const {
        teacherData,
        handleToggleEditProfile,
        handleToggleAddAssignment,
        handleToggleViewSubmissionsContainer
    } = props;

    const handleClickLogout = () => {
        cookie.remove('auth');
        window.location.reload(true);
    }

    return (
        <div>
            <div className="col-10 mx-auto mb-5">
                <p style={{textAlign: 'center', fontSize: 30}}>Welcome Prof. {teacherData.name}!</p>
            </div>

            <div className="d-flex col-10 col-md-5 justify-content-around mx-auto">
                <div onClick={handleToggleAddAssignment} className="icons" style={{alignItems: 'center', cursor: 'pointer'}}>
                    <img height={130} width={130} src={'https://www.flaticon.com/svg/static/icons/svg/1828/1828817.svg'} alt="Add"/>
                    <p style={{fontSize:20}}>Add Assignment</p>
                </div>
                <div onClick={handleToggleViewSubmissionsContainer} className="icons" style={{alignItems: 'center', cursor: 'pointer'}}>
                    <img height={130} width={130} src={'https://www.flaticon.com/svg/static/icons/svg/2235/2235419.svg'} alt="View"/>
                    <p style={{fontSize:20}}>View Submissions</p>
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

export default TeacherDashboardContainer;