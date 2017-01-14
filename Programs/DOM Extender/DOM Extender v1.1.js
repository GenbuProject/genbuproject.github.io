/*/
 *#######################################################################
 *DOM Extender v1.1
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
				Memory = document.createElement(Str);
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
				
				Connector.open(Args.Type ? Args.Type : "GET", (Args.URL ? Args.URL : location.href) + "?" + Param.join("&"), Args.DoesSync ? Args.DoesSync : true);
			})() : (function () {
				Connector.open(Args.Type ? Args.Type : "GET", (Args.URL ? Args.URL : location.href), Args.DoesSync ? Args.DoesSync : true);
			})();
			
			Args.Headers ? (function () {
				for (let HeaderName in Args.Headers) {
					Connector.setRequestHeader(HeaderName, Args.Headers[HeaderName]);
				}
			})() : (function () {
				
			})();
			
			Connector.onload = Args.OnLoad ? Args.OnLoad(Event) : null;
			
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
	
	
	
	window.DOM.width = window.innerWidth;
	window.DOM.height = window.innerHeight;
	
	
	
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
	
	window.Svg = function (Width, Height) {
		let Elem = document.createElementNS("http://www.w3.org/2000/svg", "Svg");
			Elem.setAttribute("version", "1.1");
			Elem.setAttribute("xmlns", "http://www.w3.org/2000/svg");
			
			Elem.setAttribute("width", Width ? Width : "0");
			Elem.setAttribute("height", Height ? Height : "0");
			Elem.setAttribute("viewBox", "0 0 " + (Width ? Width : "0") + " " + (Height ? Height : "0"));
			
		return Elem;
	}
	
	window.Svg.Rect = function (Args) {
		let Elem = document.createElementNS("http://www.w3.org/2000/svg", "Rect");
			Elem.setAttribute("x", Args.X ? Args.X : "0");
			Elem.setAttribute("y", Args.Y ? Args.Y : "0");
			
			Elem.setAttribute("width", Args.Width ? Args.Width : "0");
			Elem.setAttribute("height", Args.Height ? Args.Height : "0");
			Elem.setAttribute("fill", Args.Fill ? Args.Fill : "#000000");
			
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
	window.location.querySort = function () {
		var Querys = {};
		
		for (var i = 0; i < location.search.substr(1).split("&").length; i++) {
			Querys[location.search.substr(1).split("&")[i].split("=")[0].toUpperCase()] = location.search.substr(1).split("&")[i].split("=")[1];
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
})();