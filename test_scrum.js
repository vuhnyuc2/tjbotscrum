var scrum = require("./scrum_master");
var team_members = [];
var jira = require('./jira');



/*10036
 transitions:
   [ { id: '11', name: 'To Do', to: [Object], hasScreen: false },
     { id: '21', name: 'In Progress', to: [Object], hasScreen: false },
     { id: '31', name: 'Done', to: [Object], hasScreen: false } ] }
*/
var start = function(){
  jira.set_task_status("10036", "21", function(res){
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
