const Client = require('node-rest-client').Client;
var client = new Client();

  var credentials = {
    data : {
      "username":"Shoaib.Akbar1@ibm.com",
      "password":"wearethebot"
    },
    headers : {
      "Content-Type" : "application/json"
    }
  }

  exports.get_cookie = function(done){
    if(!credentials.hasOwnProperty('cookie')){
      client.post("https://scrumtj.atlassian.net/rest/auth/1/session", credentials, function(data,response){
        console.log(response.statusCode);
        if(response.statusCode == 200){
          console.log("received cookie");
          var session = data.session;
          credentials = session.name + "=" + session.value;
	  done();
        }
      });
    }
  }
  exports.get_users_issues = function(user, done){
    console.log(credentials);
    var search_args = {
      headers : {
        'cookie' : credentials,
        'Content-Type' : 'application/json'
      },
      data : {
        'jql' : 'status=done',
	'maxResults' : '1'
      }
    }
    client.post("https://scrumtj.atlassian.net/rest/api/2/search", search_args, function(data, response){
      if(response.statusCode == 200){
        done(data);
      }
      else{
        done(null,response);
      }
    });
  }

  exports.set_task_status = function(){

  }

