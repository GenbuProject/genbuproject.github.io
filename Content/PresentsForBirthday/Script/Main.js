let Base = null;
let GBase = null;

window.addEventListener("load", function () {
    Base = new Chat({
        Theme: "LightSeaGreen",
        Parent: document.body
    }, true);

    GBase = new GoogleAPI({
        ID: "159240489618-dh7v838ef8b6eds5dtcr786bd6v7e52f.apps.googleusercontent.com",
        Key: "P818It-akvSnfh8fOEqyZrXq",

        Url: "http://localhost:8001/Content/PresentsForBirthday/"
    });
});