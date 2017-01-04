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
			Connector.open(Args.Type, Args.URL, Args.DoesSync);
			
			Connector.onload = function (Event) {
				Args.OnLoad(Event);
				return Connector;
			}
			
			Connector.send(Args.Data);
	}
	
	window.location.querySort = function () {
		var Querys = {};
		
		for (var i = 0; i < location.search.substr(1).split("&").length; i++) {
			Querys[location.search.substr(1).split("&")[i].split("=")[0].toUpperCase()] = location.search.substr(1).split("&")[i].split("=")[1];
		}
		
		return Querys;
	}
})();



let Res = {
	Google: {
		ClientID: atob("NjQ2NTI3MzA2ODAzLXFjNzc4MnVoZDg1NTZpb2hpZzc4dDJvdmNuNWd1Y21kLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29t"),
		SecretID: atob("X0RMUWkyM1o5NDMwRlJHUlhPVlF6SXNj"),
		
		RedirectURL: "http://localhost:3141/", //"https://genbuproject.github.io/Content/SimpleThread/",
		Scope: "https://www.googleapis.com/auth/plus.login+https://www.googleapis.com/auth/plus.me",
		
		Token: ""
	}
}

const Net = {
	Google: {
		Login: function () {
			let URL = "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&access_type=offline&approval_prompt=force&client_id=" + Res.Google.ClientID + "&redirect_uri=" + Res.Google.RedirectURL + "&scope=" + Res.Google.Scope;
			
			Res.LoginPopup = window.open(URL, "_self", "Width=" + document.documentElement.clientWidth / 2 + ", Height=" + document.documentElement.clientHeight / 1.5 + ", Left=" + (document.documentElement.clientWidth - document.documentElement.clientWidth / 2) / 2 + ", Top=" + (document.documentElement.clientHeight - document.documentElement.clientHeight / 1.5) / 2);
		},
		
		Getter: {
			Token: function () {
				DOM.XHR({
					Type: "POST",
					URL: "https://www.googleapis.com/oauth2/v4/token?access_type=offline&grant_type=authorization_code&client_id=" + Res.Google.ClientID + "&client_secret=" + Res.Google.SecretID + "&redirect_uri=" + Res.Google.RedirectURL + "&code=" + location.querySort().CODE,
					DoesSync: true,
					
					OnLoad: function (Event) {
						Res.Google.Token = JSON.parse(Event.target.response);
					}
				});
			},
			
			OpenID: function () {
				DOM.XHR({
					Type: "GET",
					URL: "https://www.googleapis.com/plus/v1/people/me/openIdConnect?access_token=" + Res.Google.Token,
					DoesSync: true,
					
					OnLoad: function (Event) {
						console.log(Event);
					}
				});
			}
		},
		
		Sender: {
			SaveToGDrive: function (Args) {
				let ResData = [
					"====================",
					"Content-Type: Application/Json",
					"",
					JSON.stringify({
						title: Args.FileName,
						mimeType: Args.ContentType
					}),
					"====================",
					"Content-Type: " + Args.ContentType,
					"Content-Transfer-Encoding: base64",
					"",
					btoa(unescape(encodeURIComponent(Args.Content))),
					"===================="
				].join("\r\n").slice(1, -1);
				
				console.log(ResData);
			}
		}
	}
}

let GitBase = new GitAPI(atob("YWIzNWNjODEyNDA0M2FjZmRmZmUxOTZjMGYzM2NlNjg4NzY3N2YyMg=="));
	GitBase.Repo.RepoURL = "GenbuProject/genbuproject.github.io";
	
function Init() {
	let Query = location.querySort();
	
	if (Query.CODE) {
		Net.Google.Getter.Token();
	}
}