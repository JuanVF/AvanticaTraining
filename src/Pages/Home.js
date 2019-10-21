import React from 'react';

import Navbar from '../Components/Navbar';
import TopTenTopics from '../Components/TopTenTopics';

import 'bootstrap/dist/css/bootstrap.css';

function Home(props){
    return(
        <div>
            <Navbar/>
            <TopTenTopics/>
        </div>
    )
}

export default Home;