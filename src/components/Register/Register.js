import React, {
  useState,
  useEffect,
  useReducer,

  useRef,
} from "react";

import Card from "../UI/Card/Card";

import Button from "../UI/Button/Button";

import classes from "./Register.module.css";
import Input from "../UI/Input/Input";
import axios from 'axios';
import BASE_URL from "../const";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const nameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 2 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 2 };
  }
  return { value: "", isValid: false };
};
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};



const Register = (props) => {
  const navigate = useNavigate()
  const [formIsValid, setFormIsValid] = useState(false);
  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  
  
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { isValid: nameIsValid } = emailState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  

  useEffect(() => {
    const identifier = setTimeout(() => {      
      setFormIsValid(nameIsValid && emailIsValid && passwordIsValid);
    }, 500);

    return () => {      
      clearTimeout(identifier);
    };
  }, [nameIsValid,emailIsValid, passwordIsValid]);


  const nameChangeHandler = (event) => {
    dispatchName({ type: "USER_INPUT", val: event.target.value });
  };

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });    
  };  

  const validateNameHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  

  const submitHandler = (event) => {
    
    event.preventDefault();
    if (formIsValid) {
      axios
      .post(BASE_URL + "api/auth/register", {
        name: nameState.value,
        email: emailState.value,
        password: passwordState.value,
      })
      .then(function (response) {
        if(response.data.success){          
        navigate('/login');
        }else{
          toast(response.data.errorMessage);
        }
      })
      .catch(function (error) {        
      });
    } else if (!emailIsValid) {
      emailInputRef.current.focus()
    } else {
      passwordInputRef.current.focus()
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={nameInputRef}          
          type="text"
          id="name"
          label="Name"
          value={nameState.value}
          isValid={nameIsValid}
          onChange={nameChangeHandler}
          onBlur={validateNameHandler}
        ></Input>
          <Input
          ref={emailInputRef}          
          type="email"
          id="email"
          label="E-Mail"
          value={emailState.value}
          isValid={emailIsValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          ref={passwordInputRef}          
          type="password"
          id="password"
          label="Password"
          value={passwordState.value}
          isValid={passwordIsValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>

        <div >
          <Button type="submit" >
            Register
          </Button>
          <ToastContainer />
        </div>
      </form>
    </Card>
  );
};

export default Register;
