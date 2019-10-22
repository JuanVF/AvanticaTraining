import React from 'react';

import {BrowserRouter,Switch,Route} from 'react-router-dom';

import Home from '../Pages/Home';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import Topics from '../Pages/Topics';
import AddTopics from '../Pages/AddTopics';

import Layout from './Layout';

function App(){
    return(
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/training/top" component={Home}/>
                    <Route exact path="/training/signup" component={SignUp}/>
                    <Route exact path="/training/login" component={Login}/>
                    <Route exact path="/training/topics" component={Topics}/>
                    <Route exact path="/training/topics/add" component={AddTopics}/>
                </Switch>
            </Layout>
        </BrowserRouter>   
    );
}

export default App;