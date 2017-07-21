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
var t = 0;
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
      current = current.concat("" + msg);
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
	  tj.speak("what is going on");
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
        if (t == 0) {
          tj.pauseListening();
          tj.speak("Please tell me the story name");
          tj.resumeListening();
        }
	      var name = "";
	      var status = "";
          if (current.includes("name is") && (current.length > current.indexOf("name is") + 7)) {
            name = current.substring(current.indexOf("name is") + 8, current.length);
            current = current.replace("name is", "");
      	    console.log(name);
      	    t = t + 1;
            tj.pauseListening();
            tj.speak("Please tell me the status you want to set it to");
            tj.resumeListening();
            if (current.includes("status is") && (current.length > current.indexOf("status is") + 9 )) {
              status = current.substring(current.indexOf("status is") + 10, current.length);
         	    current = current.replace("status is", "");
              console.log(status);
              current = "";
            }
        }
  	    /*if (t === 2) {
  	      console.log("wjaklda");
  	      current = "";
  	      t = 0;
  	    }*/
      }

  });
}

ScrumMaster.get_cookie(function(){
   console.log("got dah cookie");
   listen();
});
