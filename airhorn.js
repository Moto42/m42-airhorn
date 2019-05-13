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

// <tr><th colspan="3">Advanced Wireless Settings</th></tr>
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
  const tbody = bodyCell.appendChild(createLinktable().appendChild(document.createElement('tbody')));
  const thing = createHeading('AirHorn');
  console.log(thing);
  tabelBody.appendChild(thing);
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
