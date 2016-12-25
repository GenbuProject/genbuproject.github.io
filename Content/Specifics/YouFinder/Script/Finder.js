let Info = {
	ClientID: "",
	SecretID: "",
	
	Token: ""
}

let Util = {
	CreateDialog: function (Title, Content, FooterContent) {
		let DialogBack = document.createElement("Div");
			DialogBack.className = "DialogBack";
			
		let DialogFront = document.createElement("Div");
			DialogFront.className = "DialogFront";
			
		let DialogName = document.createElement("Name");
			DialogName.textContent = Title;
			
		let DialogSeparater = document.createElement("Hr");
		
		let DialogContent = document.createElement("Content");
			DialogContent.innerHTML = Content;
			
		let DialogFooter = document.createElement("Footer");
		
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
		let Querys = {};
		
		for (var i = 0; i < location.search.substr(1).split("&").length; i++) {
			Querys[location.search.substr(1).split("&")[i].split("=")[0].toUpperCase()] = location.search.substr(1).split("&")[i].split("=")[1];
		}
		
		return Querys;
	}
}

let Net = {
	LoginWithGoogle: function () {
		location.href = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://genbuproject.github.io/Content/RhythmTapRide/Content/Uploader/&scope=https://www.googleapis.com/auth/plus.login+https://www.googleapis.com/auth/plus.me+https://www.googleapis.com/auth/userinfo.email&response_type=code&client_id=" + ID + "&access_type=offline&approval_prompt=force";
	}
}

let Dialogs = {
	Step1: function () {
		Util.CreateDialog("Googleアカウントにログインしてください", "アクセスするにはGoogleアカウントにログインする必要があります。", "<Button OnClick = 'Net.LoginWithGoogle();'>Sign in</Button><Button OnClick = 'Util.DismissDialog();'>キャンセル</Button>");
	},
	
	Step2: function () {
		Util.CreateDialog("ログイン成功", "Googleアカウントのログインに成功しました。", "<Button OnClick = 'Util.DismissDialog();'>閉じる</Button>");
	}
}

function Init() {
	var Querys = Util.QuerySort();
	
	if (!Querys.CODE) {
		Dialogs.Step1();
	} else {
		Dialogs.Step2();
	}
}
