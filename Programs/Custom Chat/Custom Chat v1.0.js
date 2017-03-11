/*/
 *#######################################################################
 *Custom Chat v1.0
 *Copyright (C) 2017-2020 Genbu Project & Genbu Hase All Rights Reversed.
 *#######################################################################
/*/
let APIInfo = ["Custom Chat", "v1.0"];

const Chat = function (Args, DoesAppend) {
	Args = DOM.Util.Param(Args, {});

	this.Parent = DOM.Util.Param(Args.Parent, document.body);
	this.Theme = DOM.Util.Param(Args.Theme, "LightSeaGreen");

	this.Root = DOM("Chat");
	this.Root.conversationName = DOM.Util.Param(Args.Name, "Unknown");
	this.Root.faceUrl = null;
	this.Header = null,
	this.Body = null;
	this.InputArea = null;

	this.Watchers = [];

	this.enabled = false;

	this.enable = function () {
		if (!this.enabled) {
			this.enabled = true;
			this.Root.appendTo(this.Parent);

			this.appendStyle();
			this.addChatBase();
		}
	};
	
	this.disable = function () {
		if (this.enabled) {
			this.enabled = false;
			this.Root.dismiss();

			this.disableStyle();
		}
	};

	this.appendStyle = function () {
		this.disableStyle();

		let ChatStyle = new Style();
			ChatStyle.setAttribute("UUID", APIInfo[0] + " " + APIInfo[1] + " - ChatStyle");

			ChatStyle.textContent = [
				"* {",
				"   Font: " + 16 * (DOM.height / 640) + "px" + " 'メイリオ', Meiryo, Osaka;",
				"   Box-Sizing: Border-Box;",
				"}",
				"",
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
				"   Display: Flex;",
				"   Flex-Direction: Row;",
				"   Align-Items: Center;",
				"   Width: 100%;",
				"   Height: 7.5%;",
				"   ",
				"   Color: White;",
				"   Padding: 1em;",
				"   ",
				"   BackGround: " + this.Theme + ";",
				"   Border-Radius: 1em 1em 0 0;",
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
				"   Padding: 0.5em;",
				"   ",
				"   BackGround: #EEEEEE;",
				"   ",
				"   Overflow: Auto;",
				"}",
				"",
				"Chat > TextArea {",
				"   Min-Width: 100%;",
				"   Max-Width: 100%;",
				"   Width: 100%;",
				"   ",
				"   Min-Height: 10%;",
				"   Height: 10%;",
				"}",
				"",
				"ChatBody > ChatMessage {",
				"   Display: Flex;",
				"   Flex-Direction: Row;",
				"   Align-Items: Center;",
				"   ",
				"   Margin: 0 0 1em 0;",
				"}",
				"",
				"ChatBody > ChatMessage > Img {",
				"   Width: 2em;",
				"   Height: 2em;",
				"   ",
				"   Margin: 0 0.5em 0 0;",
				"   ",
				"   Border-Radius: 100%;",
				"}",
				"",
				"ChatBody > ChatMessage > Div {",
				"   Padding: 0.5em;",
				"   ",
				"   BackGround: White;",
				"   Border-Radius: 0 0.5em 0 0.5em;",
				"   ",
				"   White-Space: Pre-Wrap;",
				"}"
			].join("\n");

		document.head.appendChild(ChatStyle);
	};

	this.disableStyle = function () {
		for (let i = 0; i < DOM(":Style").length; i++) {
			if (DOM(":Style")[i].attributes["UUID"] == APIInfo[0] + " " + APIInfo[1] + " - ChatStyle") {
				DOM(":Style")[i].dismiss();
			}
		}
	};

	this.addChatBase = function () {
		this.Header = DOM("ChatHeader"), this.Header.appendTo(this.Root);
		this.Body = DOM("ChatBody"), this.Body.appendTo(this.Root);

		this.InputArea = DOM("TextArea", {
			Events: {
				"keydown": (function (Event) {
					switch (Event.keyCode) {
						case 9:
							Event.preventDefault();
							
							let Pos = Event.target.selectionStart;
							
				   			Event.target.value = Event.target.value.substr(0, Event.target.selectionStart) + "\t" + Event.target.value.substr(Event.target.selectionStart, Event.target.value.length);
							Event.target.setSelectionRange(Pos + 1, Pos + 1);
							
							break;

						case 13:
							if (!Event.shiftKey) {
								Event.preventDefault();

								if (this.InputArea.value) {
									this.addChatMessage(this.InputArea.value);

									this.InputArea.value = "";
								}
							}

							break;
					}
				}).bind(this)
			}
		}), this.InputArea.appendTo(this.Root);
	};

	this.addChatMessage = function (Message) {
		let Elem = DOM("ChatMessage", {
			Children: [
				new Image(),
				DOM("Div")
			]
		});

		Elem.children[0].src = this.Root.faceUrl ? this.Root.faceUrl : "https://lh5.googleusercontent.com/-YmSg3V069TE/AAAAAAAAAAI/AAAAAAAAI3s/dHZ2LeAPaW4/photo.jpg";
		Elem.children[1].textContent = Message;

		Elem.appendTo(this.Body);
	};

	(function () {
		this.Watchers[0] = {}, this.Watchers[0][0] = {
			value: null
		}, this.Watchers[0][1] = new DOM.Watcher.ChangeWatcher({
			Target: this.Watchers[0][0],
			Tick: 100,

			OnGetting: (function () {
				this.Watchers[0][0].value = this.Root.conversationName;
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
};

"use DOMExtender";