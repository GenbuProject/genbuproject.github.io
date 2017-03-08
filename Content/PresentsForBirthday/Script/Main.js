let ChatBase = null;
let GBase = null;

window.addEventListener("load", function() {
    importScripts([
        "http://localhost:8001/Programs/Sync Helper/Sync Helper v1.1.js",
        "http://localhost:8001/Programs/Custom Chat/Custom Chat v1.0.js"
    ], function () {
        ChatBase = new Chat({
            Name: "プログラなーいGenboo(自称)",

            Theme: "LightSeaGreen",
            Parent: document.body
        }, true);

        GBase = new GoogleAPI({
            ID: "159240489618-dh7v838ef8b6eds5dtcr786bd6v7e52f.apps.googleusercontent.com",
            Key: "P818It-akvSnfh8fOEqyZrXq",

            Url: "http://localhost:8001/Content/PresentsForBirthday/"
        });
    });
});