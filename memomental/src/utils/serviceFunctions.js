import axios from "axios"
import {tokenHeaders} from './headers';
const vapidPublicKey =
    "BON_Xmz-R2iIpUcyZmG4areWKYrtYayP9W1apwudRfdTRMqFzsbrlQ2vF-QDfTXXvOwimqHolwz1f7sNr-spGMA"


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
const service = async () => {
    try {
        console.log("subscribe")
        const registration = await navigator.serviceWorker.register('./service.js')
        const ready =   await     navigator.serviceWorker.ready
        if (!registration.pushManager) {
            alert("Push Unsupported")
            return
        }
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)
        console.log("registration OK")
        const subscription = await        registration.pushManager
            .subscribe({
                userVisibleOnly: true, //Always display notifications
                applicationServerKey: convertedVapidKey
            })
        console.log('send subscription')
        axios.post(process.env.REACT_APP_API_URL+'/api/push/register', subscription, { headers : tokenHeaders} )
            .then( response => {console.log(response)})
            .catch(err => {console.log("erreur lors de l'envoi au serveur")})
        console.log("subscription ended")
    } catch(error){
        console.log(error)
    }


}
export default service;
