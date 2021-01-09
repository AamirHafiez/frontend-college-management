import React from 'react';

class AssignmentDescription extends React.Component {

    constructor() {
        super();
        this.state = {
            animation: 'slide-down-bounce'
        }
    }

    handleClickCloseBtn = () => {
        this.setState({
            animation: 'slide-to-down'
        });
        setTimeout(() => {this.props.toggleShowDescription()}, 450);
    }

    render() {
        const {
            title,
            description,
        } = this.props;
        
        const {
            animation
        } = this.state;

        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', position:'absolute', top: 0, left: 0, overflow: 'hidden'}}>
                <div className={animation + " col-11 col-lg-6 bg-danger"} style={{height: '80%', boxShadow: '2px 2px 5px 0 rgba(0,0,0,0.4)'}}>
                    <div className="mt-2 d-flex justify-content-end col-12" style={{paddingRight: 15, cursor: 'pointer'}} title="close">
                        <img onClick={this.handleClickCloseBtn} height={40} width={40} src={'https://www.flaticon.com/svg/static/icons/svg/992/992491.svg'} alt="close"/>
                    </div>
                    <div className="mx-auto col-11 text-light" style={{overflowY: 'auto', height: '85%'}}>
                        <div>
                            <p style={{textAlign: 'center', fontSize: 28}}>{title}</p>
                        </div>
                        <hr/>
                        <div>
                            <pre style={{fontSize: 18}}>{description}</pre>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AssignmentDescription;