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