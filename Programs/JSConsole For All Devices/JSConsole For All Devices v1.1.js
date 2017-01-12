/*/
 *#######################################################################
 *JSConsole For All Devices v1.1
 *Copyright (C) 2016-2020 Genbu Project & Genbu Hase All Rights Reversed.
 *#######################################################################
/*/

Function.prototype.Debug = function (DoesRunOnAllDevices) {
	if (!DoesRunOnAllDevices) {
		try {
			this.apply(this);
		} catch (Error) {
			if (Error.toSource) {
				document.getElementById(window.ConsoleID).innerHTML += "<Span Style = 'Color: Red;'>" + Error + "</Span> [エラー行：" + Error.toSource().split(",")[Error.toSource().split(",").length - 1].replace(/[)]/g, "") + "]<Br>";
			} else {
				document.getElementById(window.ConsoleID).innerHTML += "<Span Style = 'Color: Red;'>" + Error + "</Span><Br>";
			}
		}
	} else if (DoesRunOnAllDevices) {
		window.addEventListener("error", function (Error) {
			document.getElementById(window.ConsoleID).innerHTML += "<Span Style = 'Color: Red;'>" + Error.message + "</Span> [<A Href = '" + Error.filename + "'>" + Error.filename + "</A>:" + Error.lineno + "]<Br>";
		});
		
		this.apply(this);
	}
}

Debug = {
	log: function (Obj) {
		if (typeof Obj != "string" && typeof Obj != "number") {
			if (Obj instanceof Array) {
				var Result = Obj + "<Br>";
				
				for (var i = 0; i < Obj.length; i++) {
					Result += "=><Span Style = 'Color: Orange;'>" + Obj[i] + "</Span><Br>";
				}
				
				document.getElementById(window.ConsoleID).innerHTML += Result;
			} else {
				var Result = Obj + "<Br>";
				
				for (var Key in Obj) {
					Result += "=><Span Style = 'Color: Orange;'>" + Key + "</Span><Br>";
				}
				
				document.getElementById(window.ConsoleID).innerHTML += Result;
			}
		} else {
			document.getElementById(window.ConsoleID).innerHTML += Obj + "<Br>";
		}
	}
}