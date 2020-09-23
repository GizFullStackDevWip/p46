import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import FacebookLogin from 'react-facebook-login';
import { service } from '../../network/service';
import { Link, useHistory, useLocation } from 'react-router-dom';
const SignIn = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verification_code, setVerification] = useState('');
    const [forgot_email, setForgotEmail] = useState('');
    const [userLoggedId, setUserLoggedId] = useState('');
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: 'Email',
        password: 'Password',
    });
    const [valuesVerify, setValuesVerify] = useState({
        verification_code: ''
    });
    const [errorsVerify, setErrorsVerify] = useState({
        verification_code: 'Verification Code'
    });
    const [valuesForgot, setValuesForgot] = useState({
        forgot_email: ''
    });
    const [errorsForgot, setErrorsForgot] = useState({
        forgot_email: 'Email'
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
    const onChangeHandlerVerify = (e) => {
        const { name, value } = e.target;

        setValuesVerify({
            ...valuesVerify,
            [name]: value
        })
    }
    const onChangeHandlerForgot = (e) => {
        const { name, value } = e.target;

        setValuesForgot({
            ...valuesForgot,
            [name]: value
        })
    }
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    const validationForgot = () => {
        let errorsForgot = {}
        let formIsValid = true;
        if (valuesForgot.forgot_email.trim()) {
            var errorMsg = validateEmail(valuesForgot.forgot_email);
            if (errorMsg === true) {
                errorsForgot.forgot_email = 'Email'
                setForgotEmail('');
            } else {
                formIsValid = false
                setForgotEmail(' Input--errored');
                errorsForgot.forgot_email = 'Invalid email Address'
            }
        } else {
            formIsValid = false
            errorsForgot.forgot_email = "Required Email Field"
            setForgotEmail(' Input--errored');
        }
        setErrorsForgot(errorsForgot);
        return formIsValid;
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
                if (values.password.trim()) {
                    errors.password = "Password"
                    setPassword('');

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
        setErrors(errors);
        return formIsValid;
    }
    const responseFacebook = (response) => {
        console.log(response, 'e');
    }
    fetch('https://geolocation-db.com/json/')
        .then(res => res.json())
        .then(json => localStorage.setItem('ipaddress', json.IPv4));


    const onLoginHandler = (e) => {
        e.preventDefault();
        if (validation()) {
            service.login(values).then(response => {
                if (response.status == 100) {
                    console.log(response,'login response');
                    localStorage.setItem('isLoggedIn',true);
                    localStorage.setItem('userName',response.data[0].first_name);
                    setUserLoggedId(response.data[0].user_id);
                    service.userSubscription(response.data[0].user_id).then(response => {
                        if (response.forcibleLogout == false) {
                            //service.setCookie("userId", userLoggedId, 30);
                            var user_sub = response.data;
                            if (user_sub.length > 0) {
                                var $div2 = $("#msgLogin");
                                $div2.text("You are successfully logged in.");
                                $div2.show();
                                setTimeout(function () {
                                    $div2.hide();
                                }, 5000);
                                history.goBack()
                            } else {
                                var $div2 = $("#msgLogin");
                                $div2.text("You are successfully logged in.");
                                $div2.show();
                                setTimeout(function () {
                                    $div2.hide();
                                }, 5000);
                                history.goBack()
                            }
                            return false;
                        } else {
                            var $div2 = $("#msgLogin1");
                            $('#logoutBtn').show();
                            $div2.css('color', '#f44336');
                            $div2.show();
                            setTimeout(function () {
                                $div2.hide();
                            }, 5000);
                        }
                    });
                } else if (response.status == 102) {
                    var $div2 = $("#msgLogin");
                    $div2.css('color', '#f44336');
                    $div2.text("Please enter a valid user email and password");
                    $div2.show();
                    setTimeout(function () {
                        $div2.hide();
                    }, 5000);
                } else if (response.status == 103) {
                    var $div2 = $("#msgLogin");
                    $div2.css('color', '#f44336');
                    $div2.text("Login limit exceed");
                    $div2.show();
                    setTimeout(function () {
                        $div2.hide();
                    }, 5000);
                } else if (response.status == 101) {
                    $("#loginId").hide();
                    $("#verifyId").show();
                    var $div2 = $("#msgVerifyId");
                    $div2.show();
                    setTimeout(function () {
                        $div2.hide();
                    }, 5000);
                };

            })
        }

    }
    const onVerifyHandler = (e) => {
        e.preventDefault();
        if (validationVerify()) {
            let UserRegistered = localStorage.getItem('UserRegistered');
            service.verifyEmail(values, UserRegistered).then(response => {
                if (response.status == 1) {
                    var $div2 = $("#msgVerifyId");
                    $div2.text("Your registration is complted");
                    $div2.show();
                    setTimeout(function () {
                        $div2.hide();
                    }, 5000);
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
    const onForgotHandler = (e) => {
        e.preventDefault();
        if (validationForgot()) {
            service.forgotEmail(valuesForgot).then(response => {
                if (response.status == 100) {
                    var $div2 = $("#msgLogin");
                    $div2.text("Reset Password Link send to your Email Id");
                    $div2.show();
                    setTimeout(function () {
                        $div2.hide();
                    }, 5000);
                    $("#forgotId").hide();
                    $("#loginId").show();
                } else if (response.status == 101) {
                    var $div2 = $("#msgForgotId");
                    $div2.css('color', '#f44336');
                    $div2.text("Email id does't exist.");
                    $div2.show();
                    setTimeout(function () {
                        $div2.hide();
                    }, 5000);
                } else {
                    var $div2 = $("#msgForgotId");
                    $div2.css('color', '#f44336');
                    $div2.text("Failed please try again.");
                    $div2.show();
                    setTimeout(function () {
                        $div2.hide();
                    }, 5000);

                }

            })
        }
    }
    const onClickForgot = () => {
        $("#loginId").hide();
        $("#forgotId").show();
    }
    const onLogout = () => {
        service.logoutAll(userLoggedId).then(response => {
            if (response.status == 100) {
                var $div2 = $("#msgLogin");
                $div2.text("You are successfully logout from all devices.");
                $div2.show();
                setTimeout(function () {
                    $div2.hide();
                }, 5000);

            } else {
                var $div2 = $("#msgLogin");
                $div2.css('color', '#f44336');
                $div2.text("Something went wrong. Please Try Again");
                $div2.show();
                setTimeout(function () {
                    $div2.hide();
                }, 5000);
            }
        });
    }




    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <div className="signPage menuCloseJS closeMenuWrapper">
                    <div className="container">
                        <div className="row signWrapper">
                            <div className="col col-9 col-lg-6 col-xl-6 col-xxl-4">
                                <h3 className="H3">Welcome Back!</h3>
                                <div>
                                    <div rel="noopener" target="_self">
                                        <button className="button buttonLarge buttonBlock registerFacebook">
                                            <div className="buttonBg"></div>
                                            <FacebookLogin
                                                appId="774951003076865"
                                                autoLoad={true}
                                                fields="name,email,picture"
                                                callback={responseFacebook}
                                                cssClass="button buttonLarge buttonBlock registerFacebook"
                                                icon="fa-facebook"
                                            />
                                        </button>
                                    </div>
                                    <div className="orContainer signOrMargin">
                                        <div className="orDivider"></div>
                                        <div className="orCircle">
                                            <div className="orText">OR</div>
                                        </div>
                                        <div className="orDivider"></div>
                                    </div>
                                    <div className="d-none" id="forgotId">
                                        <h5 className="H5 signFormHeading">Forgot Password</h5>
                                        <form className="signFormWrapper" noValidate onSubmit={onForgotHandler}>
                                            <p className="_3nmo_success" id="msgForgotId"></p>
                                            <div className={"input" + forgot_email}>
                                                <input className="inputText" name="forgot_email" type="email" value={valuesForgot.forgot_email} onChange={onChangeHandlerForgot} />
                                                <span className="inputLabel">{errorsForgot.forgot_email}</span>

                                            </div>
                                            <div className="row signSubmitWrapper">
                                                <div className="col col-sm-6 col-sm-offset-6">
                                                    <button className="button buttonLarge buttonBlock" type="submit">
                                                        <div className="buttonBg"></div>
                                                        <div className="buttonContent">Submit</div>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="signAgree">
                                                <p> <span>·
                                                </span> Don't have an account? <a className="linkButton" href="/register">Register</a>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="d-none" id="verifyId">
                                        <h5 className="H5 signFormHeading">Email Verification</h5>
                                        <form className="signFormWrapper" noValidate onSubmit={onVerifyHandler}>
                                            <p className="_3nmo_success" id="msgVerifyId"></p>
                                            <div className={"input" + verification_code}>
                                                <input className="inputText" name="verification_code" type="text" maxLength="60" value={values.verification_code} onChange={onChangeHandlerVerify} />
                                                <span className="inputLabel">{errorsVerify.verification_code}</span>
                                            </div>

                                            <div className="row signSubmitWrapper">
                                                <div className="col col-sm-6 col-sm-offset-6">
                                                    <button className="button buttonLarge buttonBlock" type="submit">
                                                        <div className="buttonBg"></div>
                                                        <div className="buttonContent">Verify</div>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="signAgree">
                                                <p><span className="linkButton" onClick={onClickForgot}>Forgot password?</span> <span>·
                                                </span> Don't have an account? <a className="linkButton" href="/register">Register</a>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                    <div id="loginId">
                                        <h5 className="H5 signFormHeading">Sign In via Email</h5>

                                        <form className="signFormWrapper" noValidate onSubmit={onLoginHandler}>
                                            <p className="_3nmo_success" id="msgLogin"></p>
                                            <p className="_3nmo_success d-none" id="msgLogin1">Login limit exceed&nbsp;&nbsp;
                                            <button id="logoutBtn" className="linkButton" onClick={onLogout}>Logout All</button></p>
                                            <div className={"input" + email}>
                                                <input className="inputText" name="email" type="email" value={values.email} onChange={onChangeHandler} />
                                                <span className="inputLabel">{errors.email}</span>
                                            </div>
                                            <div className={"input" + password}>
                                                <input className="inputText" name="password" type="password" value={values.password} onChange={onChangeHandler} />
                                                <span className="inputLabel">{errors.password}</span>
                                            </div>
                                            <div className="row signSubmitWrapper">
                                                <div className="col col-sm-6 col-sm-offset-6">
                                                    <button className="button buttonLarge buttonBlock" type="submit">
                                                        <div className="buttonBg"></div>
                                                        <div className="buttonContent">Sign In</div>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="signAgree">
                                                <p><span className="linkButton" onClick={onClickForgot}>Forgot password?</span> <span>·
                                                </span> Don't have an account? <a className="linkButton" href="/register">Register</a>
                                                </p>
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
export default SignIn;