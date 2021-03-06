const TJBot = require('./node_modules/tjbot');
const ScrumMaster = require('./scrum_master');
Num2Word = require('number-to-words');

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
var storyCount = 0;
var movename = "";
var status = "";
var createname = "";
var description = "";
var issue = "";
var assignee = "";
var priority = "";
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
        tjbot.speak('You are too cheap to buy the extension');
        current = "";
      }
      //Gives % of stories completed
      else if ((current.includes("percent")|(current.includes("percentage"))) && (current.includes("stories") | current.includes("story"))&& current.includes("completed")) {

        current = "";
      }
      //Gives number of stories in a current state
      else if (current.includes("number") && current.includes("stories")) {
        if (current.includes("not started") | current.includes("new")) {
      	  ScrumMaster.stories_todo(function(num){
      		tj.speak(Num2Word.toWords(num));
    	  });
          current = "";
        }
        else if (current.includes("progress")) {
          ScrumMaster.stories_doing(function(num){
		      tj.speak(Num2Word.toWords(num));
	      });
          current = "";
        }
        else if (current.includes("done") | current.includes("completed") | current.includes("complete") | current.includes("finished")) {
          ScrumMaster.stories_done(function(num){
      		tj.speak(Num2Word.toWords(num));
      	 });
          current = "";
        }
      }

      //Creates a story using jira api
      else if (current.includes("create") && current.includes("story")) {
      
        if (storyCount == 0) {
          tj.speak("What is the name of your story");
          storyCount += 1;
        }
        if (storyCount == 2) {
          tj.speak("What is the description of your story");
          storyCount += 1;
        }
        if (storyCount == 4) {
          tj.speak("What is the issueType of your story");
          storyCount += 1;
        }
        if (storyCount == 6) {
          tj.speak("What is the assignee of your story");
          storyCount += 1;
        }
          if (current.includes("name is") && (storyCount == 1)) {
            createname = current.substring(current.indexOf("name is") + 8, current.length);
            storyCount = storyCount + 1;
          }
          if (current.includes("description is") && (storyCount == 3)) {
            description= current.substring(current.indexOf("description is") + 15, current.length);
            storyCount = storyCount + 1;
          }
          if (current.includes("issue is") && (storyCount == 5)) {
            issue = current.substring(current.indexOf("issue is") + 9, current.length);
            storyCount = storyCount + 1;
          }
          if (current.includes("assignee is") && (storyCount == 7)) {
            assignee = current.substring(current.indexOf("assignee is") + 12, current.length);
            storyCount = storyCount + 1;
            current = "";
            storyCount = 0;
          }
          scrum_master.create(summary, description, issue, assignee, function(res){
            tj.speak("The task has been created");
          });
        }



      //Changes a stories status
      else if (current.includes("move") && (current.includes("story") | current.includes("task")) && (current.includes("status"))) {
           if (t == 0) {
             tj.speak("Please tell me the story name");
             t += 1;
           }
           if (t == 2) {
             tj.speak("Please tell me the status you want to set it to");
             t += 1;
           }
           if (current.includes("name is") && (current.length > current.indexOf("name is") + 7) && (t==1)) {
	              movename = current.substring(current.indexOf("name is") + 8, current.length);
      	        t = t + 1;
                console.log(movename);
	         }
           if (current.includes("status is") && (current.length > current.indexOf("status is") + 9 ) && (t==3)) {
             status = current.substring(current.indexOf("status is") + 10, current.length);
             console.log(status);
             current = "";
             t = 0;
           }
          scrum_master.move_status("10036","21",function(res){
            tj.speak("The task has been moved to in progress");
          })
      }

      //Gets stories for a user
      else if (current.includes("get") && current.includes("stories") && current.includes("for")) {
        var username = current.substring(current.indexOf("for") + 4, current.length);
        console.log("user: ",username);
        ScrumMaster.get_stories_by_person(username,function(stories){
          tj.speak(Num2Word.toWords(stories));
        });
        current = "";
      }
  });
}

ScrumMaster.get_cookie(function(){
   console.log("got dah cookie");
   ScrumMaster.get_team_info(function(){
     listen();
   });
});

