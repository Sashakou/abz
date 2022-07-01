import React from 'react';

let Alert = props => {
    if(props.alert.show){
        return (
            <div className="popupError" onClick={props.close}>
                <div className="innerBlock">
                    <h3>{props.alert.type}</h3>
                    <p className={props.alert.type}>{props.alert.text}</p>
                </div>
            </div>
        )
    }
}
export default Alert;
