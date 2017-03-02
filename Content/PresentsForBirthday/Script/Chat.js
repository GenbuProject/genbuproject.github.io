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

    this.enabled = false;

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
                    "@Media Screen and (Min-Width: 0px) {",
                    "   Chat {",
                    "       Width: 100%;",
                    "       Height: 100%;",
                    "   }",
                    "}",
                    "",
                    /*"@Media Screen and (Min-Width: 640px) {",
                    "   Chat {",
                    "      Width: 30%;",
                    "      Height: 90%;",
                    "   }",
                    "}",
                    "",*/
                    "Chat {",
                    "   Position: Absolute;",
                    "   Right: 0;",
                    "   Bottom: 0;",
                    "   ",
                    "   Display: Inline-Flex;",
                    "   ",
                    "   BackGround: LightGray;",
                    "   Border-Radius: 2.5%;",
                    "}",
                    "",
                    "Chat < ChatTitle {",
                    "   Width: 100%;",
                    "   ",
                    "   BackGround: " + this.Theme + ";",
                    "}"
                ].join("\n");

            document.head.appendChild(ChatStyle);
        }
    }).bind(this)();

    (function () {
        /*screen.orientation.addEventListener("change", (function (Event) {
            switch (Event.target.type) {
                case "landscape-primary":
                    Event.target.angle > 45 ? document.documentElement.style.transform = "Rotate(90deg)" : "Rotate(0deg)";
                    document.documentElement.style.overflow = "Hidden";

                    scrollBy(1000, 1000);

                    break;

                default:
                    document.documentElement.style.transform = "Rotate(0deg)";
                    document.documentElement.style.overflow = "";

                    break;
            }
        }).bind(this));*/

        try {
            screen.orientation.lock("portrait-primary");
        } catch (Error) {
            console.log("This device is PC");
        }
    }).bind(this)();

    this.Root = DOM("Chat");

    this.enable = function () {
        if (!this.enabled) {
            this.enabled = true;
            this.Root.appendTo(this.Parent);
        }
    }, Object.defineProperty(this, "enable", {
        writable: false,
        configurable: false
    });
    
    this.disable = function () {
        if (this.enabled) {
            this.enabled = false;
            this.Root.dismiss();
        }
    }, Object.defineProperty(this, "disable", {
        writable: false,
        configurable: false
    });

    this.addChatMessage = function (Message) {
        let Elem = DOM("ChatMessage");

    }, Object.defineProperty(this, "addChatMessage", {
        writable: false,
        configurable: false
    });

    DoesAppend ? (function () {
        this.enable();
    }).bind(this)() : (function () {

    })
}