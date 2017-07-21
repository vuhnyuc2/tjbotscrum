const TJBot = require('./node_modules/tjbot');
const ScrumMaster = require('./scrum_master');

const commands = [
  ['watson', 'stories', 'completed']
]

var hardware = ['microphone', 'speaker'];
var configuration = {
    log : {
       level : 'verbose'
    },
    robot: {
        gender: 'male',
	name: 'Watson'
    },
    listen: {
        language: 'en-US'
    },
    speak: {
        language: 'en-US'
    }
};
var credentials = {
    speech_to_text: {
        username: '692549ea-e331-40ad-b088-0e50ff1d4944',
        password: 'AZatYwvigxj2'
    },
    text_to_speech: {
        username: '7443ec8d-a138-4f02-b876-ca27f907ca80',
        password: 'fQZakHwDIph6'
    }
}
var tj = new TJBot(hardware, configuration, credentials);
var current = "";
function listen(){
  tj.listen(function(msg){
    console.log(current);
    //Resets if there is a current watson call, otherwise adds watson to check for function call
    if (current.length > 500) {
      current = [];
    }
    if(msg.includes('Watson')){
      current = msg;
    }else if(current.includes('Watson')){
      current = current.concat(" " + msg);
    }
      //Gives how many points away from your goal
      if (current.includes("points") && current.includes("away") && current.includes("goal")) {

        current = "";
      }
      //Gives % of stories completed
      else if ((current.includes("percent")|(current.includes("percentage"))) && (current.includes("stories") | current.includes("story"))&& current.includes("completed")) {

        current = "";
      }
      //Gives number of stories in a current state
      else if (current.includes("number") && current.includes("stories")) {
        if (current.includes("not started") | current.includes("new")) {

          current = "";
        }
        else if (current.includes("progress")) {

          current = "";
        }
        else if (current.includes("done") | current.includes("completed")) {

          current = "";
        }
      }

      //Creates a story using jira api
      else if (current.includes("create") && current.includes("story")) {

        prompt = false;
        while (prompt = false) {
          tj.speak("What is your story name?");
          var summary = msg;
          tj.speak("What is your story description?");
          var description = msg;
          tj.speak("What is the issue type?");
          var issueType = msg;
          tj.speak("Who is assigned this story?");
          var assignee = msg;
          tj.speak("What is the priority of this story?");
          var priority = msg;
          console.log(summary);
          console.log(description);
          console.log(issueType);
          console.log(assignee);
          console.log(priority);
          prompt = true;
        }
        current = "";

      }
      //Changes a stories status
      else if (current.includes("set") && (current.includes("story") | current.includes("task")) && (current.includes("status"))) {
        tj.speak("Please tell me the story name and the status you want to set it to");
        var t = 0;
        while (t != 2) {
          var name = "";
          var status = "";
          if (msg.includes("name is")) {
            temp = msg;
            name = msg.replace("name is ", "");
            console.log(name);
            t = t + 1;
          }
          if (msg.includes("status is")) {
            temp = msg;
            status = msg.replace("status is ", "");
            console.log(status);
            t = t + 1;
          }
        }
        current = "";
      }

  });
}

ScrumMaster.get_cookie(function(){
   console.log("got dah cookie");
   listen();
});
