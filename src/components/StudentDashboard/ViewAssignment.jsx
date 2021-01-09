import React from 'react';

class ViewAssignment extends React.Component {

    constructor() {
        super();
        this.state = {
            animation: 'increase-height'
        }
    }

    handleCloseBtnClick = () => {
        this.setState({
            animation: 'decrease-height'
        });
        setTimeout(() => this.props.toggleShowViewAssignment(), 300);
    }
    
    render() {
        const {
            description
        } = this.props.data;
    

        const {
            animation
        } = this.state; 
    
        return(
            <div className={animation}>
                <hr/>
                <div>
                    <div>
                        <div className="d-flex justify-content-between">
                            <p className="text-light m-0 p-0" style={{fontSize: 22, fontWeight: 'bold'}}>Description -</p>
                            <img onClick={this.handleCloseBtnClick} style={{cursor: 'pointer'}} title="close description" height={20} width={20} src={'https://www.flaticon.com/svg/static/icons/svg/1828/1828665.svg'} alt=""/>
                        </div>
                        <pre className="text-light" style={{fontSize: 16}}>
                            {description}
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewAssignment;