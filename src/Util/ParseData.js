function parseHomeData(data) {
  let topics = [];

  data.map((item, index) => {
    if (topics.length === 0) {
      topics.push({
        topic: item.topic.name,
        num_resource: 1
      });
      return index;
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

      if (found) {
        topics[index].num_resource++;
      } else {
        topics.push({
          topic: item.topic.name,
          num_resource: 1
        });
      }
    }
    return topics;
  });

  topics.sort(dynamicSort("num_resource"));

  return deleteExtraTopics(topics);
}

function dynamicSort(property) {
  return function(a, b) {
    return a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0;
  };
}

function deleteExtraTopics(topics) {
  let final_topic = [];
  let MAX_COUNT = topics.length < 10 ? topics.length : 10;

  for (let i = 0; i < MAX_COUNT; i++) {
    final_topic.push(topics[i]);
  }

  return final_topic;
}

export default {
  parseHomeData: parseHomeData
};
