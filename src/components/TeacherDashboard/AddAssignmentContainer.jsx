import React from 'react';
import axios from "axios";
import { apis } from '../../apis/apis';
import {NotificationManager} from 'react-notifications';
import cookie from 'react-cookies';
import qs from 'qs';

class AddAssignmentContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            year: '2020',
            deadline: ''
        }
    }

    handleOnSubmit = (event) => {
        event.preventDefault();

        const {
            title,
            description,
            year,
            deadline
        } = this.state;

        let auth = cookie.load('auth');
        let params = {
            'title': title,
            'description': description,
            'year': year,
            'deadline': deadline
        }
        axios.post(apis.addAssignment, qs.stringify(params), {
            headers: {
                'Authorization': `bearer ${auth}` 
            }
        })
        .then((response) => {
            if(response.data.message === 'assignment added'){
                NotificationManager.success('Assignment Added', 'Success:', 3000);
                this.props.handleToggleAddAssignment();
                return;
            }
            NotificationManager.error('Server error', 'Error:', 3000);
        })
        .catch((error) => {
            console.log('error:', error);
            NotificationManager.error('Server error', 'Error:', 3000);
        });
    }

    handleInputChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name] : value
        });
    }

    render() {

        const {
            title,
            description,
            year,
            deadline
        } = this.state;

        const {
            handleToggleAddAssignment
        } = this.props;

        const todaysDate = new Date().toJSON().slice(0,10);

        return(
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh', width:'100vw', position:'fixed', top: 0,backgroundColor: 'rgba(31,58,96,0.7)'}}>
                <div className="col-11 col-lg-5 mx-auto edit-profile" style={{position: 'relative' ,boxShadow: '5px 5px 7px 2px rgba(0, 0, 0, 0.5)' , height: '80vh', backgroundColor: 'white'}}>
                    <div className="mt-2">
                        <p className="text-primary" style={{fontSize: 28, textAlign: 'center'}}>Add an assignment</p>
                        <img onClick= {handleToggleAddAssignment} style={{position: 'absolute', top: 15, left: '94%', cursor: 'pointer'}} title="close" height={20} width={20} src={'https://www.flaticon.com/svg/static/icons/svg/1828/1828665.svg'} alt="close"/>
                    </div>
                    <div className="col-11 col-md-8 mx-auto">
                        <form action="" onSubmit={this.handleOnSubmit}>
                            <div>
                                <input className="form-control" type="text" name="title" value={title} onChange={this.handleInputChange} placeholder="Assignment Title" required="required"/>
                            </div>
                            <div className="mt-2">
                                <textarea className="form-control" style={{resize: 'none'}} name="description" value={description} onChange={this.handleInputChange} placeholder="Description / Questions" cols="25" rows="6" required="required"></textarea>
                            </div>
                            <div>
                                <p className="mb-1 mt-2">Year:</p>
                                <select className="form-control" value={year} onChange={this.handleInputChange} name="year" id="" required="required">
                                    <option value="2010">2010</option>
                                    <option value="2011">2011</option>
                                    <option value="2012">2012</option>
                                    <option value="2013">2013</option>
                                    <option value="2014">2014</option>
                                    <option value="2015">2015</option>
                                    <option value="2016">2016</option>
                                    <option value="2017">2017</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                </select>
                            </div>
                            <div>
                                <p className="mb-1 mt-2">Choose deadline:</p>
                                <input className="form-control" type="date" name="deadline" year={deadline} onChange={this.handleInputChange} min={todaysDate} id="" required="required"/>
                            </div>
                            <div className="mt-3" style={{textAlign: 'center'}}>
                                <button className="btn btn-primary col-12 col-lg-6">
                                    Add Assignment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddAssignmentContainer;