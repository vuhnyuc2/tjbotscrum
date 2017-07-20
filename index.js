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

function listen(){
  tj.listen(function(msg){
    console.log(current);
    //Resets if there is a current watson call, otherwise adds watson to check for function call
    if (msg.startsWith(tj.configuration.robot.name)) {
      if (current.contains("Watson")) {
        current = "";
      }
      else {
        current.concat(msg);
      }
    }

    if (current.contains("Watson")) {
      current.concat(" ");
      current.concat(msg);
      //Gives how many points away from your goal
      if (msg.contains("points") && msg.contains("away") && msg.contains("goal")) {
        tj.speak("Gives how many points away from your goal");
        ScrumMaster.find_stories(tj);
        current = "";
      }
      //Gives % of stories completed
      else if ((msg.contains("percent")|(msg.contains("percentage"))) && msg.contains("stories") && msg.contains("completed")) {
        current = "";
        tj.speak("Gives % of stories completed");
      }
      //Gives number of stories in a current state
      else if (msg.contains("number of stories")) {
        if (msg.contains("not started")) {
          current = "";
          tj.speak("Gives number of stories not started in a current state");
        }
        else if (msg.contains("in progress")) {
          current = "";
          tj.speak("Gives number of stories in progress in a current state");
        }
        else if (msg.contains("done") | msg.contains("completed")) {
          current = "";
          tj.speak("Gives number of stories done in a current state");
        }
      }
      //Creates a story using jira api
      else if (msg.contains("create") && msg.contains("story")) {
        current = "";
        tj.speak("Creates a story using jira api");
      }
      //Closes or move a story
      else if ((msg.contains("move") | msg.contains("close")) && (msg.contains("story"))) {
        current = "";
        tj.speak("Closes or move a story");
      }
    }
  });
}

listen();
