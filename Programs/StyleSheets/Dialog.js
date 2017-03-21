window["Dialog.js"] = {};
window["Dialog.js"].Dialog = function (Args, DoesAppend) {
	Args = Args ? Args : {};

	this.dialogTitle = Args.Title ? Args.Title : "";
	this.dialogContent = Args.Content ? Args.Content : "";
	this.dialogFooter = Args.Footer ? Args.Footer : null;
	this.dialogWidth = Args.Width ? Args.Width : window.innerWidth / 3;
	this.dialogHeight = Args.Height ? Args.Height : window.innerHeight / 1.5;
	this.dialogTheme = Args.Theme ? Args.Theme : "White";

	this.dialog = document.createElement("DialogJs-Dialog");

	DoesAppend ? (function () {
		this.show();
	}).bind(this)() : null;
}, window["Dialog.js"].Dialog.prototype = Object.create(null, {
	show: {
		value: function () {
			this.appendStyle();

			this.dialog.style.width = this.dialogWidth + "px",
			this.dialog.style.height = this.dialogHeight + "px",
			this.dialog.style.left = (window.innerWidth - this.dialogWidth) / 2 + "px",
			this.dialog.style.top = (window.innerHeight - this.dialogHeight) / 2 + "px";

			document.body.appendChild(this.dialog);
		},

		configurable: false,
		writable: false,
		enumerable: false
	},

	dismiss: {
		value: function () {
			this.dismissStyle();
			this.dialog.parentElement.removeChild(this.dialog);
		},

		configurable: false,
		writable: false,
		enumerable: false
	},

	appendStyle: {
		value: function () {
			this.dismissStyle();

			let DialogStyle = document.createElement("Style");
				DialogStyle.setAttribute("UUID", "Dialog.js - DialogStyle");

				DialogStyle.textContent = [
					"DialogJs-Dialog {",
					"	Position: Absolute;",
					"	",
					"	Display: Flex;",
					"	Flex-Direction: Column;",
					"}"
				].join("\n");

			document.head.appendChild(DialogStyle);
		},

		configurable: false,
		writable: false,
		enumerable: false
	},

	dismissStyle: {
		value: function () {
			for (let i = 0; i < document.getElementsByTagName("Style").length; i++) {
				if (document.getElementsByTagName("Style")[i].getAttribute("UUID") == "Dialog.js - DialogStyle") {
					document.getElementsByTagName("Style")[i].dismiss();
				}
			}
		},

		configurable: false,
		writable: false,
		enumerable: false
	}
});

window["Dialog.js"].Dialog.Footer = function (Children) {
	this.footerContents = Children ? Children : [];
	this.footer = document.createElement("DialogJs-Footer");
}