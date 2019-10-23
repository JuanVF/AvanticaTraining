import _ from 'lodash';

function isAnEmptyString(object){
    return (_.isEqual(object,""));
}

export default {
    isAnEmptyString : isAnEmptyString
}