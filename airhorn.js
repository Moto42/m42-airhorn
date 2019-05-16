// ==UserScript==
// @name         Airhorn for AirOS
// @namespace    m42_airhorn
// @version      0.1
// @include      *
// @description  Provides audible cues to help establish connection with another radio, as specified by it's MAC address.
// @author       Wesley Williams moto42@gmail.com
// @grant        none
// @run-at       document-end
// ==/UserScript==



//Declaring some globals, because I'm a monster. :)
const origin = window.location.origin;
const mac = 	'AC:3B:77:B6:9B:67';

//sample survey result. fetchSurvey returns an array of these objects
/*{
  airmax_ie: "none"
  auth_suites: "PSK"
  channel: "153"
  encryption: "wpa"
  essid: "b69b62_5g"
  frequency: "5.765"
  group_cipher: "TKIP"
  htcap: 2
  ieee_mode: "802.11ac"
  mac: "AC:3B:77:B6:9B:67"
  mode: "Master"
  mtik_name: ""
  noise_level: "-96"
  pairwise_ciphers: "CCMP TKIP"
  quality: "8/94"
  signal_level: "-88"
}*/
async function fetchSurvey() {
  const url = `${origin}/survey.json.cgi`;
  const survey = await fetch(url).then(r => r.json());
  return survey;
}

async function updateSurveyData(){
  const signalOut = document.querySelector('#signal');
  const survey = await fetchSurvey();
  survey.forEach(r => {
    if(r.mac === mac){
      const msg = `${r.essid}, signal ${r.signal_level}, mode ${r.mode}`;
      signalOut.innerHTML = msg;
      console.log('update',r.signal_level);
    }
  });
}

function createHeading(str) {
  const row = document.createElement('tr');
  row.innerHTML = `<tr><th colspan="3">${str}</th></tr>`;
  return row;
}

function createLinktable() {
  const table = document.createElement("table");
  table.setAttribute('border','0');
  table.setAttribute('cellpadding','0');
  table.setAttribute('cellspacing','0');
  table.setAttribute('class','linktable');
  return table;
}

function getBodyCell() {
  return document.querySelector('body > table > tbody > tr:nth-child(3) > td');
}

function createSoundEmbed(id, src) {
  const sound = document.createElement('audio');
  sound.setAttribute('id', id);
  sound.setAttribute('type','audio/mpeg');
  sound.setAttribute('src', src);
  return sound;
}

function injectSounds(){
  const signal_same = createSoundEmbed(
    'signal_same',
    'data:audio/mpeg;base64,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');
  document.querySelector('html').appendChild(signal_same);
  const signal_up = createSoundEmbed(
    'signal_up',
    'data:audio/mpeg;base64,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'
  );
  document.querySelector('html').appendChild(signal_up);
  const signal_down = createSoundEmbed(
    'signal_down',
    'data:audio/mpeg;base64,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'
  );
  document.querySelector('html').appendChild(signal_down);
}

function addMyContent() {
  const bodyCell = getBodyCell();
  const linktable = createLinktable();
  bodyCell.appendChild(linktable);
  const tbody = document.createElement('tbody');
  linktable.appendChild(tbody);
  tbody.appendChild(createHeading('AirHorn'));
  const outputRow = document.createElement('tr');
  outputRow.innerHTML = '<td id="signal">Signal will go here.</td>';
  tbody.appendChild(outputRow);

  injectSounds();

  window.setInterval(updateSurveyData,10000);

}

function handleAirhornButton() {
  clearContent();
  addMyContent();
}



// add my own menu button to the bar at the top of the screen.
function injectMenuButton() {
  const menuBar = document.querySelector('body > table > tbody > tr.menu > td:nth-child(1)');
  const btn     = document.createElement("BUTTON");
  btn.innerHTML = "AirHorn";
  btn.setAttribute('id','airhornButton');
  btn.addEventListener('click',handleAirhornButton);
  btn.style.position = 'relative';
  btn.style.bottom = '7px';
  btn.style.borderRadius = '.5rem .5rem 0px 0px';
  btn.style.borderStyle = 'none';
  menuBar.appendChild(btn);
}

//Clear all the old content out of the main div to make way for my content
function clearContent() {
  const bodyCell = getBodyCell();
  bodyCell.innerHTML = '';
}

(function() {
    'use strict';

    injectMenuButton();


})();
