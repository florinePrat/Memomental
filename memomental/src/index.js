import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import {tokenHeaders} from "./utils/headers";

const check = () => {
    if (!("serviceWorker" in navigator)) {
        console.log("No Service Worker support!");
    }
    if (!("PushManager" in window)) {
        console.log("No Push API Support!");
    }
};

const registerServiceWorker = async () => {
    try {
        console.log("enter in regisration")
        const swRegistration = await navigator.serviceWorker.register("/service.js");
        console.log(swRegistration)
        return swRegistration;
    } catch (error){
        console.log(error)
    }

};

const requestNotificationPermission = async () => {
    console.log('notification asked')
    try {    const permission = await window.Notification.requestPermission();
        // value of permission can be 'granted', 'default', 'denied'
        // granted: user has accepted the request
        // default: user has dismissed the notification permission popup by clicking on x
        // denied: user has denied the request.
        if (permission !== "granted") {
            throw new Error("Permission not granted for Notification");
        }
    } catch (error){
        console.log(error)
    }};
const urlB64ToUint8Array = base64String => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

const saveSubscription = async subscription => {
    try{
        //  const tokenHeaders =this.tokenHeaders;
        // console.log(tokenHeaders)
        const SERVER_URL = process.env.REACT_APP_API_URL+"/save-subscription";
        console.log(SERVER_URL);
        console.log(JSON.stringify(subscription))
        const response = await fetch(SERVER_URL, {
            method: "post",
            headers: tokenHeaders,
            body: JSON.stringify(subscription)
        });
        console.log(response);
        return response.json();
    } catch(error){
        console.log(error);
    }

};

const main = async () => {
    check();
    const applicationServerKey = urlB64ToUint8Array(
        "BON_Xmz-R2iIpUcyZmG4areWKYrtYayP9W1apwudRfdTRMqFzsbrlQ2vF-QDfTXXvOwimqHolwz1f7sNr-spGMA"
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    console.log(process.env.REACT_APP_API_URL)
    const swRegistration = await registerServiceWorker();
    const subscription = await swRegistration.pushManager.subscribe(options);
    console.log(subscription)
    const response = await saveSubscription(subscription);
    console.log(response);
    const permission = await requestNotificationPermission();
};
main();

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

ReactDOM.render(<App />, document.getElementById('root'));

//serviceWorker.unregister();
