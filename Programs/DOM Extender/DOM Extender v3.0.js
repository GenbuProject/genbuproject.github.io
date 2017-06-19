/*/
 *#######################################################################
 *DOM Extender v3.0
 *Copyright (C) 2016-2020 Genbu Project & Genbu Hase All Rights Reversed.
 *#######################################################################
/*/
const DOM = (function () {
	/**
	 * セレクタ($1)に応じてDOM要素を返す
	 * 
	 * ($1) セレクタ
	 * => {:elemName} … elemName要素を生成
	 * => #{:elemName} … IDがelemNameの要素を返す
	 * => .{:elemName} … elemNameクラスの要素を返す
	 * => *{:elemName} … NameがelemNameの要素を返す
	 * => :{:elemName} … elemName要素を返す
	 * => ${:elemName} … elemNameセレクタの1要素を返す
	 * => @{:elemName} … elemNameセレクタの要素を返す
	 * 
	 * @param {string} selectorStr
	 */
	const DOM = function (selectorStr) {
		selectorStr = selectorStr || "";

		let elem = null;

		switch (selectorStr.substr(0, 1)) {
			default:
				try {
					elem = document.createElement(selectorStr);
				} catch (Err) {
					throw new SyntaxError("The selector includes invalid characters.");
				}

				break;

			case "#":
				elem = document.getElementById(selectorStr.slice(1));
				break;

			case ".":
				elem = document.getElementsByClassName(selectorStr.slice(1));
				break;

			case "*":
				elem = document.getElementsByName(selectorStr.slice(1));
				break;

			case ":":
				elem = document.getElementsByTagName(selectorStr.slice(1));
				break;

			case "$":
				elem = document.querySelector(selectorStr.slice(1));
				break;

			case "@":
				elem = document.querySelectorAll(selectorStr.slice(1));
				break;
		}

		return elem;
	}; Object.defineProperties(DOM, {
		name: { value: "DOM Extender" },
		version: { value: 3.0 },

		xhr: {
			/**
			 * @param {object} option
			 */
			value (option) {
				option = option || {};

				let connector = new XMLHttpRequest();
					connector.open(option.type || "GET", option.url || location.href + (option.params ? "?" + (function () {
						let param = [];

						for (let paramName in option.params) {
							param.push(paramName + "=" + option.params[paramName]);
						}

						return param.join("&");
					})() : ""), option.doesSync != undefined ? option.doesSync : true);

					!option.headers || (function () {
						for (let headerName in option.headers) {
							connector.setRequestHeader(headerName, option.headers[headerName]);
						}
					})();

					connector.onload = option.onLoad || function (event) {};
					connector.send(option.data);

				return connector;
			},

			enumerable: true
		},

		jsonp: {
			/**
			 * @param {object} option
			 */
			value (option) {
				option = option || {};

				let param = [];

				!option.params || (function () {
					for (let paramName in option.params) {
						param.push(paramName + "=" + option.params[paramName]);
					}
				})();

				let elem = document.createElement("Script");
					elem.src = (option.url || location.href) + (option.params ? "?" + param.join("&") : "");
					
					elem.onload = function (event) {
						elem.parentElement.removeChild(elem);
					}
					
				document.head.appendChild(elem);
			},

			enumerable: true
		},
		
		rest: {
			value: (function () {
				/**
				 * @param {object} option
				 */
				function rest (option) {
					option = option || {};

					return this.xhr({
						type: option.type,
						url: option.url,
						doesSync: option.doesSync,

						headers: option.headers,
						params: option.params,
						data: option.data,

						onLoad (event) {
							!option.onLoad || option.onLoad(eval(event.target.response));
						}
					});
				}; Object.defineProperties(rest, {
					calcResources: {
						/**
						 * @param {ProgressEvent} eventObj
						 */
						value (eventObj) {
							/**
							 * @type {Location}
							 */
							let loc = JSON.parse(JSON.stringify(window.location));
								loc.__proto__ = Location.prototype;
								
								loc.href = eventObj.target.responseURL;
								loc.protocol = loc.href.match(/(https|http|file|ftp):\/\/\/?/g)[0];
								loc.pathname = "/" + loc.href.split(/\//g)[loc.href.split(/\//g).length - 1].split("?")[0];
								loc.search = "?" + loc.href.split(/\//g)[loc.href.split(/\//g).length - 1].split("?")[1];
								
								loc.origin = loc.href.replaces([[loc.pathname, ""], [loc.search, ""]]);
								loc.host = loc.href.replaces([[loc.protocol, ""], [loc.pathname, ""], [loc.search, ""]]);
								loc.port = loc.host.split(":")[1] ? loc.host.split(":")[1] : "";
								loc.hostname = loc.host.replace(":" + loc.port, "");
								
							return loc;
						},

						enumerable: true
					}
				});

				return rest;
			})(),

			enumerable: true
		},

		import: {
			/**
			 * @param {string} url
			 * @param {function} onLoad
			 */
			value (url, onLoad) {
				this.xhr({
					type: "GET",
					url: url,
					doesSync: true,

					onLoad: function (event1) {
						if (event1.target.response.match("#{using} DOMExtender")) {
							let elem = DOM("Script");
								elem.src = event1.target.responseURL;

								elem.onload = elem.onreadystatechange = function (event2) {
									if (!event2.target.readyState || event2.target.readyState == "loaded" || event2.target.readyState == "complete") {
										!onLoad || onLoad();
									}
								}

							DOM(":Head")[0].appendChild(elem);
						} else {
							throw new EvalError("Please load the code for DOM Extender!")
						}
					}
				});
			},

			enumerable: true
		},



		Watcher: {
			value: (function () {
				let watchers = [];

				/**
				 * @param {object} option
				 */
				function Watcher (option) {
					option = option || {};

					this.setTarget(option.target || { value: null });
					this.setWatchTick(option.tick || 1);
					this.onGet = option.onGet || function () {};
					this.onChange = option.onChange || function (watcher) {};
				}; Watcher.prototype = Object.create(null, {
					constructor: { value: Watcher },

					watcherID: { value: [0, 0], configurable: true, writable: true, enumerable: true },
					watchTick: { value: [0, 0], configurable: true, writable: true, enumerable: true },
					target: { value: { value: null }, configurable: true, writable: true, enumerable: true },
					oldValue: { value: 0, configurable: true, writable: true, enumerable: true },
					newValue: { value: 0, configurable: true, writable: true, enumerable: true },
					onGet: { value: function () {}, configurable: true, writable: true, enumerable: true },
					onChange: { value: function (watcher) {}, configurable: true, writable: true, enumerable: true },

					setWatchTick: {
						/**
						 * @param {number} tick
						 */
						value (tick) { this.watchTick = tick }, enumerable: true
					},

					setTarget: {
						/**
						 * @param {object} target
						 */
						value (target) { this.target = target }, enumerable: true
					}
				}); Object.defineProperties(Watcher, {
					addWatcher: {
						value (watcher) {
							watcher.watcherID[0] = setInterval(function () {
								watcher.newValue = watcher.target.value;
								
								if (watcher.oldValue !== watcher.newValue) {
									watcher.onChange(watcher);
									watcher.oldValue = watcher.newValue;
								}
							}, watcher.watchTick);
							
							watcher.oldValue = watcher.target.value,
							watcher.newValue = watcher.target.value;
							
							watchers.push(watcher);
							watchers[watchers.length - 1].watcherID[1] = watchers.length - 1;
							
							watcher.watcherID[810] = setInterval(watcher.onGet || function () {}, watcher.watchTick);
							
							return watcher;
						},

						enumerable: true
					},

					removeWatcher: {
						value (watcher) {
							clearInterval(watcher.watcherID[0]);
							clearInterval(watcher.watcherID[810]);
							
							watchers.slice(watcher.watcherID[1], 1);
						},

						enumerable: true
					}
				});

				return Watcher;
			})(),

			enumerable: true
		},

		Randomizer: {
			value: (function () {
				function Randomizer (type) {
					this.currentType = !type || this.TYPE[Symbol.keyFor(type)];
				}; Randomizer.prototype = Object.create(null, {
					constructor: { value: Randomizer },
					
					TYPE: { value: DOM.Randomizer.TYPE, configurable: true, writable: true, enumerable: true },
					CHARMAP: { value: DOM.Randomizer.CHARMAP, configurable: true, writable: true, enumerable: true },

					currentType: { value: this.TYPE.LEVEL3, configurable: true, writable: true, enumerable: true }
				});

				return Randomizer;
			})(),

			enumerable: true
		}
	});



	/*DOM.InvalidSelectorError = (function () {
		function InvalidSelectorError (message) {
			this.name = "InvalidSelector";
			this.message = message || "Syntax of selector is invalid";

			Error.captureStackTrace(this);
		}; InvalidSelectorError.prototype = SyntaxError.prototype;

		return InvalidSelectorError;
	})();*/



	return DOM;
})();



(function () {
	window.DOM.Randomizer = function (Type) {
		this.TYPE = DOM.Randomizer.TYPE,
		this.CHARMAP = DOM.Randomizer.CHARMAP;

		this.currentType = Type ? this.TYPE[Symbol.keyFor(Type)] : this.TYPE.LEVEL3;
	}, window.DOM.Randomizer[Symbol.toStringTag] = "Randomizer";

	window.DOM.Randomizer.prototype = Object.create(Object.prototype, {
		setType: {
			value: function (Type) {
				this.currentType = Type ? Type : this.TYPE.LEVEL3;
			},

			writable: false,
			configurable: false,
			enumerable: false
		},

		addRandomizeType: {
			value: function (RType) {
				if (RType) {
					this.TYPE[RType.name] = RType.type,
					this.CHARMAP[RType.name] = RType.charMap;
				}
			},

			writable: false,
			configurable: false,
			enumerable: false
		},

		removeRandomizeType: {
			value: function (RType) {
				if (RType) {
					this.TYPE[RType.name] = undefined,
					this.CHARMAP[RType.name] = undefined;
				}
			},

			writable: false,
			configurable: false,
			enumerable: false
		},

		resetRandomizeType: {
			value: function () {
				this.TYPE = DOM.Randomize.TYPE,
				this.CHARMAP = DOM.Randomize.CHARMAP;
			},

			writable: false,
			configurable: false,
			enumerable: false
		},

		generate: {
			value: function (Length) {
				let Result = "";

				!Length ? Length = 8 : null;

				for (let i = 0; i < Length; i++) {
					Result += this.CHARMAP[Symbol.keyFor(this.currentType)][Math.random.randomInt(this.CHARMAP[Symbol.keyFor(this.currentType)].length - 1)];
				}

				return Result;
			},

			writable: false,
			configurable: false,
			enumerable: false
		},

		constructor: {
			value: DOM.Randomizer
		}
	});

	window.DOM.Randomizer.RandomizeType = function (Name, UseChars) {
		this.name = Name ? Name : "LEVEL0";

		this.type = Symbol.for(this.name),
		this.charMap = UseChars ? UseChars.removeOverlay().split("") : ["0"];
	}, window.DOM.Randomizer.RandomizeType[Symbol.toStringTag] = "RandomizeType";



	window.DOM.APIError = function (Name) {
		Error.call(this);

		Name = DOM.Util.Param(Name, "Unknown");

		this.name = "APIError";
		this.message = Name + " isn't available for DOM Extender";
		Error.captureStackTrace(this, this.constructor);
	}, window.DOM.APIError[Symbol.toStringTag] = "APIError";

	window.DOM.APIError.prototype = Object.create(Error.prototype, {
		constructor: {
			value: DOM.APIError
		}
	});



	window.DOM.Caret = {}, window.DOM.Caret[Symbol.toStringTag] = "Caret";

	window.DOM.Caret.moveTo = function (Container, Start, End) {
		let Selecter = window.getSelection();
		let Area = Selecter.getRangeAt(0);

		Area.setStart(Container, Start);
		Area.setEnd(Container, End);

		Selecter.removeAllRanges();
		Selecter.addRange(Area);
	};

	window.DOM.Caret.appendValue = function (Value) {
		let Selecter = window.getSelection();
		let Area = Selecter.getRangeAt(0);

		if (!Area.collapsed) Area.deleteContents();

		Area.insertNode(new Text(Value));
		Area.setStart(Area.commonAncestorContainer, Area.endOffset);

		Selecter.removeAllRanges();
		Selecter.addRange(Area);
	};


	
	window.DOM.Util = {}, window.DOM.Util[Symbol.toStringTag] = "Util";
	
	window.DOM.Util.DegToRad = function (Deg) {
		return Deg * Math.PI / 180;
	};
	
	window.DOM.Util.ToArray = function (Obj) {
		let Elems = [];
		
		for (let i = 0; i < Obj.length; i++) {
			Elems.push(Obj[i]);
		}
		
		return Elems;
	};

	window.DOM.Util.Param = function (Obj, InitValue) {
		return (Obj != false && !Obj) ? InitValue : Obj;
	};

	window.DOM.Util.getCenteredBoundingClientRect = function (Width, Height) {
		return Object.create(ClientRect.prototype, {
			width: { value: Width },
			height: { value: Height },

			left: { value: (window.outerWidth - Width) / 2},
			right: { value: (window.outerWidth + Width) / 2},
			top: { value: (window.outerHeight - Height) / 2},
			bottom: { value: (window.outerHeight + Height) / 2}
		});
	};
	
	
	
	window.DOM.width = window.innerWidth;
	window.DOM.height = window.innerHeight;
	
	window.DOM.Watcher.watchers = [];

	window.DOM.Randomizer.TYPE = {
		LEVEL1: Symbol.for("LEVEL1"),	//Only Numbers
		LEVEL2: Symbol.for("LEVEL2"),	//Only Alphabets
		LEVEL3: Symbol.for("LEVEL3"),	//Numbers & Alphabets
		LEVEL4: Symbol.for("LEVEL4"),	//Numbers & Alphabets & Some Symbols

		LEVEL101: Symbol.for("LEVEL101"),	//ひらがな
		LEVEL102: Symbol.for("LEVEL102"),	//真夏(まなつ)の夜(よる)の淫夢(いんむ)
		LEVEL103: Symbol.for("LEVEL103"),	//唐澤弁護士(からさわべんごし) & 尊師(そんし)
		LEVEL104: Symbol.for("LEVEL104"),	//かすてら。じゅーしー & ちんかすてら & 珠照(すてら) & 未定義(みていぎ)さん
		LEVEL105: Symbol.for("LEVEL105"),	//イサト & 望月(もちづき) & モッチー & もっちー & もちもちゃん
		LEVEL106: Symbol.for("LEVEL106"),	//魂魄妖夢(こんぱくようむ) & 魂魄妖夢Channel & ValkyrieChannel & Durandal.Project & VC.Project & DCProject & Object & 黐麟(ちりん)
		LEVEL107: Symbol.for("LEVEL107"),	//勿論偽名(もちろんぎめい) & 偽名ちゃん(ぎめいちゃん)
		LEVEL108: Symbol.for("LEVEL108"),	//てぃお
		LEVEL109: Symbol.for("LEVEL109"),	//Mr.Taka & Takaチャンネル & タカチャンネル
		LEVEL110: Symbol.for("LEVEL110"),	//ナイキ & Nike(ないき) & にけ & にけにけ(にけみん)
	}, Object.defineProperty(window.DOM.Randomizer, "TYPE", {
		writable: false,
		configurable: false
	}), window.DOM.Randomizer.TYPE[Symbol.toStringTag] = "GenerateType";

	window.DOM.Randomizer.CHARMAP = {
		LEVEL1: "1234567890".split(""),
		LEVEL2: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
		LEVEL3: [],
		LEVEL4: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~".split(""),

		LEVEL101: "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん".split(""),
		LEVEL102: ["真夏の夜の淫夢", "まなつのよるのいんむ"].join("").removeOverlay().split(""),
		LEVEL103: ["唐澤弁護士", "からさわべんごし", "尊師", "そんし"].join("").removeOverlay().split(""),
		LEVEL104: ["かすてら。じゅーしー", "ちんかすてら", "珠照", "すてら", "未定義さん", "みていぎさん"].join("").removeOverlay().split(""),
		LEVEL105: ["イサト", "望月", "もちづき", "モッチー", "もっちー", "もちもちゃん"].join("").removeOverlay().split(""),
		LEVEL106: ["魂魄妖夢", "こんぱくようむ", "魂魄妖夢Channel", "ValkyrieChannel", "Durandal.Project", "VC.Project", "DCProject", "Object", "黐麟", "ちりん"].join("").removeOverlay().split(""),
		LEVEL107: ["勿論偽名", "もちろんぎめい", "偽名ちゃん", "ぎめいちゃん"].join("").removeOverlay().split(""),
		LEVEL108: ["てぃお"].join("").removeOverlay().split(""),
		LEVEL109: ["Mr.Taka", "Takaチャンネル", "タカチャンネル"].join("").removeOverlay().split(""),
		LEVEL110: ["ナイキ", "Nike", "ないき", "にけ", "にけにけ", "にけみん"].join("").removeOverlay().split(""),
	}, Object.defineProperty(window.DOM.Randomizer, "CHARMAP", {
		writable: false,
		configurable: false
	}), window.DOM.Randomizer.CHARMAP[Symbol.toStringTag] = "GenerateMap";

	window.DOM.Randomizer.CHARMAP.LEVEL3 = window.DOM.Randomizer.CHARMAP.LEVEL1.concat(window.DOM.Randomizer.CHARMAP.LEVEL2),
	window.DOM.Randomizer.CHARMAP.LEVEL4 = window.DOM.Randomizer.CHARMAP.LEVEL4.concat(window.DOM.Randomizer.CHARMAP.LEVEL1.concat(window.DOM.Randomizer.CHARMAP.LEVEL2));
	
	

	window.addEventListener("resize", function (Event) {
		window.DOM.width = window.innerWidth;
		window.DOM.height = window.innerHeight;
	});
})();



(function () {
	importScript("https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.3.5/mobile-detect.min.js");
})();



(function () {
	window.Canvas = function (Width, Height) {
		let Elem = document.createElement("Canvas");
			Elem.width = Width ? Width : "0";
			Elem.width = Height ? Height : "0";

		return Elem;
	};

	window.Script = function (Src, Options) {
		let Elem = document.createElement("Script");
			Elem.src = Src ? Src : "";
			
		Options ? (function () {
			Options.Async ? Elem.setAttribute("Async", "") : null;
			Options.Defer ? Elem.setAttribute("Defer", "") : null;
		})() : (function () {
			
		})();
		
		return Elem;
	};
	
	window.Style = function (Data) {
		let Elem = document.createElement("Style"),
			Memory = [];
			
		Data ? (function () {
			for (let ElemName in Data) {
				Memory.push("");
				Memory.push(ElemName + " {");
				
				for (let StyleName in Data[ElemName]) {
					Memory.push("\t" + StyleName + ": " + Data[ElemName][StyleName] + ";");
				}
				
				Memory.push("}");
				Memory.push("");
			}
			
			Elem.textContent = Memory.join("\n");
		})() : (function () {
			
		})();
		
		return Elem;
	};
	
	window.InlineStyle = function (Styles) {
		let Memory = [];
		
		for (let StyleName in Styles) {
			Memory.push(StyleName + ": " + Styles[StyleName] + ";");
		}
		
		return Memory.join(" ");
	};


	
	window.Svg = function (Width, Height) {
		let Elem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			Elem.setAttribute("version", "1.1");
			Elem.setAttribute("xmlns", "http://www.w3.org/2000/svg");
			
			Elem.setAttribute("width", Width ? Width : "0");
			Elem.setAttribute("height", Height ? Height : "0");
			Elem.setAttribute("viewBox", "0 0 " + (Width ? Width : "0") + " " + (Height ? Height : "0"));
			
		return Elem;
	}, window.Svg[Symbol.toStringTag] = "Svg";
	
	window.Svg.Rect = function (Args) {
		let Elem = document.createElementNSWithParam("http://www.w3.org/2000/svg", "rect", Args.Params ? Args.Params : {});
			Elem.setAttribute("x", Args.X ? Args.X : "0");
			Elem.setAttribute("y", Args.Y ? Args.Y : "0");
			
			Elem.setAttribute("width", Args.Width ? Args.Width : "0");
			Elem.setAttribute("height", Args.Height ? Args.Height : "0");
			Elem.setAttribute("fill", Args.Fill ? Args.Fill : "#000000");
			
		return Elem;
	};

	window.Svg.Circle = function (Args) {
		let Elem = document.createElementNSWithParam("http://www.w3.org/2000/svg", "circle", Args.Params ? Args.Params : {});
			Elem.setAttribute("cx", Args.X ? Args.X : "0");
			Elem.setAttribute("cy", Args.Y ? Args.Y : "0");
			Elem.setAttribute("r", Args.Radius ? Args.Radius : "0");

			Elem.setAttribute("fill", Args.Fill ? Args.Fill : "#000000");
			
		return Elem;
	};
	
	window.Svg.Text = function (Args) {
		let Elem = document.createElementNSWithParam("http://www.w3.org/2000/svg", "text", Args.Params ? Args.Params : {});
			Elem.textContent = Args.Value ? Args.Value : "";
			
			Elem.setAttribute("x", Args.X ? Args.X : "0");
			Elem.setAttribute("y", Args.Y ? Args.Y : "0");
			Elem.setAttribute("rotate", Args.Rotate ? Args.Rotate : "0");
			
		return Elem;
	};
	
	window.Svg.RGB = function (R, G, B) {
		return "RGB(" + (R ? R : 0) + ", " + (G ? G : 0) + ", " + (B ? B : 0) + ")";
	};
	
	window.Svg.RGBA = function (R, G, B, A) {
		return "RGBA(" + (R ? R : 0) + ", " + (G ? G : 0) + ", " + (B ? B : 0) + ", " + (A ? A : 0) + ")";
	};
})();

(function () {
	window.importScript = function (Url, OnLoad) {
		Url = Url ? Url : "";

		let IsVaild = false;

		for (let i = 0; i < document.getElementsByTagName("Script").length; i++) {
			if (document.getElementsByTagName("Script")[i].src == Url) {
				IsVaild = true;
				break;
			}
		}

		if (!IsVaild) {
			let Elem = document.createElement("Script");
				Elem.src = Url;

				Elem.onload = Elem.onreadystatechange = function (Event) {
					if (!Event.target.readyState || Event.target.readyState == "loaded" || Event.target.readyState == "complete") {
						OnLoad ? OnLoad() : null;
					}
				}

			document.head.appendChild(Elem);
		}
	};

	window.importScripts = function (Urls, OnLoad) {
		Urls = Urls ? Urls : [""];

		let Loaded = [false],
			Timer = setInterval(function () {
				if (Loaded.every(function (Elem, ID, Parent) {
					return Elem;
				})) {
					clearInterval(Timer);
					OnLoad ? OnLoad() : null;
				}
			}, 1);

		for (let i = 0; i < Urls.length; i++) {
			let IsVaild = false;

			for (let j = 0; j < document.getElementsByTagName("Script").length; j++) {
				if (document.getElementsByTagName("Script")[j].src == Urls[i]) {
					IsVaild = true;
				}
			}

			if (!IsVaild) {
				let Elem = document.createElement("Script");
					Elem.src = Urls[i];

					Elem.onload = function () {
						Loaded[i] = true;
					}
					
				document.head.appendChild(Elem);
			}
		}
	};

	window.btoaAsUTF8 = function (Str) {
		return btoa(unescape(encodeURIComponent(Str)));
	};

	window.atobAsUTF8 = function (Base64Str) {
		return decodeURIComponent(escape(atob(Base64Str)));
	};

	window.urlSafe = function (Str) {
		return Str.replace(/\+/g, '-').replace(/\//g, '_');
	};

	window.document.createElementWithParam = function (TagName, Params) {
		let Elem = document.createElement(TagName);
		
		if (Params) {
			Params.Attributes ? (function () {
				for (let ParamName in Params.Attributes) {
					Elem.setAttribute(ParamName, Params.Attributes[ParamName]);
				}
			})() : (function () {
				
			})();
			
			Params.Styles ? (function () {
				Elem.setAttribute("Style", InlineStyle(Params.Styles));
			})() : (function () {
				
			})();
			
			Params.Events ? (function () {
				for (let EventName in Params.Events) {
					Elem.addEventListener(EventName, Params.Events[EventName]);
				}
			})() : (function () {
				
			})();

			Params.Children ? (function () {
				for (let i = 0; i < Params.Children.length; i++) {
					Elem.appendChild(Params.Children[i]);
				}
			})() : (function () {
				
			})();
		}
		
		return Elem;
	};
	
	window.document.createElementNSWithParam = function (NameSpace, TagName, Params) {
		let Elem = document.createElementNS(NameSpace, TagName);
		
		if (Params) {
			Params.Attributes ? (function () {
				for (let ParamName in Params.Attributes) {
					Elem.setAttribute(ParamName, Params.Attributes[ParamName]);
				}
			})() : (function () {
				
			})();
			
			Params.Styles ? (function () {
				Elem.setAttribute("Style", InlineStyle(Params.Styles));
			})() : (function () {
				
			})();
			
			Params.Events ? (function () {
				for (let EventName in Params.Events) {
					Elem.addEventListener(EventName, Params.Events[EventName]);
				}
			})() : (function () {
				
			})();

			Params.Children ? (function () {
				for (let i = 0; i < Params.Children.length; i++) {
					Elem.appendChild(Params.Children[i]);
				}
			})() : (function () {
				
			})();
		}
		
		return Elem;
	};

	window.Math.random.randomInt = function () {
		let Result = 0;

		if (arguments.length >= 2) {
			Result = Math.round(Math.random() * (arguments[1] - arguments[0]) + arguments[0]);
		} else {
			Result = Math.round(Math.random() * arguments[0]);
		}

		return Result;
	};

	window.Math.radicalRoot = function (base, exponent) {
		return Math.pow(base, 1 / exponent);
	};
})();



(function () {
	window.Object.prototype.getClassName = function () {
		return Object.prototype.toString.call(this).slice(8, -1);
	}, Object.defineProperty(window.Object.prototype, "getClassName", {
		enumerable: false
	});
	
	window.Object.prototype.isStrictObject = function (Obj) {
		if (Obj !== undefined) {
			return (Obj.getClassName() !== "String" && Obj.getClassName() !== "Number" && Obj instanceof Object && !Array.isArray(Obj));
		} else {
			return (this.getClassName() !== "String" && this.getClassName() !== "Number" && this instanceof Object && !Array.isArray(this));
		}
	}, Object.defineProperty(window.Object.prototype, "isStrictObject", {
		enumerable: false
	});
	
	window.Object.prototype.isStrictArray = function (Obj) {
		if (Obj !== undefined) {
			return (Obj.getClassName() !== "String" && Obj.getClassName() !== "Number" && Obj instanceof Array && Array.isArray(Obj));
		} else {
			return (this.getClassName() !== "String" && this.getClassName() !== "Number" && this instanceof Array && Array.isArray(this));
		}
	}, Object.defineProperty(window.Object.prototype, "isStrictArray", {
		enumerable: false
	});

	window.Object.prototype.connect = function (ValueSeparator, ParamSeparator) {
		ValueSeparator = DOM.Util.Param(ValueSeparator, "=");
		ParamSeparator = DOM.Util.Param(ParamSeparator, "&");

		let Result = [];

		for (let i = 0; i < Object.entries(this).length; i++) {
			Result.push(Object.entries(this)[i].join(ValueSeparator));
		}
		
		return Result.join(ParamSeparator);
	}, Object.defineProperty(window.Object.prototype, "connect", {
		enumerable: false
	});

	window.Object.prototype.toQueryString = function (Obj) {
		let Result = [];

		if (Obj !== undefined) {
			for (let i = 0; i < Object.entries(Obj).length; i++) {
				Result.push(Object.entries(Obj)[i].join("="));
			}
		} else {
			for (let i = 0; i < Object.entries(this).length; i++) {
				Result.push(Object.entries(this)[i].join("="));
			}
		}

		return "?" + Result.join("&");
	}, Object.defineProperty(window.Object.prototype, "toQueryString", {
		enumerable: false
	});

	window.Object.prototype.toObject = function (Obj) {
		let Result = {};

		if (Obj !== undefined) {
			for (let Key in Obj) {
				Result[Key] = Obj[Key];
			}
		} else {
			for (let Key in this) {
				Result[Key] = this[Key];
			}
		}

		return Result;
	}, Object.defineProperty(window.Object.prototype, "toObject", {
		enumerable: false
	});
})();

(function () {
	window.String.prototype.replaces = function (ReplaceStrs) {
		let Result = this;
		
		for (let i = 0; i < ReplaceStrs.length; i++) {
			Result = Result.replace(ReplaceStrs[i][0], ReplaceStrs[i][1]);
		}
		
		return Result;
	};

	window.String.prototype.removeOverlay = function () {
		let Result = this.split("");
			Result = Result.filter(function (Elem, ID, Parent) {
				return Parent.indexOf(Elem) == ID;
			});

		return Result.join("");
	};
})();

(function () {
	window.Node.prototype.appendTo = function (Parent) {
		(Parent ? Parent : document.body).appendChild(this);
	};

	window.Node.prototype.dismiss = function () {
		this.parentElement.removeChild(this);
	};
})();

(function () {
	window.EventTarget.prototype.addEventListeners = function (Events, Listener, UseCapture) {
		for (let i = 0; i < Events.length; i++) {
			this.addEventListener(Events[i], Listener, UseCapture ? UseCapture : false);
		}
	};
})();

(function () {
	window.HTMLCollection.prototype.forEach = function (CallBack) {
		let Elems = [];
		
		for (let i = 0; i < this.length; i++) {
			Elems.push(this[i]);
		}
		
		Elems.forEach(CallBack);
	};
})();

(function () {
	window.Image.prototype.getImageData = function () {
		let Cvs = document.createElement("Canvas");
			Cvs.width = this.naturalWidth;
			Cvs.height = this.naturalHeight;
			
		let Ctx = Cvs.getContext("2d");
			Ctx.drawImage(this, 0, 0);
			
		return Ctx.getImageData(0, 0, this.naturalWidth, this.naturalHeight);
	};
	
	window.Image.prototype.toSvg = function () {
		this.crossOrigin ? this.crossOrigin = "anonymous" : null;
		
		let Pixels = this.getImageData(),
			Elem = new Svg(Pixels.width, Pixels.height);
			
		for (let y = 0; y < Pixels.height; y++) {
			for (let x = 0; x < Pixels.width; x++) {
				Elem.appendChild(
					new Svg.Rect({
						Width: 1,
						Height: 1,
						
						X: x,
						Y: y,
						Fill: Svg.RGBA(Pixels.data[(x + y * Pixels.width) * 4], Pixels.data[(x + y * Pixels.width) * 4 + 1], Pixels.data[(x + y * Pixels.width) * 4 + 2], Pixels.data[(x + y * Pixels.width) * 4 + 3])
					})
				);
			}
		}
		
		return Elem;
	};
})();

(function () {
	window.Location.prototype.querySort = function () {
		var Querys = {};
		
		for (var i = 0; i < this.search.substr(1).split("&").length; i++) {
			Querys[this.search.substr(1).split("&")[i].split("=")[0].toUpperCase()] = this.search.substr(1).split("&")[i].split("=")[1];
		}
		
		return Querys;
	};

	window.Location.prototype.getIPs = function (OnLoad) {
		let Frame = document.createElement("IFrame");
			Frame.style.display = "None";
			
		document.body.appendChild(Frame);
		
		let ip_dups = {};
		
		let RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
		let useWebKit = !!window.webkitRTCPeerConnection;
		
		if (!RTCPeerConnection) {
			let win = iframe.contentWindow;
			
			RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
			useWebKit = !!win.webkitRTCPeerConnection;
		}
		
		let pc = new RTCPeerConnection({iceServers: [{urls: "stun:stun.services.mozilla.com"}], optional: [{RtpDataChannels: true}]});
		
		function handleCandidate(candidate) {
			let ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
			let ip_addr = ip_regex.exec(candidate)[1];
			
			if (ip_dups[ip_addr] === undefined) {
				OnLoad({
					type: ip_addr.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/) ? "v4" : ip_addr.match(/^[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}$/) ? "v6" : "private",
					value: ip_addr
				});
			}
			
			ip_dups[ip_addr] = true;
		}
		
		pc.onicecandidate = function (ice) {
			if (ice.candidate) handleCandidate(ice.candidate.candidate);
		}
		
		pc.createDataChannel("");
		
		pc.createOffer(function (result) {
			pc.setLocalDescription(result, function(){}, function(){});
		}, function () {
			
		});
		
		setTimeout(function () {
			let lines = pc.localDescription.sdp.split('\n');
				lines.forEach(function (line) {
					if (line.indexOf('a=candidate:') === 0) handleCandidate(line);
				});
				
			Frame.parentElement.removeChild(Frame);
		}, 1000);
	};
})();

(function () {
	window.Navigator.prototype.isMobile = function () {
		let Checker = new MobileDetect(window.navigator.userAgent);

		return (Checker.mobile() || Checker.phone() || Checker.tablet()) ? true : false;
	};
})();