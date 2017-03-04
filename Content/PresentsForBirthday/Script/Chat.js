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

const Chat = function (Args, DoesAppend) {
    Args = DOM.Util.Param(Args, {});

    this.Parent = DOM.Util.Param(Args.Parent, document.body);
    this.Theme = DOM.Util.Param(Args.Theme, "LightSeaGreen");

    this.Root = DOM("Chat");
    this.Root.conversationName = DOM.Util.Param(Args.Name, "Unknown");
    this.Root.Face = null;
    this.Header = null,
    this.Body = null;

    this.Watchers = [];

    this.enabled = false;

    this.enable = function () {
        if (!this.enabled) {
            this.enabled = true;
            this.Root.appendTo(this.Parent);

            this.addChatBase();
        }
    };
    
    this.disable = function () {
        if (this.enabled) {
            this.enabled = false;
            this.Root.dismiss();
        }
    };

    this.addChatBase = function () {
        this.Header = DOM("ChatHeader");
        this.Header.appendTo(this.Root);

        this.Body = DOM("ChatBody");
        this.Body.appendTo(this.Root);
    };

    this.addChatMessage = function (Message) {
        let Root = DOM("ChatMessage");
        let Face = new Image();
        let Text = DOM("Div");

        Face.appendTo(Root),
        Text.appendTo(Root);
        
        Text.textContent = Message;
        Elem.appendTo(this.Body);
    };

    (function () {
        let IsExists = false;

        for (let i = 0; i < DOM(":Style").length; i++) {
            if (DOM(":Style")[i].attributes["UUID"] && DOM(":Style")[i].attributes["UUID"].value == "Chat.js - ChatStyle") {
                IsExists = true;
                break;
            }
        }
        
        if (!IsExists) {
            let ChatStyle = new Style();
                ChatStyle.setAttribute("UUID", "Chat.js - ChatStyle");

                ChatStyle.textContent = [
                    "* {",
                    "   Box-Sizing: Border-Box;",
                    "}",
                    "Chat {",
                    "   Position: Absolute;",
                    "   Right: 0;",
                    "   Bottom: 0;",
                    "   ",
                    "   Display: Inline-Flex;",
                    "   Flex-Direction: Column;",
                    "   Width: 100%;",
                    "   Height: 100%;",
                    "}",
                    "",
                    "Chat > ChatHeader {",
                    "   Width: 100%;",
                    "   Height: 7.5%;",
                    "   ",
                    "   Padding: 1em;",
                    "   ",
                    "   BackGround: " + this.Theme + ";",
                    "   Border-Radius: 2em 2em 0 0;",
                    "}",
                    "",
                    "Chat > ChatHeader.Unread {",
                    "   Border-Bottom: Medium Solid LightGreen;",
                    "}",
                    "",
                    "Chat > ChatBody {",
                    "   Width: 100%;",
                    "   Height: 92.5%;",
                    "   ",
                    "   BackGround: #EEEEEE;",
                    "}",
                    "",
                    "Chat > ChatMessage {",
                    "   Display: Inline-Flex;",
                    "   Flex-Direction: Row;",
                    "   Align-Items: Center;",
                    "}",
                    "",
                    "Chat > ChatMessage > Img {",
                    "   Margin: 0 0.5em 0 0;",
                    "   ",
                    "   Border-Radius: 100%;",
                    "}",
                    "",
                    "Chat > ChatMessage > Div {",
                    "   Padding: 0.5em;",
                    "   BackGround: White;",
                    "}"
                ].join("\n");

            document.head.appendChild(ChatStyle);
        }
    }).bind(this)();

    (function () {
        this.Watchers[0] = {}, this.Watchers[0][0] = {
			value: null
		}, this.Watchers[0][1] = new DOM.Watcher.ChangeWatcher({
			Target: this.Watchers[0][0],
			Tick: 100,

			OnGetting: (function () {
				this.Watchers[0][0].value = this.Root.ConversationName;
			}).bind(this),

			OnChange: (function (Checker) {
				this.Header.textContent = Checker.newValue;
			}).bind(this)
		});

        DOM.Watcher.addChangeWatcher(this.Watchers[0][1]);
    }).bind(this)();

    DoesAppend ? (function () {
        this.enable();
    }).bind(this)() : (function () {

    })
}