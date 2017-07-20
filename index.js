const TJBot = require('./node_modules/tjbot');
const ScrumMaster = require('./scrum_master');

const commands = [
  ['watson', 'stories', 'completed']
]

var hardware = ['microphone', 'speaker'];
var configuration = {
    robot: {
        gender: 'male'
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
var current = [];

function listen(){
  tj.listen(function(msg){
    console.log(current);
    //Resets if there is a current watson call, otherwise adds watson to check for function call
    if(msg.startsWith('Watson')){
      current = msg;
    }else if(current.includes('Watson')){
      current.concat(" " + msg);
    }
    //Gives how many points away from your goal
    if (current.includes("points") && current.includes("away") && current.includes("goal")) {
      tj.speak("Gives how many points away from your goal");
      ScrumMaster.find_stories(tj);
      current = "";
    }
    //Gives % of stories completed
    else if ((current.includes("percent")|(current.includes("percentage"))) && current.includes("stories") && current.includes("completed")) {
      current = "";
      tj.speak("Gives % of stories completed");
    }
    //Gives number of stories in a current state
    else if (current.includes("number of stories")) {
      if (current.includes("not started")) {
        current = "";
        tj.speak("Gives number of stories not started in a current state");
      }
      else if (current.includes("in progress")) {
        current = "";
        tj.speak("Gives number of stories in progress in a current state");
      }
      else if (current.includes("done") | current.includes("completed")) {
        current = "";
        tj.speak("Gives number of stories done in a current state");
      }
    }
    //Creates a story using jira api
    else if (current.includes("create") && current.includes("story")) {
      current = "";
      tj.speak("Creates a story using jira api");
    }
    //Closes or move a story
    else if ((current.includes("move") | current.includes("close")) && (current.includes("story"))) {
      current = "";
      tj.speak("Closes or move a story");
    }
  });
}

listen();
