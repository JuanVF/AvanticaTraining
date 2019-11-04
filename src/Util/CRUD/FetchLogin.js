const ls = require('local-storage');

const url = 'http://localhost:8080/login';

async function login(data){
    let params = {
        method : 'POST',
        body : JSON.stringify(data)
    }; 

    await fetch(url,params)
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{
        if(res.Authorization) ls.set('login_token',res.Authorization);
    })
    .catch((err)=>console.log(err));
}

module.exports = {
    login : login
}