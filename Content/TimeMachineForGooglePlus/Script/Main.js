const Credential = {
	ID: "568474095379-pch4uhmtl68rqclov8nfvo76bmkgtpbb.apps.googleusercontent.com",
	SecretID: atob("dWZ1RkVYUzZvZjRZdjVCbHVpb0wyZW1C"),
	RedirectURL: "https://genbuproject.github.io/Content/TimeMachineForGooglePlus/",
	Scope: "https://www.googleapis.com/auth/plus.login+https://www.googleapis.com/auth/plus.me+https://www.googleapis.com/auth/calendar"
}

var Util = {
	CreateDialog: function (Title, Content, FooterContent) {
		var DialogBack = document.createElement("Div");
			DialogBack.className = "DialogBack";
			
		var DialogFront = document.createElement("Div");
			DialogFront.className = "DialogFront";
			
		var DialogName = document.createElement("Name");
			DialogName.textContent = Title;
			
		var DialogSeparater = document.createElement("Hr");
		
		var DialogContent = document.createElement("Content");
			DialogContent.innerHTML = Content;
			
		var DialogFooter = document.createElement("Footer");
		
		document.body.appendChild(DialogBack);
		document.body.appendChild(DialogFront);
		
		DialogFront.appendChild(DialogName);
		DialogFront.appendChild(DialogSeparater);
		DialogFront.appendChild(DialogContent);
		DialogFront.appendChild(DialogFooter);
		
		DialogFooter.innerHTML = FooterContent;
		
		DialogFront.style.top = (document.documentElement.clientHeight - DialogFront.clientHeight) / 2 + "px";
		DialogFront.style.left = (document.documentElement.clientWidth - DialogFront.clientWidth) / 2 + "px";
	},
	
	DismissDialog: function () {
		document.getElementsByClassName("DialogBack")[0].parentElement.removeChild(document.getElementsByClassName("DialogBack")[0]);
		document.getElementsByClassName("DialogFront")[0].parentElement.removeChild(document.getElementsByClassName("DialogFront")[0]);
	},
	
	QuerySort: function () {
		var Querys = {};
		
		for (var i = 0; i < location.search.substr(1).split("&").length; i++) {
			Querys[location.search.substr(1).split("&")[i].split("=")[0].toUpperCase()] = location.search.substr(1).split("&")[i].split("=")[1];
		}
		
		return Querys;
	}
}

var Net = {
	LoginWithGoogle: function () {
		location.href = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" + Credential.RedirectURL + "&scope=" + Credential.Scope + "&client_id=" + Credential.ID + "&response_type=code&access_type=offline&approval_prompt=force";
	}
}

function Init() {
	var Query = Util.QuerySort();
	
	if (!Query.CODE) {
		Util.CreateDialog("Google+にログインして下さい", "Time Machine For Google+をご利用頂くため<Br>Google+にログインして下さい。", "<Button OnClick = 'Net.LoginWithGoogle();'>Sign in with Google+</Button><Button OnClick = 'Util.DismissDialog();'>キャンセル</Button>");
	} else {
		
	}
}