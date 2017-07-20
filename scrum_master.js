const Story = require('./story');
const Jira = require('./jira').Jira()
// const JiraApi = require('./node_modules/jira').JiraApi;


exports.find_stories = function(tj){
  Jira.get_users_issues('a;ldfjiajfl', function(suc,err){
    if(!err){
      tj.speak("You have " + suc.length + " results");
    }
  });
}

exports.create_story = function(tj){

}
