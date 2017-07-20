const client = require('node-rest-client').Client;

var credentials = {
  data : {
    "username":"Shoaib.Akbar1@ibm.com",
    "password":"wearethebot"
  },
  headers : {
    "Content-Type" : "application/json"
  }
}

exports.get_cookie = function(){
  if(!credentials.hasOwnProperty('cookie')){
    client.post("https://jira.atlassian.com/rest/auth/1/session", credentials, function(data,response){
      if(response.statusCode == 200){
        console.log("received cookie");
        var session = data.session;
        credentials.cookie = session.name + "=" + session.cookie;
      }
    });
  }
}

exports.get_users_issues(user, done){
  var search_args = {
    headers : {
      'cookie' : credentials.cookie,
      'Content-Type' : 'application/json'
    },
    data : {
      'jql' : 'project=TSB-46 AND status=done',
    }
  }
  client.post("https://jira.atlassian.co/rest/api/2/search", credentials.cookie, search_args, function(data, response){
    if(response.statusCode == 200){
      done(data);
    }
    else{
      done(null,response);
    }
  });
}

exports.set_task_status(){

}

get_cookie();
