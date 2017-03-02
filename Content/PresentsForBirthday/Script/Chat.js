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
    Args = DOM.Util.Param(Args, {});

    this.parent = DOM.Util.Param(Args.parent, document.body);
    this.themeColor = DOM.Util.Param(Args.themeColor, "LightSeaGreen");

    (function () {
        let ChatStyle = new Style();
            ChatStyle.textContent = [
                "Chat {",
                "   BackGround: LightGray;",
                "   Border-Radius: 2.5%;",
                "}",
                "",
                "Chat < ChatTitle {",
                "   Width: 100%;",
                "   BackGround: " + this.themeColor + ";",
                "}"
            ].join("\n");

        document.head.appendChild(ChatStyle);
    })();

    this.root = (function () {
        let Elem = DOM("Chat");
            Elem.enabled = false;

        Elem.enable = function () {
            if (!Elem.enabled) {
                Elem.enabled = true;
                this.parent.appendChild(Elem);
            }
        }

        Elem.disable = function () {
            if (Elem.enabled) {
                Elem.enabled = false;
                this.parent.removeChild(Elem);
            }
        }

        return Elem;
    })();

    this.addChatMessage = function (Message) {
        let Elem = DOM("ChatMessage");
    }
}