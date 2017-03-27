window["Dialog.js"] = {};
window["Dialog.js"].HTMLDialogElement = Object.create(HTMLElement.prototype, {
	title: { value: "" },
	content: { value: "" },
	theme: { value: "LightSeaGreen" },
	width: { value: window.innerWidth / 3 },
	height: { value: window.innerHeight / 1.5 },

	show: {
		value: function () {
			
		},

		configurable: false,
		writable: false,
		enumerable: false
	}
});

window["Dialog.js"].Dialog = document.registerElement("DialogJs-Dialog", {
	prototype: window["Dialog.js"].HTMLDialogElement
});