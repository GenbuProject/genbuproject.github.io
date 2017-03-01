(function () {
    let Urls = [
        "https://genbuproject.github.io/Programs/DOM Extender/DOM Extender.js"
    ]

    for (let i = 0; i < Urls.length; i++) {
        let Elem = document.createElement("Script");
            Elem.src = Urls[i];

        document.head.appendChild(Elem);
    }
})();

const Chat = function (Args) {
    Args == undefined ? Args = {} : null;

    this.root = (function (Parent, Color) {
        let Elem = document.createElement("Div");
            Elem.enabled = false;

            Elem.enable = function () {
                if (!Elem.enabled) {
                    Elem.enabled = true;
                    Parent.appendChild(Elem);
                }
            }

            Elem.disable = function () {
                if (Elem.enabled) {
                    Elem.enabled = false;
                    Parent.removeChild(Elem);
                }
            }

        return Elem;
    })(Args.parent ? Args.parent : document.body, Args.color ? Args.color : "LightSeaGreen")
}