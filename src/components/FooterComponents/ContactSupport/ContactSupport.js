import React, { useState, useEffect } from 'react';
import { validateName, validateEmail } from '../../../Utils/utils';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { service } from '../../../network/FooterComponent/service';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../../Basic/Header';
import csc from 'country-state-city';

const ContactSupport = () => {
    const history = useHistory();
    const [classValues, setClassValues] = useState({
        firstname: '',
        email: '',
        state: '',
        country: '',
        platform: '',
        topic: '',
        message: '',
        issues: ''
    });
    const [values, setValues] = useState({
        firstname: '',
        email: '',
        state: '',
        country: '',
        movie: '',
        platform: '',
        topic: '',
        message: '',
        issues: ''
    });
    const [errors, setErrors] = useState({
        firstname: 'Name',
        email: 'Email',
        state: '',
        country: '',
        platform: 'Platform',
        topic: 'Topic',
        message: 'Message',
        issues: ''
    });
    const [country, setCountry] = useState([]);
    const [button, setButton] = useState(false);
    const [disableblock, setDisableblock] = useState(false);
    const [state, setState] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        let country = csc.getAllCountries();
        setCountry(country);

    }, []);
    const onChangeFunction = (e) => {
        const { name, value } = e.target;
        if (name === 'country') {
            let state = csc.getStatesOfCountry(value);
            setState(state);
            setValues({
                ...values,
                ['country']: value
            })
        }
        if (name === 'issues') {
            if (value === 'Technical Issue') {
                setDisableblock(true);
            } else {
                setDisableblock(false);
            }
        }
        setValues({
            ...values,
            [name]: value
        })
    }
    const validation = () => {
        let errors = {}
        let formIsValid = true;
        if (values.firstname.trim()) {
            if (validateName(values.firstname)) {
                classValues.firstname = '';
                errors.firstname = 'Name';
            } else {
                formIsValid = false;
                classValues.firstname = ' Input--errored';
                errors.firstname = 'Please enter a valid name!';
            }
        } else {
            formIsValid = false;
            classValues.firstname = ' Input--errored';
            errors.firstname = 'Required Field';
        }
        if (values.email.trim()) {
            if (validateEmail(values.email)) {
                classValues.email = '';
                errors.email = 'Email';
            } else {
                formIsValid = false;
                classValues.email = ' Input--errored';
                errors.email = 'Please enter a valid email!';
            }
        } else {
            formIsValid = false;
            classValues.email = ' Input--errored';
            errors.email = 'Required Field';
        }

        if (values.state.trim()) {
            classValues.state = '';
            errors.state = 'State/Province';
        } else {
            formIsValid = false;
            classValues.state = ' Input--errored';
            errors.state = 'Required Field';
        }

        if (values.country.trim()) {
            classValues.country = '';
            errors.country = 'Country';
        } else {
            formIsValid = false;
            classValues.country = ' Input--errored';
            errors.country = 'Required Field';
        }
        if (values.issues.trim()) {
            classValues.issues = '';
            errors.issues = 'Reason';
        } else {
            formIsValid = false;
            classValues.issues = ' Input--errored';
            errors.issues = 'Required Field';
        }

        if (values.message.trim()) {
            if (values.message.length < 5) {
                formIsValid = false;
                classValues.message = ' Input--errored';
                errors.message = 'Minimum 5 character required!';
            } else {
                classValues.message = '';
                errors.message = 'Message';
            }
        } else {
            formIsValid = false;
            classValues.message = ' Input--errored';
            errors.message = 'Required Field';
        }
        setClassValues(classValues);
        setErrors(errors);
        return formIsValid;
    }
    const onSubmitFuntion = (e) => {
        e.preventDefault();
        if (validation()) {
            setButton(true);
            let country = csc.getAllCountries();
            const countryArray = country.filter(countryItem => countryItem.id == values.country);
            values.country = countryArray[0].name;
            service.contact(values).then(response => {
                toast.success("Thanks. We will get back to you shortly");
                if (response.status === 100) {
                    setTimeout(function () {
                        setButton(true);
                        history.push(
                            { pathname: '/contactus' }
                        )
                    }, 3000);
                }
            })
        }
    }
    return (
        <div className="menuCloseJS closeMenuWrapper">
            <ToastContainer />
            <Header />
            <div className="csWrapper csWrapperColor">
                <div className="csContainer">
                    <h1 className="csPageHeading">Support</h1>
                    <form className="csFormMargin csFormWrapper" >
                        <div className="csFormInputWrapper">
                            <div className={"input" + classValues.firstname}>
                                <input className="inputText" style={{ border: 'none' }} name="firstname" type="text" autoComplete="name" value={values.firstname} onChange={onChangeFunction} />
                                <span className="inputLabel">{errors.firstname}</span>
                            </div>
                        </div>
                        <div className="csFormInputWrapper">
                            <div className={"input" + classValues.email}>
                                <input className="inputText" style={{ border: 'none' }} name="email" type="email" autoComplete="email" value={values.email} onChange={onChangeFunction} />
                                <span className="inputLabel">{errors.email}</span>
                            </div>
                        </div>
                        <div className="csFormInputWrapper">
                            <div className={classValues.country} style={{ backgroundColor: '#fff' }}>
                                <select name="country" onChange={onChangeFunction} >
                                    <option>Select Country</option>
                                    {
                                        country.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="csFormInputWrapper">
                            <div className={classValues.state} style={{ backgroundColor: '#fff' }}>
                                <select name="state" onChange={onChangeFunction} >
                                    <option>Select State</option>
                                    {
                                        state.map((item, index) => {
                                            return (
                                                <option key={index} value={item.name}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="csFormInputWrapper">
                            <div className="input">
                                <input className="inputText" style={{ border: 'none' }} name="movie" type="text" value={values.movie} onChange={onChangeFunction} />
                                <span className="inputLabel">Movie/show title (optional)</span>
                            </div>
                        </div>
                        <div className="csFormInputWrapper">
                            <div className={classValues.issues} style={{ backgroundColor: '#fff' }}>
                                <select name="issues" onChange={onChangeFunction} >
                                    <option>Select One</option>
                                    <option value="Technical Issue">Technical Issue</option>
                                    <option value="Advertise of us">Advertise of us</option>
                                    <option value="Partner with us">Partner with us</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        {
                            disableblock === true &&
                            <div className="csFormInputWrapper">
                                <div className={classValues.platform} style={{ backgroundColor: '#fff' }}>
                                    <select name="platform" onChange={onChangeFunction} >
                                        <option>Select Platform</option>
                                        <option value="Roku">Roku</option>
                                        <option value="Android">Android</option>
                                        <option value="Ios">Ios</option>
                                        <option value="Tv4">Tv4</option>
                                    </select>
                                </div>
                            </div>
                        }
                        {
                            disableblock === true &&
                            <div className="csFormInputWrapper" style={{ display: { disableblock } }}>
                                <div className={classValues.topic} style={{ backgroundColor: '#fff' }}>
                                    <select name="topic" onChange={onChangeFunction} >
                                        <option value="Select Topic">Select Topic</option>
                                        <option value="Account">Account</option>
                                        <option value="Audio">Audio</option>
                                        <option value="Content">Content</option>
                                        <option value="Content Request">Content Request</option>
                                        <option value="Registration">Registration</option>
                                        <option value="Sign-In">Sign-In</option>
                                        <option value="Subtitle">Subtitle - Caption</option>
                                        <option value="Video Playlist">Video Playlist</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        }

                        <div className="csFormInputWrapper">
                            <div className={"input inputFixed inputTextarea csFormTextarea" + classValues.message}>
                                <textarea className="inputText" style={{ border: 'none' }} name="message" type="text"
                                    value={values.message} onChange={onChangeFunction}></textarea>
                                <span className="inputLabel">{errors.message}</span>
                            </div>
                        </div>
                        <div className="csPageButton">
                            <button className="button" type="button" onClick={onSubmitFuntion} disabled={button}>
                                <div className="buttonBg"></div>
                                <div className="buttonContent" >Submit</div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ContactSupport;
