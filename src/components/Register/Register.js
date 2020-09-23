import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { service } from '../../network/service';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [userRegisterId, setUserRegisterId] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const [verification_code, setVerification] = useState('');
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
                if (response.status == 1) {
                    setUserRegisterId(response.data.user_id);
                    $("#registerId").hide();
                    $("#verifyId").show();
                    var $div2 = $("#msgVerifyId");
                    $div2.text("OTP send to your Email Id");
                    $div2.show();
                    setTimeout(function () {
                        $div2.hide();
                    }, 5000);
                } else if (response.status == 0) {
                    var $div2 = $("#msgErrorId");
                    $div2.css('color', '#f44336');
                    $div2.text("There was an error during registration");
                    $div2.show();
                    setTimeout(function () {
                        $div2.hide();
                    }, 5000);
                } else if (response.status == 2) {
                    var $div2 = $("#msgErrorId");
                    $div2.css('color', '#f44336');
                    $div2.text("Already registered user");
                    $div2.show();
                    setTimeout(function () {
                        $div2.hide();
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
                console.log(response, 'res');
                if (response.status == 1) {
                    var $div2 = $("#msgVerifyId");
                    $div2.text("You are successfuly registered");
                    $div2.show();
                    setTimeout(function () {
                        $div2.hide();
                    }, 5000);
                    window.location.href = "/";
                } else if (response.status == 0) {
                    var $div2 = $("#msgVerifyId");
                    $div2.css('color', '#f44336');
                    $div2.text("Invalid OTP");
                    $div2.show();
                    setTimeout(function () {
                        $div2.hide();
                    }, 5000);
                }

            })
        }
    }

    return (
        <div class="pageWrapper searchPageMain">
            <div class="topContainer">
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
                                    <div className="d-none" id="verifyId">
                                        <h5 className="H5 regnFormHeading">Email Verification</h5>
                                        <form className="regnformContainer" noValidate onSubmit={onVerifyHandler}>
                                            <p className="_3nmo_success" id="msgVerifyId"></p>
                                            <div className={"input" + verification_code}>
                                                <input className="inputText" name="verification_code" type="text" maxLength="60" value={values.verification_code} onChange={onChangeHandlerVerify} />
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
                                            <p>By registering, you agree to Tubi's <a className="linkButton" href="#">Term of Use</a> and
                                            <a className="linkButton" href="#">Privacy Policy</a>
                                            </p>
                                            <p>Already have an account? <a className="linkButton" href="/signin">Sign In</a></p>
                                        </div>
                                    </div>
                                    <div id="registerId">
                                        <h5 className="H5 regnFormHeading">Register via Email</h5>
                                        <form className="regnformContainer" noValidate onSubmit={onSubmitHandler}>
                                            <p className="_3nmo_success" id="msgErrorId"></p>
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
                                                <input className="inputText" name="password" type={passwordType} value={values.password} onChange={onChangeHandler} />
                                                <span className="inputLabel">{errors.password}</span>
                                                {
                                                    !values.password &&
                                                    <span className="inputHint">Pick something you can remember</span>
                                                }

                                            </div>
                                            {/* <span class="eyeicon" onClick={() => { onEyeHandler()}}><img src={eyeIcon} width='20'></img></span> */}
                                            <div className={"input" + password2}>
                                                <input className="inputText" name="password2" type="password" value={values.password2} onChange={onChangeHandler} />
                                                <span className="inputLabel">{errors.password2}</span>
                                                {
                                                    !values.password2 &&
                                                    <span className="inputHint">This has to match the above password</span>
                                                }

                                            </div>
                                            {/* <div className="row dobContainer">
                                            <div className="col col--12 col-md-8 dobWrapper">
                                                <label className="birthdayLabel">Birthday</label>
                                                <div className="input">
                                                    <input className="inputText" name="birthMonth" type="text" maxLength="2" value="" />
                                                    <span className="inputLabel">Month</span>
                                                    <span className="inputHint">MM</span>
                                                </div>
                                                <div className="input">
                                                    <input className="inputText" name="birthDay" type="text" maxLength="2" value="" />
                                                    <span className="inputLabel">Day</span>
                                                    <span className="inputHint">DD</span>
                                                </div>
                                                <div className="input">
                                                    <input className="inputText" name="birthYear" type="text" maxLength="4" value="" />
                                                    <span className="inputLabel">Year</span>
                                                    <span className="inputHint">YYYY</span>
                                                </div>
                                            </div>
                                            <div className="col genderWrapper">
                                                <div id="gender" tabindex="0" role="option" className="input Select Input--fixed" aria-selected="">
                                                    <span className="inputText"></span><span className="inputLabel">Gender</span>
                                                    <span className="Select__down-icon"></span>
                                                </div>
                                            </div>
                                        </div> */}
                                            <div className="regnSubmitWrapper">
                                                <button className="button buttonLarge regnSubmit" type="submit">
                                                    <div className="buttonBg"></div>
                                                    <div className="buttonContent">Register</div>
                                                </button>
                                            </div>
                                            <div className="regnAgreeContent">
                                                <p>By registering, you agree to Tubi's <a className="linkButton" href="#">Term of Use</a> and
                                            <a className="linkButton" href="#">Privacy Policy</a>
                                                </p>
                                                <p>Already have an account? <a className="linkButton" href="/signin">Sign In</a></p>
                                            </div>
                                        </form>
                                    </div>
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