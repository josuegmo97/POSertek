import React from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import './scss/style.scss';
import {initAxiosIntercerptors} from "./utils/Auth"

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
initAxiosIntercerptors();
const App=()=> {

    return (
      <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => !localStorage.getItem('token')?<Login {...props}/>:<Redirect to="/dashboard" />} />
              <Route exact path="/register" name="Register Page" render={props =>!localStorage.getItem('token')?<Register {...props}/>:<Redirect to="/dashboard" />} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props =><Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  
}

export default App;
