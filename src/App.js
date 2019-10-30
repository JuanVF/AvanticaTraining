import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Topics from './Pages/Topics';
import MyResources from './Pages/MyResources';
import Page404 from './Pages/Page404';
import Layout from './Components/Layout';

//This component allows the app to set routes and allow the navigation between them
function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/training/top" component={Home} />
                    <Route exact path="/training/signup" component={SignUp} />
                    <Route exact path="/training/login" component={Login} />
                    <Route exact path="/training/topics" component={Topics} />
                    <Route exact path="/training/resources" component={MyResources} />
                    <Route component={Page404}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;