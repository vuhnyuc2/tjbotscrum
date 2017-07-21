var scrum = require("./scrum_master");
var team_members = [];
var jira = require('./jira');

var start = function(){
  jira.create_story("test", "test", "Bug", "admin", function(res){
    console.log(res);
  });
  /*jira.get_projects(function(res){
    console.log(res);
  });*/
}

scrum.get_cookie(function(){
  scrum.get_team_info(function(){
    start();
  });
});
