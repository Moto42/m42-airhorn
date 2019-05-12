
let running = false;

//gather up the needed bits in the html\
const airOSIp = '192.168.1.20';
const macAddressInput = document.getElementById('macInput');
const outputDiv = document.getElementById('airhorn_App');
const startButton = document.getElementById('startButton');

async function airhorn() {
    console.log('called');
    const fetchOptions = {
      credentials : 'include',
      headers : {
        'Access-Control-Allow-Origin': `http://${airOSIp}`,
      }
    }
    const j = await fetch(`https://${airOSIp}/survey.json.cgi`, fetchOptions)
      .then(r => r.json());
    console.log(j);
}

function handleStartStop() {
  running = !running;
  if(running) airhorn();
}

//setting up event listeners
startButton.addEventListener('click',handleStartStop);

//get credentials
fetch(`https://${airOSIp}/login.cgi`,{
  credentials : 'include',
  method: 'post',
  headers : {
    'Access-Control-Allow-Origin': `*`,
  }
})
