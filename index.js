const TJBot = require('./node_modules/tjbot');
const ScrumMaster = require('./scrum_master');

const commands = [
  ['watson', 'stories', 'completed']
]

var hardware = ['led', 'servo', 'microphone', 'speaker'];
var configuration = {
    robot: {
        gender: 'female'
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
    console.log("msg");
    if (msg.includes('check stories')){
      // check stories
      ScrumMaster.find_stories();
    }
    else if(msg.includes('create')){
      // create new story
    }
  });
}

listen();
