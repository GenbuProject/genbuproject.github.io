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

    this.Parent = DOM.Util.Param(Args.Parent, document.body);
    this.Theme = DOM.Util.Param(Args.Theme, "LightSeaGreen");

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
    }).bind(this)();

    this.Root = (function () {
        let Elem = DOM("Chat");
            Elem.enabled = false;
            
        Elem.enable = (function () {
            if (!Elem.enabled) {
                Elem.enabled = true;
                this.Parent.appendChild(Elem);
            }
        }).bind(this);

        Elem.disable = (function () {
            if (Elem.enabled) {
                Elem.enabled = false;
                Elem.dismiss();
            }
        }).bind(this);

        return Elem;
    }).bind(this)();

    this.addChatMessage = function (Message) {
        let Elem = DOM("ChatMessage");
    }
}