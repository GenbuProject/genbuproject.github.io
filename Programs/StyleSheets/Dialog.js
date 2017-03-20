(function () {
	let Style = document.createElement("Style");
		Style.textContent = (function () {
			let Reader = new XMLHttpRequest();
				Reader.open("GET", "https://genbuproject.github.io/Programs/StyleSheets/Dialog.css", false);
				Reader.send(null);
				
			return Reader.response;
		})();

	document.head.appendChild(Style);
})();

window["Dialog.js"] = {};
window["Dialog.js"].Dialog = function (Args) {
	Args = Args ? Args : {};
	
	this.dialogTitle = Args.Title ? Args.Title : "";
	this.dialogContents = Args.Contents ? Args.Contents : "";
	this.dialogFooter = Args.Footer ? Args.Footer : null;
	this.dialogWidth = Args.Width ? Args.Width : window.innerWidth / 3;
	this.dialogHeight = Args.Height ? Args.Height : window.innerHeight / 1.5;

	this.dialog = document.createElement("DialogJs-Dialog");
}

window["Dialog.js"].Dialog.Footer = function (Children) {
	this.footerContents = Children ? Children : [];
	this.footer = document.createElement("DialogJs-Footer");
}