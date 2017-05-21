/*/
 *#######################################################################
 *JSConsole For All Devices v1.3
 *Copyright (C) 2016-2020 Genbu Project & Genbu Hase All Rights Reversed.
 *#######################################################################
/*/
const JSCFAD = (function () {
	function JSCFAD (param) {
		JSCFAD.self = this;

		this.console = param.console || document.body;
		this.style = param.style || JSCFAD.HighlightStyle.DEFAULT;
	}; JSCFAD.prototype = Object.create(null, {
		log: { 
			value (Obj) {
				let Info = DOM("Div", {
					Styles: {
						"Display": "Block",
						"White-Space": "Pre"
					}
				});

				if (Obj.getClassName() == "String") { //String型
					Info.innerHTML = "<Span Style = '" + InlineStyle({"Color": this.style.String}) + "'>" + Obj + "</Span>";
				} else if (Obj.getClassName() == "Number") { //Number型
					Info.innerHTML = "<Span Style = '" + InlineStyle({"Color": this.style.Number}) + "'>" + Obj + "</Span>";
				} else if (Obj.getClassName() == "Array") { //Array型
					let Result = ["<Span Style = '" + InlineStyle({"Color": this.style.Array}) + "'>" + Obj + "</Span>"];
					
					for (var i = 0; i < Obj.length; i++) {
						Result.push([
							"<Span Style = '" + InlineStyle({"Color": this.style.Arrow}) + "'>==></Span>",
							"<Span Style = '" + (typeof Obj[i] == "string" ? InlineStyle({"Color": this.style.String}) : typeof Obj[i] == "number" ? InlineStyle({"Color": this.style.Number}) : (Obj[i] instanceof Array && Array.isArray(Obj[i])) ? InlineStyle({"Color": this.style.Array}) : Obj[i] instanceof Error ? InlineStyle({"Color": this.style.Error}) : (Obj[i] instanceof Object && !Array.isArray(Obj[i])) ? InlineStyle({"Color": this.style.Object}) : InlineStyle({"Color": this.style.Object})) + "'>" + Obj[i] + "</Span>"
						].join("\t"));
					}
					
					Info.innerHTML = Result.join("\n");
				} else if (Obj instanceof Error) { //Error型
					Info.innerHTML = "<Span Style = '" + InlineStyle({"Color": this.style.Error}) + "'>" + Obj + "</Span>";
				} else if (Obj.getClassName() == "Object") { //Object型
					let Result = ["<Span Style = '" + InlineStyle({"Color": this.style.Object}) + "'>" + Obj + "</Span>"];
					
					for (var Key in Obj) {
						Result.push([
							"<Span Style = '" + InlineStyle({"Color": this.style.Arrow}) + "'>==></Span>",
							"<Span Style = '" + InlineStyle({"Color": this.style.String}) + "'>" + Key + "</Span>"
						].join("\t"));
					}
					
					Info.innerHTML = Result.join("\n");
				} else { //その他
					Info.innerHTML = "<Span Style = '" + InlineStyle({"Color": this.style.Object}) + "'>" + Obj + "</Span>";
				}

				this.console.appendChild(Info);
				this.console.scrollTo(0, this.console.children[this.console.children.length - 1].offsetTop);
			}
		}
	});



	JSCFAD.HighlightStyleElement = (function () {
		function HighlightStyleElement (params) {
			params.String ? this.String = params.String : null,
			params.Number ? this.Number = params.Number : null,
			params.Array ? this.Array = params.Array : null,
			params.Object ? this.Object = params.Object : null,
			params.Error ? this.Error = params.Error : null,
			params.Arrow ? this.Arrow = params.Arrow : null;
		}; HighlightStyleElement.prototype = Object.create(Object.prototype, {
			constructor: { value: HighlightStyleElement },

			String: { value: "", configurable: true, writable: true, enumerable: true },
			Number: { value: "", configurable: true, writable: true, enumerable: true },
			Array: { value: "", configurable: true, writable: true, enumerable: true },
			Object: { value: "", configurable: true, writable: true, enumerable: true },
			Error: { value: "", configurable: true, writable: true, enumerable: true },
			Arrow: { value: "", configurable: true, writable: true, enumerable: true }
		});



		return HighlightStyleElement;
	})();



	JSCFAD.self = null;

	JSCFAD.HighlightStyle = {
		DEFAULT: new JSCFAD.HighlightStyleElement({
			String: "Orange",
			Number: "Blue",
			Array: "LightGreen",
			Object: "LightSeaGreen",
			Error: "Red",
			
			Arrow: "LightCoral"
		})
	};



	return JSCFAD;
})();



window.Function.prototype.debug = function (args) {
	try {
		this.apply(this, args);
	} catch (Error) {
		let Info = DOM("Span", {
			Styles: {
				"Display": "Block",
				"White-Space": "Pre",
				
				"Color": JSCFAD.self.style.Error
			}
		});
		
		Info.innerHTML = Error.stack.replaces([
			[/</g, "&lt;"],
			[/>/g, "&gt;"],
			[/    /g, "\t"]
		]);
		
		JSCFAD.self.console.appendChild(Info);
		JSCFAD.self.console.scrollTo(0, JSCFAD.self.console.children[JSCFAD.self.console.children.length - 1].offsetTop);
	}
}

"use DOMExtender";