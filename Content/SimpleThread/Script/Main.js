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
	
	window.DOM.XHR = function (Type, URL, DoesSync, Data) {
		let Connector = new XMLHttpRequest();
			Connector.open(Type, URL, DoesSync);
			
			Connector.onload = function () {
				return Connector;
			}
			
		(Data ? function () {
			Connector.send(Data)
		} : function () {})();
	}
})();



let Res = {
	Google: {
		ClientID: atob("NjQ2NTI3MzA2ODAzLXFjNzc4MnVoZDg1NTZpb2hpZzc4dDJvdmNuNWd1Y21kLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29t"),
		SecretID: atob("X0RMUWkyM1o5NDMwRlJHUlhPVlF6SXNj"),
		
		RedirectURL: "https://genbuproject.github.io/Content/SimpleThread/",
		Scope: "https://www.googleapis.com/auth/plus.login+https://www.googleapis.com/auth/plus.me",
		
		Token: ""
	}
}

const Net = {
	Google: {
		Login: function () {
			let URL = "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&access_type=offline&approval_prompt=force&client_id=" + Res.Google.ClientID + "&redirect_uri=" + Res.Google.RedirectURL + "&scope=" + Res.Google.Scope;
			console.log(URL);
		},
		
		Getter: {
			OpenID: function () {
				DOM.XHR("GET", "https://www.googleapis.com/plus/v1/people/me/openIdConnect?access_token=" + Res.Google.Token, true);
			}
		}
	}
}

let GitBase = new GitAPI(atob("YWIzNWNjODEyNDA0M2FjZmRmZmUxOTZjMGYzM2NlNjg4NzY3N2YyMg=="));
	GitBase.Repo.RepoURL = "GenbuProject/genbuproject.github.io";
	
function Init() {
	
}