(function () {
    let Info = (function () {
        let VGetter = new XMLHttpRequest();
            VGetter.open("GET", "API.Info", false);
            VGetter.send(null);

        return JSON.parse(Event.target.response);
    })();

    let SGetter = new XMLHttpRequest();
        SGetter.open("GET", Info.Name + " " + Info.Version + ".js", false);
        SGetter.send(null);

    eval(SGetter.target.response);
})();