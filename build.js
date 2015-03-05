var glob = require('glob');
var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');

var REPO = 'submissions-2015';
var submissions = glob.sync(REPO + '/*');
submissions = _.without(submissions, REPO + '/README.md');

submissions = submissions.map(function(path){
  // console.log("path", path);
  var key = path.split('/')[1];
  // console.log("key", key);
  
  return {
    key: path.split('/')[1],
    details: yaml.safeLoad(fs.readFileSync(path + '/proposal.yaml'))
  }
});

var schedule = require('./public/schedule.json');
schedule = schedule.map(function(day){
  day.items = day.items.map(function(item){
    if (item.key){
      var session = _.find(submissions, {key: item.key});
      if (session){
        item = _.extend(item, session)
      }
    }
    
    item.link = "/#details/" + item.key;
    
    return item;
  });
  return day;
})

// console.log("schedule", schedule);

fs.writeFileSync('public/schedule-built.json', JSON.stringify(schedule));
// console.log("submissions", submissions);
