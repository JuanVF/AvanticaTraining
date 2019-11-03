function parseHomeData(data) {
    let topics = [];

    data.map((item) => {
        if (topics.length === 0) {
            topics.push({
                topic: item.topic.name,
                num_resource: 1
            });
            return;
        } else {
            let found = false;
            let index;

            for (let i = 0; i < topics.length; i++) {
                if (topics[i].topic === item.topic.name) {
                    found = true;
                    index = i;
                    break;
                }
            }

            if(found){
                topics[index].num_resource++;
            }else{
                topics.push({
                    topic : item.topic.name,
                    num_resource : 1
                })
            }
        }
    });

    topics.sort(dynamicSort('num_resource'));

    return topics;
}

function dynamicSort(property) {
    return function(a, b) {
        return (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
    }
 }

export default {
    parseHomeData: parseHomeData
}