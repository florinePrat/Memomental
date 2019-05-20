import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import axios from "axios"
import {tokenHeaders} from './utils/headers';


function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

const vapidPublicKey =
    "BON_Xmz-R2iIpUcyZmG4areWKYrtYayP9W1apwudRfdTRMqFzsbrlQ2vF-QDfTXXvOwimqHolwz1f7sNr-spGMA"
function subscribeToPushNotifications(registration) {
    return registration.pushManager
        .subscribe({
            userVisibleOnly: true,
            applicationServerKey: vapidPublicKey
        })
        .then(pushSubscription => {
            console.log(
                "Received PushSubscription:",
                JSON.stringify(pushSubscription)
            );
            return pushSubscription;
        });
}


function registerServiceWorker() {
    navigator.serviceWorker
        .register('./serviceWorker.js')
        .then(registration => {
            console.log(
                "ServiceWorker registered with scope:",
                subscribeToPushNotifications(registration)
            );
        })
        .catch(e => console.error("ServiceWorker failed:", e));
}
if (navigator && navigator.serviceWorker) {
    registerServiceWorker();
}


if('serviceWorker' in navigator)
{
    const permission = Notification.requestPermission();
    if (permission !== 'granted') {
        console.log("permissions refusées")
    }else{

    }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

ReactDOM.render(<App />, document.getElementById('root'));

//serviceWorker.unregister();
