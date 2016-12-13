var Token = "";

const Credential = {
	ID: "568474095379-pch4uhmtl68rqclov8nfvo76bmkgtpbb.apps.googleusercontent.com",
	SecretID: atob("dWZ1RkVYUzZvZjRZdjVCbHVpb0wyZW1C"),
	RedirectURL: "https://genbuproject.github.io/Content/TimeMachineForGooglePlus/",
	Scope: "https://www.googleapis.com/auth/plus.login+https://www.googleapis.com/auth/plus.me+https://www.googleapis.com/auth/calendar"
}

var Info = {
	CalendarID: "",
	TaskList: []
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
	GRequest: function (Type, URL, IsSync, SendData, Onload) {
		var Requester = new XMLHttpRequest();
			Requester.open(Type, URL + "?access_token=" + Token, IsSync);
			
			Requester.onload = Onload;
			
			Requester.send(SendData);
	},
	
	LoginWithGoogle: function () {
		location.href = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" + Credential.RedirectURL + "&scope=" + Credential.Scope + "&client_id=" + Credential.ID + "&response_type=code&access_type=offline&approval_prompt=force";
	},
	
	IsVaildCalendar: function () {
		var Getter = new XMLHttpRequest();
			Getter.open("GET", "https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token=" + Token, false);
			Getter.send(null);
			
		var IsVaild = false;
		
		for (let i = 0; i < JSON.parse(Getter.responseText).items.length; i++) {
			if (JSON.parse(Getter.responseText).items[i].summary == "Time Machine For Google+") {
				IsVaild = true;
				Info.CalendarID = JSON.parse(Getter.responseText).items[i].id;
				
				break;
			}
		}
		
		return IsVaild;
	},
	
	GetPostings: function (OnLoad) {
		var PageToken = "";
		
		while (PageToken != undefined) {
			let TaskListGetter = new XMLHttpRequest();
				TaskListGetter.open("GET", "https://www.googleapis.com/plus/v1/people/me/activities/public?maxResults=100" + (PageToken != "" ? "&pageToken=" + PageToken : "") + "&access_token=" + Token, false);
				
				TaskListGetter.onload = function () {
					PageToken = JSON.parse(TaskListGetter.responseText).nextPageToken;
					Info.TaskList = Info.TaskList.concat(JSON.parse(TaskListGetter.responseText).items);
				}
				
				TaskListGetter.send(null);
		}
		
		OnLoad();
	},
	
	GetCheckPoint: function () {
		var CheckPointObj = {
			IsVaild: false,
			Time: ""
		}
		
		let CheckPointGetter = new XMLHttpRequest();
			CheckPointGetter.open("GET", "https://www.googleapis.com/calendar/v3/calendars/" + Info.CalendarID + "/events?access_token=" + Token, false);
			
			CheckPointGetter.onload = function () {
				for (let i = 0; i < JSON.parse(CheckPointGetter.responseText).items.length; i++) {
					if (JSON.parse(CheckPointGetter.responseText).items[i].summary == "<Time Machine For Google+> CheckPoint") {
						CheckPointObj.IsVaild = true
						CheckPointObj.Time = JSON.parse(CheckPointGetter.responseText).items[i].start.dateTime;
						
						break;
					}
				}
			}
			
			CheckPointGetter.send(null);
			
			return CheckPointObj;
	},
	
	RegisterTasks: function () {
		var CheckPoint = Net.GetCheckPoint();
		var PostNumber = 0;
		
		if (CheckPoint.IsVaild) {
			for (let i = 0; i <= Info.TaskList.length; i++) {
				if (Info.TaskList[i].published.split(".")[Info.TaskList[i].published.split(".").length - 1] == CheckPoint.Time) {
					PostNumber = i;
					
					break;
				}
			}
		}
		
		for (let i = 0; i <= (PostNumber != 0 ? PostNumber : Info.TaskList.length); i++) {
			if (i != 0) {
				let TaskSender = new XMLHttpRequest();
					TaskSender.open("POST", "https://www.googleapis.com/calendar/v3/calendars/" + Info.CalendarID + "/events?access_token=" + Token, false);
					TaskSender.setRequestHeader("Content-Type", "Application/Json");
					
					TaskSender.send(
						JSON.stringify({
							summary: "Posting On <" + Info.TaskList[i - 1].access.description + ">",
							description: Info.TaskList[i - 1].object.content,
							
							start: {
								dateTime: Info.TaskList[i - 1].published
							},
							
							end: {
								dateTime: Info.TaskList[i - 1].published
							}
						})
					);
			} else {
				let CheckPointSender = new XMLHttpRequest();
					CheckPointSender.open("POST", "https://www.googleapis.com/calendar/v3/calendars/" + Info.CalendarID + "/events?access_token=" + Token, false);
					CheckPointSender.setRequestHeader("Content-Type", "Application/Json");
					
					CheckPointSender.send(
						JSON.stringify({
							summary: "<Time Machine For Google+> CheckPoint",
							
							start: {
								dateTime: Info.TaskList[0].published
							},
							
							end: {
								dateTime: Info.TaskList[0].published
							}
						})
					);
			}
		}
		
		alert("タスクの追加が完了しました。お疲れ様でした。");
	}
}

var Dialog = {
	Step1: function () {
		Util.CreateDialog("Google+にログインして下さい", "Time Machine For Google+をご利用頂くため<Br>Google+にログインして下さい。", "<Button OnClick = 'Net.LoginWithGoogle();'>Sign in with Google+</Button><Button OnClick = 'Util.DismissDialog();'>キャンセル</Button>");
	},
	
	Step2: function () {
		Util.CreateDialog("ログイン成功", "Google+アカウントのログインに成功しました。<Br />このダイアログを閉じると今までの投稿の取得が開始されます。<Br />※この処理には数分程度掛かる場合があります。", "<Button OnClick = 'Util.DismissDialog(); Net.GetPostings(Dialog.Step3);'>閉じる</Button>");
	},
	
	Step3: function () {
		Util.CreateDialog("投稿取得成功", "今までの投稿の取得が完了しました。<Br />このダイアログを閉じると専用カレンダーへの追加が開始されます。<Br />※この処理には10分程度掛かる見込みです。", "<Button OnClick = 'Util.DismissDialog(); Net.RegisterTasks();'>閉じる</Button>");
	}
}

function Init() {
	var Query = Util.QuerySort();
	
	if (!Query.CODE) {
		Dialog.Step1();
	} else {
		var TokenGetter = new XMLHttpRequest();
			TokenGetter.open("POST", "https://www.googleapis.com/oauth2/v4/token?client_id=" + Credential.ID + "&client_secret=" + Credential.SecretID + "&redirect_uri=" + Credential.RedirectURL + "&access_type=offline&grant_type=authorization_code&code=" + Query.CODE, false);
			
			TokenGetter.onload = function () {
				Token = JSON.parse(TokenGetter.response).access_token;
				
				for (var i = 0; i < document.getElementsByClassName("Back").length; i++) {
					document.getElementsByClassName("Back")[i].style.display = "Block";
				}
				
				Dialog.Step2();
				
				if (!Net.IsVaildCalendar()) {
					var CalendarCreator = new XMLHttpRequest();
						CalendarCreator.open("POST", "https://www.googleapis.com/calendar/v3/calendars?access_token=" + Token, true);
						CalendarCreator.setRequestHeader("Content-Type", "Application/Json");
						
						CalendarCreator.onload = function (Event) {
							Info.CalendarID = JSON.parse(CalendarCreator.responseText).id;
							alert("お使いのGoogleカレンダーに新たにTime Machine For Google+を追加しました。");
						}
						
						CalendarCreator.send(
							JSON.stringify({
								summary: "Time Machine For Google+"
							})
						);
				}
			}
			
			TokenGetter.send(null);
	}
}