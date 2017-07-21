const Story = require('./story');
var jira = require('./jira');
var opn = require('opn');
var team_members = [];

exports.stories_doing = function(done){
  jira.get_num_stories_doing(function(suc, err){
    done(suc);
  });
}

exports.stories_todo = function(done){
  jira.get_num_stories_todo(function(suc, err){
    done(suc);
  });
}

exports.stories_done = function(done){
  jira.get_num_stories_done(function(suc, err){
    done(suc);
  });
}

exports.find_stories = function(){
  jira.get_users_issues('a;ldfjiajfl', function(suc,err){
if(!err){
     	console.log("did have an error");
	console.log(suc);
    }else{
	console.log(err.statusCode);
}
  });
}

exports.get_team_info = function(done){
  jira.get_team(function(suc,err){
    console.log(suc);
    team_members = suc['values'];
    done();
  });
}

exports.get_stories_by_person = function(disp_name, done){
  var name = "";
  for(var i = 0; team_members.length; i++){
    if(team_members[i]['displayName'].includes(disp_name)){
      name = team_members[i]['key'];
      break;
    }
  }
	console.log(name);
  jira.get_stories_person(name, function(suc,err){
	  done(suc);
  });
}

exports.create_story = function(){

}

exports.get_cookie = function(done){
  console.log('get dah cookie');
  jira.get_cookie(done);
}
