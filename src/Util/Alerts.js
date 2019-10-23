import _ from 'lodash';

function alertIfIsEmpty(firstObject){
    if(_.isEqual(firstObject,"")) alert('Please, fill the empty inputs');
}

function alertIfObjectsAreEmpty(objectCollection){
    var areEmpty = 0;
    
    objectCollection.map((item)=>{
        if(_.isEqual(item,"")) areEmpty++;

        return areEmpty;
    });

    if(areEmpty > 0) alert('Please fill the empty inputs');
}

export default {
    alertIfIsEmpty : alertIfIsEmpty,
    alertIfObjectsAreEmpty : alertIfObjectsAreEmpty
}