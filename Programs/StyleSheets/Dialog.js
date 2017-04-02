let self = this;

self["Dialog.js"] = {};
self["Dialog.js"].HTMLDialogElement = Object.create(HTMLElement.prototype, {
	dialogTitle: { writable: true, enumerable: true },
	dialogContent: { writable: true, enumerable: true },
	dialogColor: { writable: true, enumerable: true },

	width: { writable: true, enumerable: true },
	height: { writable: true, enumerable: true },
	root: { writable: true, enumerable: true },
	footer: { writable: true, enumerable: true },

	showed: { writable: true, enumerable: true },

	show: {
		value: function () {
			if (!this.showed) {
				this.applyConfig();
				this.root.appendChild(this);
			}
		}
	},

	dismiss: {
		value: function () {
			if (this.showed) {
				this.parentElement.removeChild(this);
			}
		}
	},

	reset: {
		value: function () {
			this.dismiss();
			this.show();
		}
	},

	applyConfig: {
		value: function () {
			this.style.width = this.width + "px",
			this.style.height = this.height + "px",
			this.style.left = window.innerWidth / 2 - this.width / 2 + "px",
			this.style.top = window.innerHeight / 2 - this.height / 2 + "px",

			this.children[0].style.borderColor = this.dialogColor,
			this.children[1].style.borderColor = this.dialogColor,
			this.children[2].style.borderColor = this.dialogColor,

			this.children[0].textContent = this.dialogTitle,
			this.children[1].textContent = this.dialogContent;
		}
	},



	createdCallback: {
		value: function () {
			this.dialogTitle = "",
			this.dialogContent = "",
			this.dialogColor = "DarkOrange",

			this.width = window.innerWidth / 3,
			this.height = window.innerHeight / 1.5,
			this.root = document.body,
			this.footer = new self["Dialog.js"].Dialog.Footer(),

			this.showed = false;

			this.appendChild(new self["Dialog.js"].Dialog.Title()),
			this.appendChild(new self["Dialog.js"].Dialog.Content()),
			this.appendChild(this.footer);

			this.applyConfig();
		}
	},

	attachedCallback: {
		value: function () {
			this.showed = true;
		}
	},

	detachedCallback: {
		value: function () {
			this.showed = false;
		}
	},

	attributeChangedCallback: {
		value: function (Attr, OldVal, NewVal) {
			
		}
	}
});

self["Dialog.js"].Dialog = document.registerElement("DialogJs-Dialog", {
	prototype: self["Dialog.js"].HTMLDialogElement
});

self["Dialog.js"].Dialog.Title = document.registerElement("DialogJs-DialogTitle", {});
self["Dialog.js"].Dialog.Content = document.registerElement("DialogJs-DialogContent", {});
self["Dialog.js"].Dialog.Footer = document.registerElement("DialogJs-DialogFooter", {});



self["Dialog.js"].appendStyle = function () {
	if (!document.querySelector('Style[UUID="Dialog.js - DialogStyle"]')) {
		let Style = document.createElement("Style");
			Style.setAttribute("UUID", "Dialog.js - DialogStyle");

			Style.textContent = [
				"DialogJs-Dialog {",
				"	Position: Fixed;",
				"	Z-Index: 100;",
				"	",
				"	Display: Flex;",
				"	Flex-Direction: Column;",
				"}",
				"",
				"DialogJs-DialogTitle, DialogJs-DialogContent, DialogJs-DialogFooter {",
				"	Border: Thin Solid Black;",
				"}",
				"",
				"DialogJs-DialogTitle, DialogJs-DialogContent {",
				"	Display: Block;",
				"}",
				"",
				"DialogJs-DialogTitle {",
				"	Height: 10%;",
				"	",
				"	Padding: 1em 1em 0 1em;",
				"	Border-Radius: 1em 1em 0 0;",
				"}",
				"",
				"DialogJs-DialogContent {",
				"	Flex: 1;",
				"	",
				"	Padding: 1em;",
				"}",
				"",
				"DialogJs-DialogFooter {",
				"	Display: Flex;",
				"	Flex-Direction: Row;",
				"	Height: 10%;",
				"}"
			].join("\r\n");

		document.head.appendChild(Style);
	}
};

self["Dialog.js"].removeStyle = function () {
	document.querySelector('Style[UUID="Dialog.js - DialogStyle"]') ? document.querySelector('Style[UUID="Dialog.js - DialogStyle"]').remove() : null;
};



self["Dialog.js"].appendStyle();