import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

const check = () => {
    if (!("serviceWorker" in navigator)) {
        throw new Error("No Service Worker support!");
    }
    if (!("PushManager" in window)) {
        throw new Error("No Push API Support!");
    }
};

const registerServiceWorker = async () => {
    try {
        const swRegistration = await navigator.serviceWorker.register("./service.js");
        return swRegistration;
    } catch (error){
        console.log(error)
    }

};

const requestNotificationPermission = async () => {
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

const main = async () => {
    check();
    const swRegistration = await registerServiceWorker();
    const permission = await requestNotificationPermission();
};
main();

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
