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
