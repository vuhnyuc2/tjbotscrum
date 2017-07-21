var scrum = require("./scrum_master");
var team_members = [];

var start = function(){
  scrum.stories_done(function(res){
    console.log(res);
  });
}

scrum.get_cookie(function(){
  scrum.get_team_info(function(){
    start();
  });
});
