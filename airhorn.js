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

function getBodyCell(){
  return document.querySelector('body > table > tbody > tr:nth-child(3) > td');
}

function handleAirhornButton(){
  clearContent();
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
