
self.addEventListener("push", function(event) {
    if (event.data) {
        console.log("Push event!! ", event.data);
        showLocalNotification('Yolo', event.data.text(),self.registration)
    } else {
        console.log("Push event but no data");
    }
});
const showLocalNotification = (title, body, swRegistration) => {
    const options = {
        body
    };
    swRegistration.showNotification(title, options);
};
