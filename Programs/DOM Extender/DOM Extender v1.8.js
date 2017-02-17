/*/
 *#######################################################################
 *DOM Extender v1.8
 *Copyright (C) 2016-2020 Genbu Project & Genbu Hase All Rights Reversed.
 *#######################################################################
/*/
(function () {
	window.DOM = function (Str) {
		let Memory = null;
		
		switch (Str.substr(0, 1)) {
			case "#":
				Memory = document.getElementById(Str.substr(1));
				break;
				
			case ".":
				Memory = document.getElementsByClassName(Str.substr(1));
				break;
				
			case "*":
				Memory = document.getElementsByName(Str.substr(1));
				break;
				
			case ":":
				Memory = document.getElementsByTagName(Str.substr(1));
				break;
				
			default:
				Memory = (arguments[1] ? document.createElementWithParam(Str, arguments[1]) : document.createElement(Str));
				break;
		}
		
		return Memory;
	}
	
	window.DOM.XHR = function (Args) {
		let Connector = new XMLHttpRequest();
			
			Args.Params ? (function () {
				let Param = [];
				
				for (let ParamName in Args.Params) {
					Param.push(ParamName + "=" + Args.Params[ParamName]);
				}
				
				Connector.open(Args.Type ? Args.Type : "GET", (Args.URL ? Args.URL : location.href) + "?" + Param.join("&"), Args.DoesSync != undefined ? Args.DoesSync : true);
			})() : (function () {
				Connector.open(Args.Type ? Args.Type : "GET", (Args.URL ? Args.URL : location.href), Args.DoesSync != undefined ? Args.DoesSync : true);
			})();
			
			Args.Headers ? (function () {
				for (let HeaderName in Args.Headers) {
					Connector.setRequestHeader(HeaderName, Args.Headers[HeaderName]);
				}
			})() : (function () {
				
			})();
			
			Connector.onload = Args.OnLoad ? Args.OnLoad : null;
			
			Connector.send(Args.Data);
	}
	
	window.DOM.JsonPXHR = function (Args) {
		let Param = [];
		
		Args.Params ? (function () {
			for (let ParamName in Args.Params) {
				Param.push(ParamName + "=" + Args.Params[ParamName]);
			}
		})() : (function () {
			
		})();
		
		let Connector = document.createElement("Script");
			Connector.src = (Args.URL ? Args.URL : location.href) + (Args.Params ? "?" + Param.join("&") : "");
			
			Connector.onload = function (Event) {
				Connector.parentElement.removeChild(Connector);
			}
			
		document.head.appendChild(Connector);
	}
	
	window.DOM.RestXHR = function (Args) {
		DOM.XHR({
			Type: Args.Type,
			URL: Args.URL,
			DoesSync: Args.DoesSync,
			
			Headers: Args.Headers,
			Params: Args.Params,
			Data: Args.Data,
			
			OnLoad: function (Event) {
				Args.OnLoad ? Args.OnLoad(eval(Event.target.response)) : null;
			}
		});
	}
	
	window.DOM.RestXHR.CalcResources = function (Event) {
		let Loc = JSON.parse(JSON.stringify(window.location));
			Loc.__proto__ = Location.prototype;
			
			Loc.href = Event.target.responseURL;
			Loc.protocol = Loc.href.match(/(https|http|file|ftp):\/\/\/?/g)[0];
			Loc.pathname = "/" + Loc.href.split(/\//g)[Loc.href.split(/\//g).length - 1].split("?")[0];
			Loc.search = "?" + Loc.href.split(/\//g)[Loc.href.split(/\//g).length - 1].split("?")[1];
			
			Loc.origin = Loc.href.replaces([[Loc.pathname, ""], [Loc.search, ""]]);
			Loc.host = Loc.href.replaces([[Loc.protocol, ""], [Loc.pathname, ""], [Loc.search, ""]]);
			Loc.port = Loc.host.split(":")[1] ? Loc.host.split(":")[1] : "";
			Loc.hostname = Loc.host.replace(":" + Loc.port, "");
			
		return Loc;
	}
	
	window.DOM.Watcher = function () {
		this.watcherID = [0, 0];
		this.watchTick = 1;
		
		this.target = {value: null};
		this.oldValue = 0;
		this.newValue = 0;
	}
	
	window.DOM.Watcher.prototype = Object.create(Object.prototype, {
		setTarget: {
			value: function (Value) {
				this.target = Value;
			},
			
			writable: false,
			configurable: false
		},
		
		constructor: {
			value: DOM.Watcher
		}
	});
	
	window.DOM.Watcher.ChangeWatcher = function () {
		DOM.Watcher.call(this);
		
		this.onchange = function () {};
	}
	
	window.DOM.Watcher.ChangeWatcher.prototype = Object.create(window.DOM.Watcher.prototype, {
		constructor: {
			value: DOM.ChangeWatcher
		}
	});
	
	window.DOM.Watcher.addChangeWatcher = function (Checker) {
		Checker.watcherID[0] = setInterval(function () {
			Checker.newValue = Checker.target.value;
			
			if (Checker.oldValue !== Checker.newValue) {
				Checker.onchange(Checker);
				Checker.oldValue = Checker.newValue;
			}
		}, Checker.watchTick);
		
		Checker.oldValue = Checker.target.value,
		Checker.newValue = Checker.target.value;
		
		DOM.Watcher.watchers.push(Checker);
		DOM.Watcher.watchers[DOM.Watcher.watchers.length - 1].watcherID[1] = DOM.Watcher.watchers.length - 1;
		
		return Checker;
	}
	
	window.DOM.Watcher.removeWatcher = function (Checker) {
		clearInterval(Checker.watcherID[0]);
		
		DOM.Watcher.watchers.slice(Checker.watcherID[1], 1);
	}
	
	window.DOM.Util = {};
	
	window.DOM.Util.DegToRad = function (Deg) {
		return Deg * Math.PI / 180;
	}
	
	window.DOM.Util.ToArray = function (Obj) {
		let Elems = [];
		
		for (let i = 0; i < Obj.length; i++) {
			Elems.push(Obj[i]);
		}
		
		return Elems;
	}
	
	
	
	window.DOM.width = window.innerWidth;
	window.DOM.height = window.innerHeight;
	
	window.DOM.Watcher.watchers = [];
	
	
	
	window.addEventListener("resize", function (Event) {
		window.DOM.width = window.innerWidth;
		window.DOM.height = window.innerHeight;
	});
})();

(function () {
	window.Script = function (Src, Options) {
		let Elem = document.createElement("Script");
			Elem.src = Src ? Src : "";
			
		Options ? (function () {
			Options.Async ? Elem.setAttribute("Async", "") : null;
			Options.Defer ? Elem.setAttribute("Defer", "") : null;
		})() : (function () {
			
		})();
		
		return Elem;
	}
	
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
	}
	
	window.InlineStyle = function (Styles) {
		let Memory = [];
		
		for (let StyleName in Styles) {
			Memory.push(StyleName + ": " + Styles[StyleName] + ";");
		}
		
		return Memory.join(" ");
	}
	
	window.Svg = function (Width, Height) {
		let Elem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			Elem.setAttribute("version", "1.1");
			Elem.setAttribute("xmlns", "http://www.w3.org/2000/svg");
			
			Elem.setAttribute("width", Width ? Width : "0");
			Elem.setAttribute("height", Height ? Height : "0");
			Elem.setAttribute("viewBox", "0 0 " + (Width ? Width : "0") + " " + (Height ? Height : "0"));
			
		return Elem;
	}
	
	window.Svg.Rect = function (Args) {
		let Elem = document.createElementNSWithParam("http://www.w3.org/2000/svg", "rect", Args.Params ? Args.Params : {});
			Elem.setAttribute("x", Args.X ? Args.X : "0");
			Elem.setAttribute("y", Args.Y ? Args.Y : "0");
			
			Elem.setAttribute("width", Args.Width ? Args.Width : "0");
			Elem.setAttribute("height", Args.Height ? Args.Height : "0");
			Elem.setAttribute("fill", Args.Fill ? Args.Fill : "#000000");
			
		return Elem;
	}
	
	window.Svg.Text = function (Args) {
		let Elem = document.createElementNSWithParam("http://www.w3.org/2000/svg", "text", Args.Params ? Args.Params : {});
			Elem.textContent = Args.Value ? Args.Value : "";
			
			Elem.setAttribute("x", Args.X ? Args.X : "0");
			Elem.setAttribute("y", Args.Y ? Args.Y : "0");
			Elem.setAttribute("rotate", Args.Rotate ? Args.Rotate : "0");
			
		return Elem;
	}
	
	window.Svg.RGB = function (R, G, B) {
		return "RGB(" + (R ? R : 0) + ", " + (G ? G : 0) + ", " + (B ? B : 0) + ")";
	}
	
	window.Svg.RGBA = function (R, G, B, A) {
		return "RGBA(" + (R ? R : 0) + ", " + (G ? G : 0) + ", " + (B ? B : 0) + ", " + (A ? A : 0) + ")";
	}
})();

(function () {
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
		}
		
		return Elem;
	}
	
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
		}
		
		return Elem;
	}
})();

(function () {
	window.Object.prototype.getClassName = function () {
		return Object.prototype.toString.call(this).slice(8, -1);
	}
	
	window.Object.prototype.isStrictObject = function (Obj) {
		if (Obj !== undefined) {
			return (Obj.getClassName() !== "String" && Obj.getClassName() !== "Number" && Obj instanceof Object && !Array.isArray(Obj));
		} else {
			return (this.getClassName() !== "String" && this.getClassName() !== "Number" && this instanceof Object && !Array.isArray(this));
		}
	}
	
	window.Array.prototype.isStrictArray = function (Obj) {
		if (Obj !== undefined) {
			return (Obj.getClassName() !== "String" && Obj.getClassName() !== "Number" && Obj instanceof Array && Array.isArray(Obj));
		} else {
			return (this.getClassName() !== "String" && this.getClassName() !== "Number" && this instanceof Array && Array.isArray(this));
		}
	}
	
	window.Node.prototype.dismiss = function () {
		this.parentElement.removeChild(this);
	}
	
	window.EventTarget.prototype.addEventListeners = function (Events, Listener, UseCapture) {
		for (let i = 0; i < Events.length; i++) {
			this.addEventListener(Events[i], Listener, UseCapture ? UseCapture : false);
		}
	}
	
	window.String.prototype.replaces = function (ReplaceStrs) {
		let Result = this;
		
		for (let i = 0; i < ReplaceStrs.length; i++) {
			Result = Result.replace(ReplaceStrs[i][0], ReplaceStrs[i][1]);
		}
		
		return Result;
	}
	
	window.HTMLCollection.prototype.forEach = function (CallBack) {
		DOM.Util.ToArray(this).forEach(CallBack);
	}
	
	window.Location.prototype.querySort = function () {
		var Querys = {};
		
		for (var i = 0; i < this.search.substr(1).split("&").length; i++) {
			Querys[this.search.substr(1).split("&")[i].split("=")[0].toUpperCase()] = this.search.substr(1).split("&")[i].split("=")[1];
		}
		
		return Querys;
	}
	
	window.Image.prototype.getImageData = function () {
		let Cvs = document.createElement("Canvas");
			Cvs.width = this.naturalWidth;
			Cvs.height = this.naturalHeight;
			
		let Ctx = Cvs.getContext("2d");
			Ctx.drawImage(this, 0, 0);
			
		return Ctx.getImageData(0, 0, this.naturalWidth, this.naturalHeight);
	}
	
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
	}
})();