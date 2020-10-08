import React, { useState, useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from 'react-confirm-alert';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { service } from '../../network/service';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect, Link } from 'react-router-dom';

const Register = (state) => {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        return (<Redirect to='/home' />);
    }

    const dispatch = useDispatch();
    const history = useHistory();
    const [firstname, setFirstName] = useState('');
    const [facebookData, setFacebookData] = useState(null);
    const [facebookId, setFacebookId] = useState('');
    const [facebookEmail, setFacebookEmail] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [userRegisterId, setUserRegisterId] = useState('');
    const [verification_code, setVerification] = useState('');
    const [isRegister, setIsRegister] = useState(true);
    const [isFbAcive, setIsFbAcive] = useState(true);
    const [isSuccessMsg, setIsSuccessMsg] = useState(false);
    const [msgSuccess, setMsgSucess] = useState("");
    const [isErrorMsg, setIsErrorMsg] = useState(false);
    const [msgError, setMsgError] = useState("");
    const [isErrorVerifyMsg, setIsErrorVerifyMsg] = useState(false);
    const [msgErrorVerify, setMsgErrorVerify] = useState("");
    const [isEmailExistMsg, setIsEmailExistMsg] = useState(false);
    const [age, setAge] = useState('');
    const [isAgeList, setIsAgeList] = useState(false);
    const [values, setValues] = useState({
        firstname: '',
        email: '',
        password: '',
        password2: '',
        age: ''
    });
    const [errors, setErrors] = useState({
        firstname: 'First Name',
        email: 'Email',
        password: 'Password',
        password2: 'Confirm Password',
        age: 'Age Group'
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
    const [isEye1, setIsEye1] = useState(false);
    const [isEye2, setIsEye2] = useState(false);
    const togglePasswordVisiblity1 = () => {
        setPasswordShown1(passwordShown1 ? false : true);
        setEye1(passwordShown1 ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />);
    };
    const togglePasswordVisiblity2 = () => {
        setPasswordShown2(passwordShown2 ? false : true);
        setEye2(passwordShown2 ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />);
    };
    let FBData = null;
    useEffect(() => {
        if (state.location.state) {
            let FBData = state.location.state.facebookData
            setIsFbAcive(false);
            setFacebookId(FBData.id);
            setFacebookData(state.location.state.facebookData);
            if (FBData.email) {
                setValues({
                    ...values,
                    ['firstname']: FBData.first_name,
                    ['email']: FBData.email
                })
            } else {
                setValues({
                    ...values,
                    ['firstname']: FBData.first_name,
                })
            }
        }
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
    const validateName = firstname => {
        if (/^[A-Za-z]+$/.test(firstname.trim())) {
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
        if (name == 'password') {
            if (value.length > 0) {
                setIsEye1(true)
            } else {
                setIsEye1(false)
            }
        } else if (name == 'password2') {
            if (value.length > 0) {
                setIsEye2(true)
            } else {
                setIsEye2(false)
            }
        }
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
        if (values.age) {
            errors.age = 'Age Group'
            setAge('');
        } else {
            formIsValid = false
            errors.age = "Select age group"
            setAge(' Input--errored');
        }

        if (values.firstname.trim()) {
            var errorMsg = validateName(values.firstname);
            if (errorMsg === true) {
                errors.firstname = 'First Name'
                setFirstName('');
            } else {
                formIsValid = false
                setFirstName(' Input--errored');
                errors.firstname = 'Alphabets only'
            }
        } else {
            formIsValid = false
            errors.firstname = "Required First Name Field"
            setFirstName(' Input--errored');
        }
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
                    setPassword2(' Input--errored');
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
            service.register(values, facebookId).then(response => {
                if (response.status == 1) {
                    setUserRegisterId(response.data.user_id);
                    setIsRegister(false);
                    setMsgSucess('OTP send to your Email Id (NB:  If you do not find the email in your inbox, please check your spam filter or bulk email folder)');
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
                console.log(response, 'res');
                if (response.status == 1) {
                    service.setCookie("isLoggedIn", "true", 30);
                    setMsgSucess('You are successfully registered');
                    setIsSuccessMsg(true);
                    setTimeout(function () {
                        setIsSuccessMsg(false);
                    }, 5000);
                    dispatch({ type: "LOGIN", payload: true });
                    history.push('/home');
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
    const responseFacebook = (response) => {
        FBData = response;
        setFacebookId(FBData.id);
        setFacebookEmail(FBData.email);
        setFacebookData(response);
        service.facebokLogin(response.id, response.email).then(response => {
            if (response.status == 100) {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('userName', response.data[0].first_name);
                service.setCookie("userId", response.data[0].user_id, 30);
                service.userSubscription(response.data[0].user_id).then(response => {
                    if (response.forcibleLogout == false) {
                        service.setCookie("isLoggedIn", "true", 30);
                        var user_sub = response.data;
                        if (user_sub.length > 0) {
                            service.setCookie("isLoggedIn", "true", 30);
                            setMsgSucess('You are successfully registered');
                            setIsSuccessMsg(true);
                            setTimeout(function () {
                                setIsSuccessMsg(false);
                            }, 5000);
                            history.push('/home');
                            // history.push({
                            //     pathname: '/home/movies', search: encodeURI(`show_id=${showId}`)
                            // });

                        } else {
                            service.setCookie("isLoggedIn", "true", 30);
                            setMsgSucess('You are successfully registered');
                            setIsSuccessMsg(true);
                            setTimeout(function () {
                                setIsSuccessMsg(false);
                            }, 5000);
                            history.push('/home');
                            // history.push({
                            //     pathname: '/home/movies', search: encodeURI(`show_id=${showId}`)
                            // });

                        }

                        return false;
                    }
                });
            } else if (response.status == 102) {
                setMsgError('There was an error during registration');
                setIsErrorMsg(true);
                setTimeout(function () {
                    setIsErrorMsg(false);
                }, 5000);
            } else if (response.status == 103) {
                setIsFbAcive(false);
                if (FBData.email) {
                    setValues({
                        ...values,
                        ['firstname']: FBData.first_name,
                        ['email']: FBData.email
                    })
                } else {
                    setValues({
                        ...values,
                        ['firstname']: FBData.first_name,
                    })
                }
            } else if (response.status == 101) {
                setUserRegisterId(response.data[0].user_id);
                setIsRegister(false);
                setMsgSucess('OTP send to your Email Id (NB:  If you do not find the email in your inbox, please check your spam filter or bulk email folder)');
                setIsSuccessMsg(true);
                setTimeout(function () {
                    setIsSuccessMsg(false);
                }, 5000);
            } else if (response.status == 104) {
                confirmAlert({
                    closeOnEscape: false,
                    closeOnClickOutside: false,
                    message: 'Do you want to link your Facebook account?',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => onFBLink()
                        },
                        {
                            label: 'No',
                            onClick: () => onFBNoLink()
                        }
                    ]
                })
            };
        })
    }

    const onFBLink = () => {
        service.facebokLink(FBData.id, FBData.email).then(response => {
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('userName', response.data[0].first_name);
            service.setCookie("userId", response.data[0].user_id, 30);
            service.userSubscription(response.data[0].user_id).then(response => {
                if (response.forcibleLogout == false) {
                    service.setCookie("isLoggedIn", "true", 30);
                    var user_sub = response.data;
                    if (user_sub.length > 0) {
                        service.setCookie("isLoggedIn", "true", 30);
                        setMsgSucess('You are successfully registered');
                        setIsSuccessMsg(true);
                        setTimeout(function () {
                            setIsSuccessMsg(false);
                        }, 5000);
                        history.push('/home');
                        // history.push({
                        //     pathname: '/home/movies', search: encodeURI(`show_id=${showId}`)
                        // });

                    } else {
                        service.setCookie("isLoggedIn", "true", 30);
                        setMsgSucess('You are successfully registered');
                        setIsSuccessMsg(true);
                        setTimeout(function () {
                            setIsSuccessMsg(false);
                        }, 5000);
                        history.push('/home');
                        // history.push({
                        //     pathname: '/home/movies', search: encodeURI(`show_id=${showId}`)
                        // });

                    }

                    return false;
                }
            });
        });
    }
    const onFBNoLink = () => {
        setIsEmailExistMsg(true);
        setTimeout(function () {
            setIsEmailExistMsg(false);
        }, 5000);
    }
    const onSignIn = () => {
        history.push('/signin');
    }
    //  const onAgeHandler =() => {
    //      setIsAgeList(true);
    //  }
     const myAge =(e) => {
            setValues({
                ...values,
                ['age']: e.value,
            })
     }
     const options = [
        { value: '4-13', label: '4-13 age', className: 'Select__listItem'  },
        { value: '13-18', label: '13-18 age', className: 'Select__listItem' },
        { value: '18+', label: '18+ age', className: 'Select__listItem' },
       
      ];
      
    return (
        <div className="pageWrapper searchPageMain">
            <div className="topContainer">
                <div className= {`menuCloseJS closeMenuWrapper ${isRegister ? "regnPage" : "regnPage1"}`}>
                    <div className="container">
                        <div className="row regnWrapper">
                            <div className="col col-9 col-lg-6 col-xl-6 col-xxl-5">
                                <h3 className="H3">Let's get you set up!</h3>
                                <div>
                                    {isFbAcive && (
                                        <div>
                                            <div rel="noopener" target="_self" >
                                                <button className="button buttonLarge buttonBlock registerFacebook">
                                                    <div className="buttonBg"></div>
                                                    <FacebookLogin
                                                        appId="642916756425595"
                                                        // autoLoad={true}
                                                        fields="name,email,picture,first_name"
                                                        callback={responseFacebook}
                                                        cssClass="button buttonLarge buttonBlock registerFacebook"

                                                        textButton="Register via Facebook"
                                                    />
                                                </button>

                                            </div>
                                            <div className="orContainer orMargin">
                                                <div className="orDivider"></div>
                                                <div className="orCircle">
                                                    <div className="orText" >OR</div>
                                                </div>
                                                <div className="orDivider"></div>
                                            </div>
                                        </div>
                                    )}

                                    {
                                        isRegister ? (
                                            <div id="registerId">
                                                <h5 className="H5 regnFormHeading">Register via Email</h5>
                                                <form className="regnformContainer" noValidate onSubmit={onSubmitHandler}>
                                                    {
                                                        isErrorMsg && (
                                                            <p className="_3nmo_">{msgError}</p>
                                                        )
                                                    }
                                                    {
                                                        isEmailExistMsg && (
                                                            <p className="_3nmo_" >{facebookEmail} already exist, Please&nbsp;&nbsp;<button onClick={onSignIn} className="linkButton button buttonSmall"><div className="buttonBg"></div><div className="buttonContent">Sign In</div></button></p>

                                                        )
                                                    }
                                                    <div className={"input" + firstname} style={{ marginTop: '18px' }}>
                                                        <input className="inputText" name="firstname" type="text" maxLength="60" value={values.firstname} onChange={onChangeHandler} />
                                                        <span className="inputLabel">{errors.firstname}</span></div>
                                                    <div className={"input" + email} style={{ marginTop: '22px' }}>
                                                        <input className="inputText" name="email" type="email" value={values.email} onChange={onChangeHandler} />
                                                        <span className="inputLabel">{errors.email}</span>
                                                        {
                                                            !values.email &&
                                                            <span className="inputHint">We never share this</span>
                                                        }

                                                    </div>
                                                    <div className={"input" + password} style={{ marginTop: '20px' }}>
                                                        <input className="inputText" name="password" type={passwordShown1 ? "text" : "password"} value={values.password} onChange={onChangeHandler} />
                                                        {
                                                            isEye1 && (
                                                                <i className="eyeIcon" onClick={togglePasswordVisiblity1}>{eye1}</i>
                                                            )
                                                        }

                                                        <span className="inputLabel">{errors.password}</span>
                                                        {
                                                            !values.password &&
                                                            <span className="inputHint">Pick something you can remember</span>
                                                        }

                                                    </div>
                                                    {/* <span class="eyeicon" onClick={() => { onEyeHandler()}}><img src={eyeIcon} width='20'></img></span> */}
                                                    <div className={"input" + password2} style={{ marginTop: '20px' }}>
                                                        <input className="inputText" name="password2" type={passwordShown2 ? "text" : "password"} onPaste={(e) => { e.preventDefault() }} value={values.password2} onChange={onChangeHandler} />
                                                        {
                                                            isEye2 && (
                                                                <i className="eyeIcon" onClick={togglePasswordVisiblity2}>{eye2}</i>
                                                            )
                                                        }

                                                        <span className="inputLabel">{errors.password2}</span>
                                                        {
                                                            !values.password2 &&
                                                            <span className="inputHint">This has to match the above password</span>
                                                        }

                                                    </div>
                                                    <div  role="option" className={"input"+ age} aria-selected="" value={values.age}style={{ width: '32%',marginTop: '20px',padding: '0px' }}>
                                                      
                                                       
                                                        {/* {
                                                            isAgeList && (
                                                                <div>
                                                                <ul className="Select__list">
                                                                    <li className="Select__listItem"   onClick={(e) => myAge({"name":"child", "value":"4-13"})}>4-13 age</li>
                                                                    <li className="Select__listItem"   onClick={(e) => myAge({"name":"teen", "value":"13-18"})}>13-18 age</li>
                                                                    <li className="Select__listItem"   onClick={(e) => myAge({"name":"adult", "value":"18+"})}>18+ age</li>
                                                                </ul>
                                                                </div>
                                                            )
                                                        } */}
                                                        <Dropdown  options={options}  onChange={myAge} placeholderClassName="dropLabel"  placeholder=""/>
                                                        <span className="inputLabel">{errors.age}</span>
                                                    </div>

                                                    <div className="regnSubmitWrapper" style={{marginTop: "-48px", padding: "0px"}}>
                                                        <button className="button buttonLarge regnSubmit" type="submit">
                                                            <div className="buttonBg"></div>
                                                            <div className="buttonContent">Register</div>
                                                        </button>
                                                    </div>
                                                    <div className="regnAgreeContent">
                                                        <p>By registering, you agree to HappiTv <div className="linkButton" href="#">Term of Use</div> and
                                                <div className="linkButton" >Privacy Policy</div>
                                                        </p>
                                                        <p>Already have an account?
                                                        <Link to={{ pathname: "/signin" }}><span className="linkButton">Sign In</span></Link></p>
                                                    </div>
                                                </form>
                                            </div>
                                        ) : (
                                                <div id="verifyId">
                                                    <h5 className="H5 regnFormHeading" style={{marginTop:'0px', marginBottom:'25px'}}>Email Verification</h5>
                                                    <form className="regnformContainer" noValidate onSubmit={onVerifyHandler}>
                                                        {
                                                            isSuccessMsg && (
                                                                <p className="_3nmo_success">{msgSuccess}</p>
                                                            )
                                                        }
                                                        {
                                                            isErrorVerifyMsg && (
                                                                <p className="_3nmo_">{msgErrorVerify}</p>
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
                                                        <p>By registering, you agree to HappiTv <a className="linkButton" href="#">Term of Use</a> and
                                                        <a className="linkButton" href="#">Privacy Policy</a>
                                                        </p>
                                                        <p>Already have an account?
                                                        <Link to={{ pathname: "/signin" }}><span className="linkButton">Sign In</span></Link></p>
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
