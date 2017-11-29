/*/
 *###########################################################################
 *#Explorer.js v1
 *#Copyright (C) 2017 Genbu Project All Rights Reserved.
 *###########################################################################
/*/
(function () {
	let Style = document.createElement("Style");
		Style.textContent = (function () {
			let Reader = new XMLHttpRequest();
				Reader.open("GET", "https://genbuproject.github.io/Programs/StyleSheets/Explorer/v1.css", false);
				Reader.send(null);
				
			return Reader.response;
		})();

	document.head.appendChild(Style);
})();

const DB = {
	Save: function (FileName, Content) {
		let Data = new Blob([Content], {
			type: "Text/Plain"
		});
		
		if (window.navigator.msSaveBlob) {
			window.navigator.msSaveBlob(Data, FileName);
		} else {
			Link = document.createElement("A");
			Link.href = URL.createObjectURL(Data);
			Link.download = FileName;
			Link.target = "_blank";
			
			let Click = document.createEvent("MouseEvents");
				Click.initEvent("click", false, true);
				
			Link.dispatchEvent(Click);
			
			URL.revokeObjectURL(Data);
		}
	},
	
	Load: function (Extension, OnLoad) {
		let Click = document.createEvent("MouseEvents");
			Click.initEvent("click", false, true);
			
		let Filer = document.createElement("Input");
			Filer.type = "File";
			Filer.accept = Extension;
			
			Filer.addEventListener("change", function (Event) {
				let Reader = new FileReader();
					Reader.readAsText(Event.target.files[0]);
					
					Reader.onload = function (Event) {
						OnLoad(Event);
					}
			});
			
			Filer.dispatchEvent(Click);
	}
};

window["Explorer.js"] = {};
window["Explorer.js"].init = function () {
	for (let i = 0; i < document.querySelectorAll("Table.Explorer TBody TR > TD").length; i++) {
		document.querySelectorAll("Table.Explorer TBody TR > TD")[i].onclick = function () {
			document.querySelectorAll("Table.Explorer TBody TR > TD").forEach(function (Elem, Index, Parent) {
				if (i - (i % document.querySelectorAll("Table.Explorer TBody TR > TD")[Index].parentElement.cells.length) <= Index && Index < i - (i % document.querySelectorAll("Table.Explorer TBody TR > TD")[Index].parentElement.cells.length) + document.querySelectorAll("Table.Explorer TBody TR > TD")[Index].parentElement.cells.length) {
					
				} else {
					if (Index % document.querySelectorAll("Table.Explorer TBody TR > TD")[Index].parentElement.cells.length == 0) {
						document.querySelectorAll("Table.Explorer TBody TR > TD")[Index].parentElement.className = "";
					}
				}
			});

			switch (document.querySelectorAll("Table.Explorer TBody TR > TD")[i].parentElement.className) {
				default:
					document.querySelectorAll("Table.Explorer TBody TR > TD")[i].parentElement.className = "Selected";
					break;

				case "Selected":
					DB.Save(document.querySelectorAll("Table.Explorer TBody TR > TD")[i].parentElement.getAttribute("FileName"), (function () {
						let Reader = new XMLHttpRequest();
							Reader.open("GET", document.querySelectorAll("Table.Explorer TBody TR > TD")[i].parentElement.getAttribute("Path"), false);
							Reader.send(null);
							
						return Reader.response;
					})());
					
					break;
			}
		}
	}
}

setTimeout(function (Event) {
	window["Explorer.js"].init();
}, 500);