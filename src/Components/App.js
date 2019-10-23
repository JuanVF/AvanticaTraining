import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../Pages/Home';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import Topics from '../Pages/Topics';
import AddTopics from '../Pages/AddTopics';
import EditTopic from '../Pages/EditTopic';
import MyResources from '../Pages/MyResources';
import AddResource from '../Pages/AddResource';
import Layout from './Layout';

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
                    <Route exact path="/training/topics/add" component={AddTopics} />
                    <Route exact path="/training/topics/edit/:id" component={EditTopic} />
                    <Route exact path="/training/resources" component={MyResources} />
                    <Route exact path="/training/resources/add" component={AddResource} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;