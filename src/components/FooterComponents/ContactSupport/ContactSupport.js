import React, { useState, useEffect } from 'react';
import { validateName, validateEmail } from '../../../Utils/utils';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { service } from '../../../network/FooterComponent/service';
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
        message: ''
    });
    const [values, setValues] = useState({
        firstname: '',
        email: '',
        state: '',
        country: '',
        movie: '',
        platform: '',
        topic: '',
        message: ''
    });
    const [errors, setErrors] = useState({
        firstname: 'Name',
        email: 'Email',
        state: 'State/Province',
        country: 'Select Country',
        platform: 'Platform',
        topic: 'Topic',
        message: 'Message'
    });
    const [country, setCountry] = useState([]);
    const [button, setButton] = useState(false);
    const [disableblock, setDisableblock] = useState(false);
    const [state, setState] = useState([]);
    useEffect(() => {
        // window.scrollTo(0, 0);
        let country = csc.getAllCountries();
        console.log('COUNTRY', country);
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
            classValues.email = ' Input--errored'
            errors.email = 'Required Field'
        }

        if (values.state.trim()) {
            classValues.state = ''
            errors.state = 'State/Province'
        } else {
            formIsValid = false;
            classValues.state = ' Input--errored'
            errors.state = 'Required Field'
        }

        if (values.country.trim()) {
            classValues.country = ''
            errors.country = 'Country'
        } else {
            formIsValid = false;
            classValues.country = ' Input--errored'
            errors.country = 'Required Field'
        }

        if (values.platform.trim()) {
            classValues.platform = ''
            errors.platform = 'Platform'
        } else {
            formIsValid = false;
            classValues.platform = ' Input--errored'
            errors.platform = 'Required Field'
        }

        if (values.topic.trim()) {
            classValues.topic = ''
            errors.topic = 'Topic'
        } else {
            formIsValid = false;
            classValues.topic = ' Input--errored'
            errors.topic = 'Required Field'
        }

        if (values.message.trim()) {
            console.log(values.message.length)
            if (values.message.length > 6) {
                classValues.message = ''
                errors.message = 'Message'
            } else {
                formIsValid = false;
                classValues.message = ' Input--errored'
                errors.message = 'Minimum 5 character required!'
            }
        } else {
            formIsValid = false;
            classValues.message = ' Input--errored'
            errors.message = 'Required Field'
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
            console.log(countryArray[0].name, 'country name');
            values.country = countryArray[0].name;
            service.contact(values).then(response => {
                console.log('RESPONSE-SESND EMAIL->', response);
                if (response.status === 100) {
                    setButton(true);
                    history.push(
                        { pathname: '/contactus' }
                    )
                }
            })
        }
    }
    return (
        <div className="menuCloseJS closeMenuWrapper">
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
                                    <option>{errors.country}</option>
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
                                    <option>{errors.state}</option>
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
                                        <option>{errors.platform}</option>
                                        <option>Roku</option>
                                        <option>Android</option>
                                        <option>Ios</option>
                                        <option>Tv4</option>
                                    </select>
                                </div>
                            </div>
                        }
                        {
                            disableblock === true &&
                            <div className="csFormInputWrapper" style={{ display: { disableblock } }}>
                                <div className={classValues.topic} style={{ backgroundColor: '#fff' }}>
                                    <select name="topic" onChange={onChangeFunction} >
                                        <option>{errors.topic}</option>
                                        <option>Account</option>
                                        <option>Audio</option>
                                        <option>Content</option>
                                        <option>Content Request</option>
                                        <option>Registration</option>
                                        <option>Sign-In</option>
                                        <option>Subtitle - Caption</option>
                                        <option>Video Playlist</option>
                                        <option>Other</option>
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
