import React,{useContext,useEffect,useState,useReducer} from 'react';
import AuthContext from '../../storage/auth-context';
import { InnerContainer,LoginBg,Input,Icon,ButtonContainer } from './styles';


const emailReducer = (state,action) => {
    if(action.type ==='USER_INPUT'){
      return {value:action.val, isValid: action.val.includes('@')};
    }
    if(action.type ==='INPUT_BLUR'){
      return {value:state.value, isValid: state.value.includes('@')};
    }
    return {value:'', isValid:false };
  };

const passwordReducer = (state,action) => {
    if(action.type ==='USER_INPUT'){
      return {value:action.val, isValid: action.val.trim().length>5};
    }
    if(action.type ==='INPUT_BLUR'){
      return {value:state.value, isValid: state.value.trim().length>5};
    }
    return {value:'', isValid:false };
  };
  
  
  export default function Login(){
    const {onLogin}=useContext(AuthContext)
    const [formIsValid, setFormIsValid] = useState(false);
    
    const [emailState,dispatchEmail] = useReducer(emailReducer,{
      value:'',
      isValid: null,
    });
    const [passwordState,dispatchPassword] = useReducer(passwordReducer,{
        value:'',
        isValid: null,
      });

    const {isValid: emailIsValid } = emailState;
    const {isValid: passwordIsValid } = passwordState;
  
    useEffect(() => {
        const identifier = setTimeout(() => {
          setFormIsValid(
           emailIsValid && passwordIsValid
          );
        }, 500);
        return () => {
          clearTimeout(identifier);
        };
      }, [emailIsValid, passwordIsValid]); 
  
      const emailChangeHandler = (event) => {
        dispatchEmail({type:'USER_INPUT', val:event.target.value});
      };
    
      const passwordChangeHandler = (event) => {
        dispatchPassword({type:'USER_INPUT', val:event.target.value});
      };

      const validateEmailHandler = () => {
        dispatchEmail({type:'INPUT_BLUR'});
      };
    
      const validatePasswordHandler = () => {
        dispatchPassword({type:'INPUT_BLUR'});
      };

      const submitHandler = (event) => {
        event.preventDefault();
        onLogin(emailState.value, passwordState.value);
        console.log(emailState.value, passwordState.value);
      };
      console.log(formIsValid)
    return(
      <LoginBg>
        <InnerContainer>
        
        <Input placeholder='Email' value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} validation={emailState.isValid}/>
        <Input placeholder='Senha' value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} validation={passwordState.isValid}/>
        <ButtonContainer  type='submit' onClick={submitHandler} disabled={!formIsValid}>
        ENTRAR
        <Icon/>
        </ButtonContainer>
        </InnerContainer>
      </LoginBg>
    )
  }