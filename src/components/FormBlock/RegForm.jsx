import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import InputMask from "react-input-mask";
import { load as loadAccount } from '../../redux/account';
import { connect } from 'react-redux';
const renderFieldName = ({input, placeholder, type, meta, defaultValue, isActive }) => {
    let isError = meta.touched && meta.error;
    let showPlac = isError === undefined && isActive;
    return (
        <>
            <input id={placeholder} {...input} className={`form-control ${ isError ? 'errorInput' : '' }`}
                   type={type}
            />
            <div className={`placeholder ${ isError ? 'active' : '' } ${ showPlac ? 'active' : '' }`}>{placeholder}</div>
            {meta.touched && ((meta.error && <span className="error">{meta.error}</span>) || (meta.warning && <span>{meta.warning}</span>))}
        </>
    )
};
const renderFieldEmail = ({input, placeholder, type, meta, defaultValue, isActiveEmailLabel }) => {
    let isError = meta.touched && meta.error;
    let showPlac = isError === undefined && isActiveEmailLabel;
    return (
        <>
            <input id={placeholder} {...input} className={`form-control ${ isError ? 'errorInput' : '' }`}
                   type={type}
            />
            <div className={`placeholder ${ isError ? 'active' : '' } ${ showPlac ? 'active' : '' }`}>{placeholder}</div>
            {meta.touched && ((meta.error && <span className="error">{meta.error}</span>) || (meta.warning && <span>{meta.warning}</span>))}
        </>
    )
};
const renderFieldNumber = ({input, placeholder, type, meta, defaultValue, isActivePhoneLabel }) => {
    let isError = meta.touched && meta.error;
    let showPlac = isError === undefined && isActivePhoneLabel;
    return (
        <>
            <InputMask id={placeholder}
                       mask="+38 (099) 999-99-99"
                       maskChar=""
                       {...input}
                       className={`form-control ${meta.touched && ( meta.error ? 'errorInput' : '' )}`}

            />
            <div className={`placeholder ${ isError ? 'active' : '' } ${ showPlac ? 'active' : '' }`}>{placeholder}</div>
            {meta.touched && ((meta.error && <span className="errorPhone">{meta.error}</span>) || (meta.warning && <span>{meta.warning}</span>))}
        </>
    )
};
let  renderFileInput = ({input, accept, type, meta, placeholder, defaultValue, name }) => {
    return (
        <div className={`coverFileInput ${ meta.touched && meta.error ? 'coverFileInput_Error' : '' }`}>
            <div className="fileInput">
                <div className="btnUpload">Upload</div>
                <div className="innerInput">
                    <input
                        {...input}
                        //name={name}
                        type={type}
                        accept={accept}
                        value={defaultValue}
                        onChange={event => handleChange(event, input)}
                    />
                    <label htmlFor="upload" >{placeholder}</label>
                </div>
            </div>
            {meta.touched && meta.error ? <span className="meta_touched_&&_meta_error">{meta.error}</span> : ''}
        </div>
    );
};
const renderFieldRadio = ({ input, label, type, checked, id, meta, name }) => {
    //console.log(id);
    return(
        <div className="innerBlock">
            <input {...input} type={type} checked={checked} value={id} id={id}/>
            <label htmlFor={id}>{label}</label>
        </div>
    )
};
const required = value => {
    return value ? undefined : 'Required';
}
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined
const number = (value) => {
    return value.replace(/[^\d]/g, '').length === 12 ? undefined : 'Number must be 12 digits';
}
const name = (value) => {
    if(value.length >= 2){
        if(value.length <= 60){
            return undefined;
        }else {
            return 'Should be 2-60 characters';
        }
    }else{
        return 'Should be 2-60 characters';
    }
}

let maxWeight = 5242880,
    maxWidth = 70,
    maxHeight = 70;
let validateImageWeight = imageFile => {
    //console.log(imageFile);
    if (imageFile !== undefined) {
        if(imageFile.length === 1){
            return imageFile[0].size < maxWeight  ? undefined : `User photo should be size must not exceed 5MB`;
        }else{
            return imageFile.size < maxWeight  ? undefined : `User photo should be size must not exceed 5MB`;
        }
    }
};
let validateImageHeight = (imageFile) => {
    if (imageFile !== undefined) {
        if(imageFile.length === 1){
            return imageFile[0].height >= maxHeight && imageFile[0].width > maxWidth ? undefined : `photo should be resolution at least 70x70px`;
        }else{
            return imageFile.height >= maxHeight && imageFile.width > maxWidth ? undefined : `photo should be resolution at least 70x70px`;
        }
    }
};
let requiredPhoto = (imageFile) => {
    //console.log(imageFile);
    if (imageFile !== undefined) {
        //return imageFile.length === 0 ? `Required` : undefined;
        if(imageFile !== 'initialVal'){
            return imageFile.length === 0 ? `Required` : undefined;
        }else{
            return `Required`;
        }
    }
};

let handleChange = (event, input) => {
    //console.log(event.target);
    event.preventDefault();
    let imageFile = event.target.files[0];
    if (imageFile) {
        const localImageUrl = URL.createObjectURL(imageFile);
        const imageObject = new window.Image();
        imageObject.onload = () => {
            imageFile.width = imageObject.naturalWidth;
            imageFile.height = imageObject.naturalHeight;
            input.onChange(imageFile);
            URL.revokeObjectURL(imageFile);
        };
        imageObject.src = localImageUrl;
    }
};
let RegForm = props => {
    const [idChecked, setIdChecked] = useState(props.positions[0].id);
    const [isActive, setIsActive] = useState(false);
    const [isActiveEmailLabel, setIsActiveEmailLabel] = useState(false);
    const [isActivePhoneLabel, setIsActivePhoneLabel] = useState(false);
    const [namePhoto, setNamePhoto] = useState('Upload your photo');
    const { handleSubmit, load, pristine, submitting } = props;

    const handlerInputName = (e) => {
        if(name(e.target.value) === undefined){
            setIsActive(true);
        }else{
            setIsActive(false);
        }
    }
    const handlerInputEmail = (e) => {
        if(email(e.target.value) === undefined){
            setIsActiveEmailLabel(true);
        }else{
            setIsActiveEmailLabel(false);
        }
    }
    const handlerInputPhone = (e) => {
        if(number(e.target.value) === undefined){
            setIsActivePhoneLabel(true);
        }else{
            setIsActivePhoneLabel(false);
        }
    }
    let testNamePhoto = (e) => {
        setNamePhoto(e.name);
    };
    let checkedRadio = (e) => {
        setIdChecked(Number(e.target.getAttribute('id')));
    };
    const data = {
        position_id: props.positions[0].id,
        photo: 'initialVal',
    };
    useEffect(() => {
        load(data);
    },[]);

    return (
        <form onSubmit={handleSubmit} className="coverForm">
            <div className="inputBlock">
                <div className="coverInput">
                    <Field
                        name="name"
                        component={renderFieldName}
                        type="text"
                        placeholder="Your name"
                        validate={[required,name]}
                        isActive={isActive}
                        onBlur={handlerInputName}
                    />
                </div>
                <div className="coverInput">
                    <Field
                        name="email"
                        component={renderFieldEmail}
                        type="text"
                        placeholder="Email"
                        validate={[required, email]}
                        isActiveEmailLabel={isActiveEmailLabel}
                        onBlur={handlerInputEmail}
                    />
                </div>
                <div className="coverInput">
                    <Field
                        name="phone"
                        component={renderFieldNumber}
                        type="number"
                        placeholder="Phone"
                        validate={[required, number]}
                        isActivePhoneLabel={isActivePhoneLabel}
                        onBlur={handlerInputPhone}
                    />
                    <div className="form-text">+38 (XXX) XXX - XX - XX</div>
                </div>
            </div>
            <p>Select your position</p>
            <div className="checkBlock">
                {
                    props.positions.map(item => (
                             <Field
                                name="position_id"
                                component={renderFieldRadio}
                                type="radio"
                                checked={idChecked === item.id ? true : false }
                                label={item.name}
                                id={item.id}
                                onChange={checkedRadio}
                                key={item.id}
                            />
                        )
                    )
                }
            </div>
            <div className="fileBlock">
                <Field
                    name="photo"
                    type="file"
                    accept="image/jpeg, image/jpg"
                    validate={[requiredPhoto, validateImageHeight, validateImageWeight]}
                    component={renderFileInput}
                    placeholder={namePhoto}
                    onChange={testNamePhoto}
                />
            </div>
            <div>
                <button className="btn_custom btnDisabled" type="submit" disabled={pristine || submitting}>Sign up</button>
            </div>
        </form>
    );
};



RegForm = reduxForm({
    form: 'regform', // a unique identifier for this form
})(RegForm);

// You have to connect() to any reducers that you wish to connect to yourself
RegForm = connect(
    state => ({
        initialValues: state.account.data, // pull initial values from account reducer
    }),
    { load: loadAccount }, // bind account loading action creator
)(RegForm);

export default RegForm;