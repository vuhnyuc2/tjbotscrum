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

  exports.create_story = function(name, summary, description, issueType, assignee, priority, done){
    var search_args = {
      headers : {
        'cookie' : credentials,
        'Content-Type' : 'application/json'
      },
      data : {
        "fields": {
           "project": {
              "key": 'TSB-46'
            },
           "summary": 'summary',
           "description": 'description',
          //We can pass in an assignee object through get_user
          "issuetype" : {
            'name' : 'stuff'
          }
          //  "assignee": {
          //    "name" : assignee
          //  }
         }
       }
     }
     client.post("https://scrumtj.atlassian.net/rest/api/2/issue/", search_args, function(data, response){
       if(response.statusCode == 200){
         done(data);
       }
       else{
         done(null,response);
       }
     });
   }

  //Returns all stories for user
  exports.get_stories_person = function(person, done){
    var search_args = {
      headers : {
        'cookie' : credentials,
        'Content-Type' : 'application/json'
      },
      data : {
        'jql' : 'assignee in ('+person+')'
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

  //Might not be needed if get_user works as intended
  exports.get_team = function(done){
    var search_args = {
      headers : {
        'cookie' : credentials,
        'Content-Type' : 'application/json'
      },
      parameters : {
        'groupname' : 'site-admins'
      }
    }
    client.get("https://scrumtj.atlassian.net/rest/api/2/group/member", search_args, function(data, response){
      if(response.statusCode == 200){
        done(data);
      }
      else{
        done(null,response);
      }
    });
  }

  //You may use this by searching for user by full name and then using the username of the data returned for
  //further rest calls
  exports.get_user = function(name, done){
    var search_args = {
      headers : {
        'cookie' : credentials,
        'Content-Type' : 'application/json'
      },
      parameters : {
        'username' : name
      }
    }
    client.get("https://scrumtj.atlassian.net/rest/api/2/user/search", search_args, function(data, response){
      if(response.statusCode == 200){
        done(data);
      }
      else{
        done(null,response);
      }
    });
  }

  exports.get_num_stories_done = function(done){
    var search_args = {
      headers : {
        'cookie' : credentials,
        'Content-Type' : 'application/json'
      },
      data : {
        'jql' : 'status=done'
      }
    }
    client.post("https://scrumtj.atlassian.net/rest/api/2/search", search_args, function(data, response){
      if(response.statusCode == 200){
        done(data.total);
      }
      else{
        done(null,response);
      }
    });
  }

  exports.get_num_stories_doing = function(done){
    var search_args = {
      headers : {
        'cookie' : credentials,
        'Content-Type' : 'application/json'
      },
      data : {
        'jql' : 'status="In Progress"'
      }
    }
    client.post("https://scrumtj.atlassian.net/rest/api/2/search", search_args, function(data, response){
      if(response.statusCode == 200){
        done(data.total);
      }
      else{
        done(null,response);
      }
    });
  }

  exports.get_num_stories_todo = function(done){
    var search_args = {
      headers : {
        'cookie' : credentials,
        'Content-Type' : 'application/json'
      },
      data : {
        'jql' : 'status="To Do"'
      }
    }
    client.post("https://scrumtj.atlassian.net/rest/api/2/search", search_args, function(data, response){
      if(response.statusCode == 200){
        done(data.total);
      }
      else{
        done(null,response);
      }
    });
  }

  exports.set_task_status = function(task, status, done){
    var search_args = {
      headers : {
        'cookie' : credentials,
        'Content-Type' : 'application/json'
      },
      data : {
        "transition": {
          "id": status
        }
      }
    }
    client.post("https://scrumtj.atlassian.net/rest/api/2/issue/"+task+"/transitions", search_args, function(data, response){
      if(response.statusCode == 200){
        done(data);
      }
      else{
        done(null,response);
      }
    });
  }

  //TEST NOT GOING TO BE USED IN FINAL
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
