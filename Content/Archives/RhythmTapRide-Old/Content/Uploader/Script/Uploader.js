//Githubアクセストークン：atob("YWUzY2I0YTU0ZDdkMTJiMDMzODRiODk2YThiOWZlZGZhMGIwMTZiMw==")
var Token = "",
	AccountID = "",
	Name = "",
	Email = "";
	
var GlobalSongList = [],
	OwnSongList = [];
	
var UploadedFiles = [[], []];

const ID = "568561761665-fgnn7jvnf1rt5pb8r275o8uagkjfusjf.apps.googleusercontent.com";
const SecretID = atob("Z05EREFjdDdYQXZHMW9iR3Y1NFZtanRu");

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
		location.href = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://genbuproject.github.io/Content/RhythmTapRide/Content/Uploader/&scope=https://www.googleapis.com/auth/plus.login+https://www.googleapis.com/auth/plus.me+https://www.googleapis.com/auth/userinfo.email&response_type=code&client_id=" + ID + "&access_type=offline&approval_prompt=force";
	},
	
	GetSongList: function (OnLoad) {
		var Getter = new XMLHttpRequest();
			Getter.open("GET", "https://api.github.com/repos/GenbuProject/RhythmTapRide/contents/Songs/?access_token=" + atob("YWUzY2I0YTU0ZDdkMTJiMDMzODRiODk2YThiOWZlZGZhMGIwMTZiMw=="), true);
			
			Getter.onload = function () {
				GlobalSongList = JSON.parse(Getter.response);
				
				for (var i = 0; i < GlobalSongList.length; i++) {
					if (GlobalSongList[i].name.split(" [()] ").length != 1) {
						if (GlobalSongList[i].name.split(" [()] ")[1].split(".")[0] == AccountID) {
							OwnSongList.push(GlobalSongList[i]);
						}
					}
				}
				
				OnLoad();
			}
			
			Getter.send(null);
	},
	
	UploadWithGithub: function () {
		var Sender = new XMLHttpRequest();
			Sender.open("PUT", "https://api.github.com/repos/GenbuProject/RhythmTapRide/contents/Songs/" + JSON.parse(UploadedFiles[0][1]).Name + " By " + JSON.parse(UploadedFiles[0][1]).Author + " [()] " + AccountID + ".Json?access_token=" + atob("YWUzY2I0YTU0ZDdkMTJiMDMzODRiODk2YThiOWZlZGZhMGIwMTZiMw=="), true);
			
			Sender.onload = function () {
				alert(UploadedFiles[0][0] + "のアップロードが完了しました。");
			}
			
			Sender.send(
				JSON.stringify({
					committer: {
						name: Name,
						email: Email
					},
					
					message: "楽曲追加日：" + new Date().toLocaleString(),
					content: btoa(UploadedFiles[0][1])
				})
			);
	},
	
	ReplaceWithGithub: function () {
		var Sender = new XMLHttpRequest();
			Sender.open("PUT", "https://api.github.com/repos/GenbuProject/RhythmTapRide/contents/Songs/" + OwnSongList[document.getElementsByClassName("OwnFile")[0].selectedIndex - 1].name + "?access_token=" + atob("YWUzY2I0YTU0ZDdkMTJiMDMzODRiODk2YThiOWZlZGZhMGIwMTZiMw=="), true);
			
			Sender.onload = function () {
				alert(UploadedFiles[1][0] + "を更新しました。");
			}
			
			Sender.send(
				JSON.stringify({
					committer: {
						name: Name,
						email: Email
					},
					
					message: "楽曲更新日：" + new Date().toLocaleString(),
					content: btoa(UploadedFiles[1][1]),
					sha: OwnSongList[document.getElementsByClassName("OwnFile")[0].selectedIndex - 1].sha
				})
			);
	},
	
	DeleteWithGithub: function () {
		var Sender = new XMLHttpRequest();
			Sender.open("DELETE", "https://api.github.com/repos/GenbuProject/RhythmTapRide/contents/Songs/" + OwnSongList[document.getElementsByClassName("OwnFile")[1].selectedIndex - 1].name + "?access_token=" + atob("YWUzY2I0YTU0ZDdkMTJiMDMzODRiODk2YThiOWZlZGZhMGIwMTZiMw=="), true);
			
			Sender.onload = function () {
				alert(OwnSongList[document.getElementsByClassName("OwnFile")[1].selectedIndex - 1].name + "を削除しました。");
			}
			
			Sender.send(
				JSON.stringify({
					committer: {
						name: Name,
						email: Email
					},
					
					message: "楽曲削除日：" + new Date().toLocaleString(),
					sha: OwnSongList[document.getElementsByClassName("OwnFile")[1].selectedIndex - 1].sha
				})
			);
	}
}

function Init() {
	var Query = Util.QuerySort();
	
	if (!Query.CODE) {
		Util.CreateDialog("Googleにログインして下さい", "Rhythm Tap Ride(RTR)のアップローダーをご利用頂くため<Br>Googleにログインして下さい。", "<Button OnClick = 'Net.LoginWithGoogle();'>Sign in with Google+</Button><Button OnClick = 'Util.DismissDialog();'>キャンセル</Button>");
	} else {
		var TokenGetter = new XMLHttpRequest();
			TokenGetter.open("POST", "https://www.googleapis.com/oauth2/v4/token?client_id=" + ID + "&client_secret=" + SecretID + "&redirect_uri=https://genbuproject.github.io/Content/RhythmTapRide/Content/Uploader/&access_type=offline&grant_type=authorization_code&code=" + Query.CODE, false);
			
			TokenGetter.onload = function () {
				Token = JSON.parse(TokenGetter.response).access_token;
				
				for (var i = 0; i < document.getElementsByClassName("Back").length; i++) {
					document.getElementsByClassName("Back")[i].style.display = "Block";
				}
				
				Util.CreateDialog("ログイン成功", "Googleアカウントのログインに成功しました。", "<Button OnClick = 'Util.DismissDialog();'>閉じる</Button>");
				
				var InfoGetter = new XMLHttpRequest();
					InfoGetter.open("GET", "https://www.googleapis.com/plus/v1/people/me?access_token=" + Token, false);
					
					InfoGetter.onload = function () {
						AccountID = JSON.parse(InfoGetter.response).id,
						Name = JSON.parse(InfoGetter.response).displayName,
						Email = JSON.parse(InfoGetter.response).emails[0].value;
					}
					
					InfoGetter.send(null);
			}
			
			TokenGetter.send(null);
	}
	
	Net.GetSongList(function () {
		for (let i = 0; i < document.getElementsByClassName("FileChooser").length; i++) {
			document.getElementsByClassName("FileChooser")[i].addEventListener("change", function (Event) {
				var Reader = new FileReader();
					Reader.readAsText(Event.target.files[0]);
					
					Reader.onload = function () {
						UploadedFiles[i][0] = Event.target.files[0].name;
						UploadedFiles[i][1] = Reader.result;
					}
			});
		}
		
		for (let i = 0; i < OwnSongList.length; i++) {
			var NameGetter = new XMLHttpRequest();
				NameGetter.open("GET", OwnSongList[i].git_url + "?access_token=" + atob("YWUzY2I0YTU0ZDdkMTJiMDMzODRiODk2YThiOWZlZGZhMGIwMTZiMw=="), false);
				
				NameGetter.onload = function () {
					for (let j = 0; j < document.getElementsByClassName("OwnFile").length; j++) {
						document.getElementsByClassName("OwnFile")[j].add(new Option(JSON.parse(atob(JSON.parse(NameGetter.response).content)).Name));
					}
				}
				
				NameGetter.send(null);
		}
	});
}

window.addEventListener("resize", function () {
	if (document.getElementsByClassName("DialogBack")[0] && document.getElementsByClassName("DialogFront")[0]) {
		document.getElementsByClassName("DialogFront")[0].style.top = (document.documentElement.clientHeight - document.getElementsByClassName("DialogFront")[0].clientHeight) / 2 + "px";
		document.getElementsByClassName("DialogFront")[0].style.left = (document.documentElement.clientWidth - document.getElementsByClassName("DialogFront")[0].clientWidth) / 2 + "px";
	}
});