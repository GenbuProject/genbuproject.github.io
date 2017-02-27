/*/
 *#######################################################################
 *JSConsole For All Devices v1.2
 *Copyright (C) 2016-2020 Genbu Project & Genbu Hase All Rights Reversed.
 *#######################################################################
/*/
(function () {
	let DOMExtender = (function () {
		let Elem = document.createElement("Script");
			Elem.src = "https://genbuproject.github.io/Programs/DOM%20Extender/DOM%20Extender.js";
			
		return Elem;
	})();
	
	document.head.appendChild(DOMExtender);
})();

(function () {
	window.JSCFAD = function (Args) {
		window.JSCFAD.self = this;
		
		this.Console = Args.Console ? Args.Console : document.body;
		this.Style = Args.Style ? (function () {
			return Args.Style;
		})() : (function () {
			return JSCFAD.Style.DEFAULT;
		})();
		
		this.log = function (Obj) {
			if (typeof Obj == "string") { //String型
				(function () {
					let Info = DOM("Div", {
						Styles: {
							"Display": "Block",
							"White-Space": "Pre"
						}
					});
					
					Info.innerHTML = "<Span Style = '" + InlineStyle({"Color": JSCFAD.self.Style.String}) + "'>" + Obj + "</Span>";
					JSCFAD.self.Console.appendChild(Info);
				})();
			} else if (typeof Obj == "number") { //Number型
				(function () {
					let Info = DOM("Div", {
						Styles: {
							"Display": "Block",
							"White-Space": "Pre"
						}
					});
					
					Info.innerHTML = "<Span Style = '" + InlineStyle({"Color": JSCFAD.self.Style.Number}) + "'>" + Obj + "</Span>";
					JSCFAD.self.Console.appendChild(Info);
				})();
			} else if (Obj instanceof Array && Array.isArray(Obj)) { //Array型
				(function () {
					let Info = DOM("Div", {
						Styles: {
							"Display": "Block",
							"White-Space": "Pre"
						}
					});
					
					let Result = ["<Span Style = '" + InlineStyle({"Color": JSCFAD.self.Style.Array}) + "'>" + Obj + "</Span>"];
					
					for (var i = 0; i < Obj.length; i++) {
						Result.push([
							"<Span Style = '" + InlineStyle({"Color": JSCFAD.self.Style.Arrow}) + "'>==></Span>",
							"<Span Style = '" + (typeof Obj[i] == "string" ? InlineStyle({"Color": JSCFAD.self.Style.String}) : typeof Obj[i] == "number" ? InlineStyle({"Color": JSCFAD.self.Style.Number}) : (Obj[i] instanceof Array && Array.isArray(Obj[i])) ? InlineStyle({"Color": JSCFAD.self.Style.Array}) : Obj[i] instanceof Error ? InlineStyle({"Color": JSCFAD.self.Style.Error}) : (Obj[i] instanceof Object && !Array.isArray(Obj[i])) ? InlineStyle({"Color": JSCFAD.self.Style.Object}) : InlineStyle({"Color": JSCFAD.self.Style.Object})) + "'>" + Obj[i] + "</Span>"
						].join("\t"));
					}
					
					Info.innerHTML = Result.join("\n");
					JSCFAD.self.Console.appendChild(Info);
				})();
			} else if (Obj instanceof Error) { //Error型
				(function () {
					let Info = DOM("Div", {
						Styles: {
							"Display": "Block",
							"White-Space": "Pre"
						}
					});
					
					Info.innerHTML = "<Span Style = '" + InlineStyle({"Color": JSCFAD.self.Style.Error}) + "'>" + Obj + "</Span>";
					JSCFAD.self.Console.appendChild(Info);
				})();
			} else if (Obj instanceof Object && !Array.isArray(Obj)) { //Object型
				(function () {
					let Info = DOM("Div", {
						Styles: {
							"Display": "Block",
							"White-Space": "Pre"
						}
					});
					
					let Result = ["<Span Style = '" + InlineStyle({"Color": JSCFAD.self.Style.Object}) + "'>" + Obj + "</Span>"];
					
					for (var Key in Obj) {
						Result.push([
							"<Span Style = '" + InlineStyle({"Color": JSCFAD.self.Style.Arrow}) + "'>==></Span>",
							"<Span Style = '" + InlineStyle({"Color": JSCFAD.self.Style.String}) + "'>" + Key + "</Span>"
						].join("\t"));
					}
					
					Info.innerHTML = Result.join("\n");
					JSCFAD.self.Console.appendChild(Info);
				})();
			} else { //その他
				(function () {
					let Info = DOM("Div", {
						Styles: {
							"Display": "Block",
							"White-Space": "Pre"
						}
					});
					
					Info.innerHTML = "<Span Style = '" + InlineStyle({"Color": JSCFAD.self.Style.Object}) + "'>" + Obj + "</Span>";
					JSCFAD.self.Console.appendChild(Info);
				})();
			}
		}
		
		window.Function.prototype.debug = function (Args) {
			try {
				this.apply(this, Args ? Args : null);
			} catch (Error) {
				let Info = DOM("Span", {
					Styles: {
						"Display": "Block",
						"White-Space": "Pre",
						
						"Color": JSCFAD.self.Style.Error
					}
				});
				
				Info.innerHTML = Error.stack.replaces([
					[/</g, "&lt;"],
					[/>/g, "&gt;"],
					[/    /g, "\t"]
				]);
				
				JSCFAD.self.Console.appendChild(Info);
			}
		}
	}
	
	window.JSCFAD.Style = {
		DEFAULT: {
			String: "Orange",
			Number: "Blue",
			Array: "LightGreen",
			Object: "LightSeaGreen",
			Error: "Red",
			
			Arrow: "LightCoral"
		}
	}
})();