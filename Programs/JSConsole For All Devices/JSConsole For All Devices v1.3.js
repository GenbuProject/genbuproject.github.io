/*/
 *#######################################################################
 *JSConsole For All Devices v1.3
 *Copyright (C) 2016-2020 Genbu Project All Rights Reversed.
 *#######################################################################
/*/
const JSCFAD = (function () {
	function JSCFAD (param) {
		JSCFAD.currentSelf = this;

		this.console = param.console || document.body;
		this.style = param.style || JSCFAD.HighlightStyle.DEFAULT,
		this.uuid = new DOM.Randomizer(DOM.Randomizer.TYPE.LEVEL3).generate(16);

		let commonStyle = new Style((() => {
			let style = {};
				style[`.JSCFAD_Log.${this.uuid}`] = {
					"Display": "Block",
					"Min-Height": "Calc(1rem + 4px)",

					"Background": this.style.Background.Log,
					"Border-Top": `Thin Solid Transparent`,
					"Border-Bottom": `Thin Solid Transparent`,
					"Border-Color": this.style.Border.Log,

					"White-Space": "Pre"
				}

				style[`.JSCFAD_Log--String.${this.uuid}`] = {
					"Color": this.style.String
				}

				style[`.JSCFAD_Log--Number.${this.uuid}`] = {
					"Color": this.style.Number
				}

				style[`.JSCFAD_Log--Array.${this.uuid}`] = {
					"Color": this.style.Array
				}

				style[`.JSCFAD_Log--Object.${this.uuid}`] = {
					"Color": this.style.Object
				}

				style[`.JSCFAD_Log--Error.${this.uuid}`] = {
					"Color": this.style.Error,

					"Background": this.style.Background.Error,
					"Border-Color": this.style.Border.Error
				}

				style[`.JSCFAD_Log--Arrow.${this.uuid}`] = {
					"Color": this.style.Arrow
				}
			
			return style;
		})()); commonStyle.setAttribute("UUID", this.uuid); document.head.appendChild(commonStyle);
	}; JSCFAD.prototype = Object.create(null, {
		log: { 
			value (Obj) {
				let Info = DOM("Div", {
					classes: ["JSCFAD_Log", this.uuid]
				});

				if ((Obj != false && !Obj)) {
					Info.textContent = Obj;
					Info.classList.add("JSCFAD_Log--Object");
				} else if (Obj.getClassName() == "String") { //String型
					Info.textContent = Obj;
					Info.classList.add("JSCFAD_Log--String");
				} else if (Obj.getClassName() == "Number") { //Number型
					Info.textContent = Obj;
					Info.classList.add("JSCFAD_Log--Number");
				} else if (Obj.getClassName() == "Array") { //Array型
					Info.applyProperties({
						classes: ["JSCFAD_Log--Array"],

						children: [
							DOM("Div", {
								text: Obj
							})
						]
					});
					
					for (var i = 0; i < Obj.length; i++) {
						Info.appendChild(
							DOM("Div", {
								children: [
									DOM("Span", {
										classes: ["JSCFAD_Log--Arrow", this.uuid],
										text: "==>"
									}),

									DOM("Span", {
										classes: [
											Obj[i].getClassName() == "String" || "Number" || "Array" || "Error" ? `JSCFAD_Log--${Obj[i].getClassName()}` : "JSCFAD_Log--Object",
											this.uuid
										],

										text: Obj[i]
									})
								]
							})
						);
					}
				} else if (Obj instanceof Error) { //Error型
					Info.textContent = Obj;
					Info.classList.add("JSCFAD_Log--Error");
				} else if (Obj.getClassName() == "Object") { //Object型
					Info.applyProperties({
						classes: ["JSCFAD_Log--Object"],
						
						children: [
							DOM("Div", {
								text: Obj
							})
						]
					});
					
					for (var Key in Obj) {
						Info.appendChild(
							DOM("Div", {
								children: [
									DOM("Span", {
										classes: ["JSCFAD_Log--Arrow", this.uuid],
										text: "==>"
									}),

									DOM("Span", {
										classes: [
											Obj[Key].getClassName() == "String" || "Number" || "Array" || "Error" ? `JSCFAD_Log--${Obj[Key].getClassName()}` : "JSCFAD_Log--Object",
											this.uuid
										],

										text: `${Key} = ${Obj[Key]}`
									})
								]
							})
						);
					}
				} else { //その他
					Info.textContent = Obj;
					Info.classList.add("JSCFAD_Log--Object");
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
			params.Arrow ? this.Arrow = params.Arrow : null,

			params.Background ? this.Background = params.Background : null,
			params.Border ? this.Border = params.Border : null;
		}; HighlightStyleElement.prototype = Object.create(Object.prototype, {
			constructor: { value: HighlightStyleElement },

			String: { value: "", configurable: true, writable: true, enumerable: true },
			Number: { value: "", configurable: true, writable: true, enumerable: true },
			Array: { value: "", configurable: true, writable: true, enumerable: true },
			Object: { value: "", configurable: true, writable: true, enumerable: true },
			Error: { value: "", configurable: true, writable: true, enumerable: true },
			Arrow: { value: "", configurable: true, writable: true, enumerable: true },

			Background: {
				value: {
					Log: "",
					Error: ""
				},
				
				configurable: true, writable: true, enumerable: true
			},

			Border: {
				value: {
					Log: "",
					Error: ""
				},
				
				configurable: true, writable: true, enumerable: true
			}
		});



		return HighlightStyleElement;
	})();



	JSCFAD.currentSelf = null;

	JSCFAD.HighlightStyle = {
		DEFAULT: new JSCFAD.HighlightStyleElement({
			String: "Orange",
			Number: "Blue",
			Array: "DarkGreen",
			Object: "LightSeaGreen",
			Error: "Red",
			
			Arrow: "LightCoral",

			Background: {
				Log: "White",
				Error: "Pink"
			},

			Border: {
				Log: "LightGray",
				Error: "HotPink"
			}
		})
	};



	return JSCFAD;
})();



window.Function.prototype.debug = function (args) {
	try {
		this.apply(this, args);
	} catch (Error) {
		let Info = DOM("Div", {
			classes: ["JSCFAD_Log", "JSCFAD_Log--Error", JSCFAD.currentSelf.uuid]
		});
		
		Info.innerHTML = Error.stack.replaces([
			[/</g, "&lt;"],
			[/>/g, "&gt;"],
			[/    /g, "\t"]
		]);
		
		JSCFAD.currentSelf.console.appendChild(Info);
		JSCFAD.currentSelf.console.scrollTo(0, JSCFAD.currentSelf.console.children[JSCFAD.currentSelf.console.children.length - 1].offsetTop);

		console.error(Error);
	}
}

"#{using} DOMExtender";