const base_url = 'http://localhost:8080';

async function getAll(access_token){
    //TODO: Add the same catch function I added into FetchTopic
    let data;
    let url = `${base_url}/resource`;
    let params = {
        method : 'GET',
        headers: {
            'Content-Type'  : 'application/json'
        }
    };

    if(access_token !== null) params.headers.Authorization = access_token; 

    await fetch(url,params)
    .then((res)=>res.json())
    .then((res)=>{
        data = res;
    })
    .catch((err)=>{
        console.log(err);
    });

    return data;
}

async function save(access_token,body){
    let status;
    let url = `${base_url}/resource`;
    let params = {
        method : 'POST',
        headers : {
            'Authorization' : access_token,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(body)
    };

    await fetch(url,params)
    .then((res)=>{
        status = res.status;
    })
    .catch((err)=>{
        console.log(err);
        status = err.status;
    });
    
    return status;
}

async function update(access_token,body){
    let status;
    let url = `${base_url}/resource`;
    let params = {
        method : 'PUT',
        headers : {
            'Authorization' : access_token,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(body)
    };

    await fetch(url,params)
    .then((res)=>{
        status = res.status;
    })
    .catch((err)=>{
        console.log(err);
        status = err.status;
    });
    
    return status;
}

async function deleteResource(access_token,id){
    let status;
    let url = `${base_url}/resource/${id}`;
    let params = {
        method : 'DELETE',
        headers : {
            'Authorization' : access_token,
            'Content-Type': 'application/json'
        }
    };

    await fetch(url,params)
    .then((res)=>{
        status = res.status;
    })
    .catch((err)=>{
        console.log(err);
        status = err.status;
    });
    
    return status;
}

async function checkHowManyRelationsAre(access_token,topic_id){
    let data;
    let url = `${base_url}/resource/relations/`;
    let body = {
        topic_id : topic_id
    };
    let params = {
        method : 'POST',
        headers : {
            'Authorization' : access_token,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(body)
    };

    await fetch(url,params)
    .then((res)=>res.json())
    .then((res)=>{
        data = res;
    })
    .catch((err)=>{
        console.log(err);
    });

    return data;
}

module.exports = {
    getAll : getAll,
    save : save,
    update : update,
    delete : deleteResource,
    checkHowManyRelationsAre : checkHowManyRelationsAre
}