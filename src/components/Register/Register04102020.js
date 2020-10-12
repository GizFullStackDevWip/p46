import React, { useState, useEffect } from 'react';
import { service } from '../../network/service';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux';
const Register = () => {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        return (<Redirect to='/home' />);
    }

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [userRegisterId, setUserRegisterId] = useState('');
    const [verification_code, setVerification] = useState('');
    const [isRegister, setIsRegister] = useState(true);
    const [isSuccessMsg, setIsSuccessMsg] = useState(false);
    const [msgSuccess, setMsgSucess] = useState("");
    const [isErrorMsg, setIsErrorMsg] = useState(false);
    const [msgError, setMsgError] = useState("");
    const [isErrorVerifyMsg, setIsErrorVerifyMsg] = useState(false);
    const [msgErrorVerify, setMsgErrorVerify] = useState("");
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: '',
    });
    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: 'Email',
        password: 'Password',
        password2: 'Confirm Password',
    });
    const [valuesVerify, setValuesVerify] = useState({
        verification_code: ''
    });
    const [errorsVerify, setErrorsVerify] = useState({
        verification_code: 'Verification Code'
    });
    const [passwordShown1, setPasswordShown1] = useState(false);
    const [passwordShown2, setPasswordShown2] = useState(false);
    const [eye1, setEye1] = useState(<FontAwesomeIcon icon={faEye} />);
    const [eye2, setEye2] = useState(<FontAwesomeIcon icon={faEye} />);
    const togglePasswordVisiblity1 = () => {
    setPasswordShown1(passwordShown1 ? false : true);
    setEye1(passwordShown1?<FontAwesomeIcon icon={faEye} />:<FontAwesomeIcon icon={faEyeSlash} />);
    };
    const togglePasswordVisiblity2 = () => {
        setPasswordShown2(passwordShown2 ? false : true);
        setEye2(passwordShown2?<FontAwesomeIcon icon={faEye} />:<FontAwesomeIcon icon={faEyeSlash} />);
        };
    useEffect(() => {

    }, []);
    const validateEmail = email => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return (true);
        }
        return (false);
    }
    const validateVerify = verification_code => {
        if (/^\d*$/.test(verification_code.trim())) {
            return (true);
        }
        return (false);
    }


    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value
        })
    }
    const onChangeHandlerVerify = (e) => {
        const { name, value } = e.target;

        setValuesVerify({
            ...valuesVerify,
            [name]: value
        })
    }
    const validationVerify = () => {
        let errorsVerify = {}
        let formIsValid = true;
        if (valuesVerify.verification_code.trim()) {
            var errorMsg = validateVerify(valuesVerify.verification_code);
            if (errorMsg === true) {
                errorsVerify.verification_code = 'Verification Code'
                setVerification('');
            } else {
                formIsValid = false
                setVerification(' Input--errored');
                errorsVerify.verification_code = 'OTP contain numeric only'
            }
        } else {
            formIsValid = false
            errorsVerify.verification_code = "Required Verification Field"
            setVerification(' Input--errored');
        }
        setErrorsVerify(errorsVerify);
        return formIsValid;
    }
    const validation = () => {
        let errors = {}
        let formIsValid = true;

        if (values.email.trim()) {
            var errorMsg = validateEmail(values.email);
            if (errorMsg === true) {
                errors.email = 'Email'
                setEmail('');
            } else {
                formIsValid = false
                setEmail(' Input--errored');
                errors.email = 'Invalid email Address'
            }
        } else {
            formIsValid = false
            errors.email = "Required Email Field"
            setEmail(' Input--errored');
        }


        if (values.password.trim()) {
            if (values.password.length >= 6 && values.password.length <= 30) {
                console.log(values.password.length);
                if (values.password2.trim()) {
                    if (values.password.trim() == values.password2.trim()) {
                        errors.password = "Password"
                        setPassword('');
                        errors.password2 = "Confirm Password"
                        setPassword2('');
                    } else {
                        formIsValid = false
                        setPassword(' Input--errored');
                        errors.password = "Password do not match"
                    }
                } else {
                    errors.password = "Password"
                    setPassword('');
                }
            } else {
                formIsValid = false
                setPassword(' Input--errored');
                errors.password = "Length must be between 6 and 30"
            }
        } else {
            formIsValid = false
            setPassword(' Input--errored');
            errors.password = "Required Password Field"
        }


        if (values.password2.trim()) {
            if (values.password.trim()) {
                if (values.password.trim() == values.password2.trim()) {
                    if (values.password2.length >= 6 && values.password2.length <= 30) {
                        errors.password = "Password"
                        setPassword('');
                        errors.password2 = "Confirm Password"
                        setPassword2('');
                    } else {
                        formIsValid = false
                        setPassword2(' Input--errored');
                        errors.password2 = "Length must be between 6 and 30"
                    }
                } else {
                    formIsValid = false
                    setPassword(' Input--errored');
                    errors.password2 = "Password do not match"
                }
            } else {
                errors.password2 = "Confirm Password"
                setPassword2('');
            }
        } else {
            formIsValid = false
            setPassword2(' Input--errored');
            errors.password2 = "Required Confirm Password Field"
        }

        setErrors(errors);
        return formIsValid;
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (validation()) {
            console.log(values);
            service.register(values).then(response => {
                console.log('resposne of register user',response);
                if (response.status == 1) {
                    setUserRegisterId(response.data.user_id);
                    setIsRegister(false);
                    setMsgSucess('OTP sent to your Email Id');
                    setIsSuccessMsg(true);
                    setTimeout(function () {
                        setIsSuccessMsg(false);
                    }, 5000);
                } else if (response.status == 0) {
                    setMsgError('There was an error during registration');
                    setIsErrorMsg(true);
                    setTimeout(function () {
                        setIsErrorMsg(false);
                    }, 5000);

                } else if (response.status == 2) {
                    setMsgError('Already registered user');
                    setIsErrorMsg(true);
                    setTimeout(function () {
                        setIsErrorMsg(false);
                    }, 5000);

                }

            })
        }
    }
    const onVerifyHandler = (e) => {
        e.preventDefault();
        if (validationVerify()) {
            console.log(userRegisterId);
            service.verifyEmail(valuesVerify, userRegisterId).then(response => {
                console.log(response, 'response of the varify api');
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('userName', response.data[0].first_name);
                if (response.status == 1) {
                    setMsgSucess('You are successfully registered');
                    setIsSuccessMsg(true);
                    setTimeout(function () {
                        setIsSuccessMsg(false);
                    }, 5000);
                    dispatch({ type: "LOGIN", payload: true });
                    window.location.href = "/";
                } else if (response.status == 0) {
                    setMsgErrorVerify('Invalid OTP');
                    setIsErrorVerifyMsg(true);
                    setTimeout(function () {
                        setIsErrorVerifyMsg(false);
                    }, 5000);
                }

            })
        }
    }

    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <div className="regnPage menuCloseJS closeMenuWrapper">
                    <div className="container">
                        <div className="row regnWrapper">
                            <div className="col col-9 col-lg-6 col-xl-6 col-xxl-5">
                                <h3 className="H3">Let's get you set up!</h3>
                                <div>
                                    <div rel="noopener" target="_self" >
                                        <button className="button buttonLarge buttonBlock registerFacebook">
                                            <div className="buttonBg"></div>
                                            <div className="buttonContent">
                                                <i className="buttonIcon">
                                                    <svg className="svgIcon facebookIcon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" style={{ fill: 'currentcolor' }}>
                                                        <path fill="currentColor" fillRule="evenodd" d="M2 0C.938 0 0 1.063 0 1.97v16.093C0 19.03 1.063 20 2 20h9v-8H8V9h3V7c-.318-2.573 1.26-3.98 4-4 .668.02 1.617.103 2 0v3h-2c-.957-.16-1.2.436-1 1v2h3l-1 3h-2v8h3.938c1.03 0 2.062-.938 2.062-1.938V1.97C20 1.03 18.937 0 17.937 0H2z">
                                                        </path>
                                                    </svg>
                                                </i>Register via Facebook</div>
                                        </button>
                                    </div>
                                    <div className="orContainer orMargin">
                                        <div className="orDivider"></div>
                                        <div className="orCircle">
                                            <div className="orText">OR</div>
                                        </div>
                                        <div className="orDivider"></div>
                                    </div>
                                    {
                                        isRegister ? (
                                            <div id="registerId">
                                                <h5 className="H5 regnFormHeading">Register via Email</h5>
                                                <form className="regnformContainer" noValidate onSubmit={onSubmitHandler}>
                                                    {
                                                        isErrorMsg && (
                                                            <span className="_3nmo_">{msgError} </span>
                                                        )
                                                    }

                                                    <div className="input">
                                                        <input className="inputText" name="firstname" type="text" maxLength="60" value={values.firstname} onChange={onChangeHandler} />
                                                        <span className="inputLabel">First Name</span></div>
                                                    <div className="input">
                                                        <input className="inputText" name="lastname" type="text" maxLength="60" value={values.lastname} onChange={onChangeHandler} />
                                                        <span className="inputLabel">Last Name</span></div>
                                                    <div className={"input" + email}>
                                                        <input className="inputText" name="email" type="email" value={values.email} onChange={onChangeHandler} />
                                                        <span className="inputLabel">{errors.email}</span>
                                                        {
                                                            !values.email &&
                                                            <span className="inputHint">We never share this</span>
                                                        }

                                                    </div>
                                                    <div className={"input" + password}>
                                                        <input className="inputText" type={passwordShown1 ? "text" : "password"} name="password" value={values.password} onChange={onChangeHandler} />
                                                        <i className="eyeIcon" onClick={togglePasswordVisiblity1}>{eye1}</i>
                                                        <span className="inputLabel">{errors.password}</span>
                                                        {
                                                            !values.password &&
                                                            <span className="inputHint">Pick something you can remember</span>
                                                        }

                                                    </div>
                                                    {/* <span class="eyeicon" onClick={() => { onEyeHandler()}}><img src={eyeIcon} width='20'></img></span> */}
                                                    <div className={"input" + password2}>
                                                        <input className="inputText" type={passwordShown2 ? "text" : "password"}  name="password2"  value={values.password2} onChange={onChangeHandler} />
                                                        <i className="eyeIcon" onClick={togglePasswordVisiblity2}>{eye2}</i>
                                                        <span className="inputLabel">{errors.password2}</span>
                                                        {
                                                            !values.password2 &&
                                                            <span className="inputHint">This has to match the above password</span>
                                                        }

                                                    </div>
                                                    <div className="regnSubmitWrapper">
                                                        <button className="button buttonLarge regnSubmit" type="submit">
                                                            <div className="buttonBg"></div>
                                                            <div className="buttonContent">Register</div>
                                                        </button>
                                                    </div>
                                                    <div className="regnAgreeContent">
                                                        <span>By registering, you agree to  Happi's <div className="linkButton" >Term of Use</div> and
                                                <div className="linkButton" >Privacy Policy</div>
                                                        </span>
                                                        <span>Already have an account? <Link className="linkButton" to="/signin">Sign In</Link></span>
                                                    </div>
                                                </form>
                                            </div>
                                        ) : (
                                                <div id="verifyId">
                                                    <h5 className="H5 regnFormHeading">Email Verification</h5>
                                                    <form className="regnformContainer" noValidate onSubmit={onVerifyHandler}>
                                                        {
                                                            isSuccessMsg && (
                                                                <span className="_3nmo_success">{msgSuccess} </span>
                                                            )
                                                        }
                                                        {
                                                            isErrorVerifyMsg && (
                                                                <span className="_3nmo_">{msgErrorVerify} </span>
                                                            )
                                                        }
                                                        <div className={"input" + verification_code}>
                                                            <input className="inputText" name="verification_code" type="text" maxLength="60" value={valuesVerify.verification_code} onChange={onChangeHandlerVerify} />
                                                            <span className="inputLabel">{errorsVerify.verification_code}</span>
                                                        </div>
                                                        <div className="regnSubmitWrapper">
                                                            <button className="button buttonLarge regnSubmit" type="submit">
                                                                <div className="buttonBg"></div>
                                                                <div className="buttonContent">Verify</div>
                                                            </button>
                                                        </div>
                                                    </form>
                                                    <div className="regnAgreeContent">
                                                        <span>By registering, you agree to  Happi's <div className="linkButton" >Term of Use</div> and
                                                            <div className="linkButton" >Privacy Policy</div>
                                                        </span>
                                                        <span>Already have an account? <Link className="linkButton" to="/signin">Sign In</Link> </span>
                                                    </div>
                                                </div>
                                            )
                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;