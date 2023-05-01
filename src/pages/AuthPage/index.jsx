import { useNavigate } from '@solidjs/router';
import { createSignal } from 'solid-js';

import { apiService } from '../../shared/api/swagger/swagger';

import { Button, FormAuth } from "../../components";
import mountainPng from '../../assets/images/mountain.png';

const AuthPage = () => {
  const navigate = useNavigate()

  let [mess, setMess] = createSignal("");
  let [err, setErr] = createSignal("");
  let [user, setUser] = createSignal({ login: "", password: "" });
  let [isDisabled, setDisabled] = createSignal(true);
  let [isLoading, setLoading] = createSignal(false);
  let [isSignUp, setSignUp] = createSignal(false);
  
  const updateUser = (newUser) => {
    console.log('newUser', newUser)
    console.log(user().login && user().password)
    if(user().login && user().password){
      setDisabled(false);
    }
    console.log(isDisabled())
    setUser({...user(), ...newUser});
    console.log('user', user())
  }

  const toSignUpForm = () => {
    setSignUp(true);

    setUser({
      login: "",
      password: "",
    });
  }

  const signUp = () => {
    setLoading(true);

    apiService.users
      .Create({ ...user() })
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data))
        setMess("вы успешно зарегистрировались!");
        setTimeout(() => {
          navigate('/');
          setLoading(false);
          setMess("");
        }, 1000);
      })
      .catch(() => {
        setErr("ошибка!!");
        
        setTimeout(() => {
          setUser({
            login: "",
            password: "",
          });

          setErr("");
        });
      }, 1000);
  }

  const logIn = () => {
    setLoading(true);
    apiService.login
      .Login(user())
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        setTimeout(() => {
          navigate('/');
          setLoading(false);
          setMess("");
        }, 1000);
      })
      .catch((err) => {
        setErr(err.message)

        setTimeout(() => {
          setUser({
            login: "",
            password: "",
          });

          setErr("");
        }, 2000);
      });
  }


  const submit = () => isSignUp() ? signUp() : logIn();



  return (
    <div className="auth-page">
      <div className="auth-page_form">
        <div className="auth-page_form__header">
          <img
            className="auth-page_form__header icon"
            src={mountainPng}
            alt="Icon ToDo App"
          />
          <div className="header">
            <h1 className="auth-page_form__header text">
              { isSignUp() ? "Регистрация" : "Вход" }
            </h1>
          </div>

          <p className={`auth-page_form__header ${  mess ? 'message' : '' } ${  err ? 'error' : '' }`}>
            { mess() ? mess() : err() }
          </p>
        </div>
        <FormAuth user={user} update={(value) => updateUser({...user, ...value})}/>
        <div className="auth-page_form__actions">
          <Button onClick={submit}>{
            isSignUp() ? "ЗАРЕГИСТРИРОВАТЬСЯ" : "ВОЙТИ"
          }</Button>
          {!isSignUp() &&
            <Button type={'text'} onClick={toSignUpForm}>
              Зарегистрироваться
            </Button>
          }
        </div>
    </div>
  </div>
  )
}

export { AuthPage }
