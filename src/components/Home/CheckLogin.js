import React from 'react';

const CheckLogin = (props) => {

    const { handleClickOnLoginAsBtn } = props;

    return (
        <div>
            <div className="mt-5 mb-5">
                <p className="text-light" style={{fontSize: 36, textAlign: 'center', fontWeight: 'bold'}}>Login as:</p>
            </div>            
            <div className="d-flex col-10 mx-auto justify-content-around">
                <div onClick={() => handleClickOnLoginAsBtn('loginAsStudent')} style={{cursor: 'pointer'}} className="scale-more d-flex flex-column align-items-center"> 
                    <img height={150} width={150} src={'https://www.flaticon.com/svg/static/icons/svg/2302/2302834.svg'} alt="Student"/>
                    <p className="text-light" style={{fontSize: 25}}>Student</p>
                </div>
                <div onClick={() => handleClickOnLoginAsBtn('loginAsTeacher')} style={{cursor: 'pointer'}} className="scale-more d-flex flex-column align-items-center"> 
                    <img height={150} width={150} src={'https://www.flaticon.com/svg/static/icons/svg/1089/1089129.svg'} alt="Teacher"/>
                    <p className="text-light" style={{fontSize: 25}}>Teacher</p>
                </div>
            </div>
        </div>
    );
}

export default CheckLogin;