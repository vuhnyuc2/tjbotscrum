const Story = require('./story');
var jira = require('./jira');


exports.find_stories = function(tj){
  jira.get_users_issues('a;ldfjiajfl', function(suc,err){  
if(!err){
     	console.log("did have an error");
	console.log(suc);
    }else{
	console.log(err.statusCode);
}
  });
}

exports.create_story = function(tj){

}

exports.get_cookie = function(done){
  console.log('get dah cookie');
  jira.get_cookie(done);
}
