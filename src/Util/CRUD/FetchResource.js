const base_url = "http://localhost:8080";

async function getResources(access_token){
    let data;
    let url = `${base_url}/resource`;
    let params = {
        method : 'GET',
        headers : {
            'Content-Type': 'application/json',
            'Authorization':access_token
        }
    };

    await fetch(url,params)
    .then((res)=>res.json())
    .then((res)=>{
        data = res;
    })
    .catch((err)=>{
        console.log('An error ocurred while fetching API: '+err);
    });

    return data;
}

module.exports = {
    getResources : getResources
}