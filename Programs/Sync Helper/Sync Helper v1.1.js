/*/
 *#######################################################################
 *Sync Helper v1.1
 *Copyright (C) 2016-2020 Genbu Project & Genbu Hase All Rights Reversed.
 *#######################################################################
/*/
const GitAPI = function (Token) {
	Gitthis = this;
	
	this.Token = Token;
	
	this.Repo = {
		RepoURL: "",
		
		File: {
			Get: function (Path, Branch) {
				var FileGetter = new XMLHttpRequest();
					FileGetter.open("GET", "https://api.github.com/repos/" + Gitthis.Repo.RepoURL + "/contents/" + Path + "?time=" + new Date().getTime() + "&ref=" + (Branch ? Branch : "master") + "&access_token=" + Gitthis.Token, false);
					FileGetter.send(null);
					
				return JSON.parse(FileGetter.responseText);
			},
			
			Create: function (Path, Branch, Message) {
				if (Gitthis.Repo.File.IsVaild(Path, Branch) == false) {
					var FileCreator = new XMLHttpRequest();
						FileCreator.open("PUT", "https://api.github.com/repos/" + Gitthis.Repo.RepoURL + "/contents/" + Path + "?time=" + new Date().getTime() + "&access_token=" + Gitthis.Token, true);
						
						FileCreator.onload = function (Event) {
							console.log("<Sync Helper || [GitAPI] Repo.File.Create> it has finished without any problems.");
						}
						
						FileCreator.send(
							JSON.stringify(
								{
									message: Message ? Message : "",
									
									content: "",
									branch: Branch ? Branch : "master"
								}
							)
						);
				}
			},
			
			Delete: function (Path, Branch, Message) {
				if (Gitthis.Repo.File.IsVaild(Path, Branch) == true) {
					var FileDeleter = new XMLHttpRequest();
						FileDeleter.open("DELETE", "https://api.github.com/repos/" + Gitthis.Repo.RepoURL + "/contents/" + Path + "?time=" + new Date().getTime() + "&access_token=" + Gitthis.Token, true);
						
						FileDeleter.onload = function (Event) {
							console.log("<Sync Helper || [GitAPI] Repo.File.Delete> it has finished without any problems.");
						}
						
						FileDeleter.send(
							JSON.stringify(
								{
									message: Message ? Message : "",
									
									branch: Branch ? Branch : "master",
									sha: Gitthis.Repo.File.Get(Path, Branch).sha
								}
							)
						);
				}
			},
			
			Write: function (Path, Branch, Content, Message) {
				if (Gitthis.Repo.File.IsVaild(Path, Branch) == true) {
					var FileUpdater = new XMLHttpRequest();
						FileUpdater.open("PUT", "https://api.github.com/repos/" + Gitthis.Repo.RepoURL + "/contents/" + Path + "?time=" + new Date().getTime() + "&access_token=" + Gitthis.Token, true);
						
						FileUpdater.onload = function (Event) {
							console.log("<Sync Helper || [GitAPI] Repo.File.Write> it has finished without any problems.");
						}
						
						FileUpdater.send(
							JSON.stringify(
								{
									message: Message ? Message : "",
									
									content: btoa(unescape(encodeURIComponent(Content))),
									branch: Branch ? Branch : "master",
									
									sha: Gitthis.Repo.File.Get(Path, Branch).sha
								}
							)
						);
				}
			},
			
			Read: function (Path, Branch) {
				var FileGetter = new XMLHttpRequest();
					FileGetter.open("GET", "https://api.github.com/repos/" + Gitthis.Repo.RepoURL + "/contents/" + Path + "?time=" + new Date().getTime() + "&ref=" + (Branch ? Branch : "master") + "&access_token=" + Gitthis.Token, false);
					FileGetter.send(null);
					
				var ContentGetter = new XMLHttpRequest();
					ContentGetter.open("GET", JSON.parse(FileGetter.responseText).git_url + "?time=" + new Date().getTime() + "&access_token=" + Gitthis.Token, false);
					ContentGetter.send(null);
					
				return decodeURIComponent(escape(atob(JSON.parse(ContentGetter.responseText).content)));
			},
			
			Download: function (Path, Branch) {
				var Data = new Blob([Gitthis.Repo.File.Read(Path, Branch)], {
					type: "Text/Plain"
				});
				
				if (window.navigator.msSaveBlob) {
					window.navigator.msSaveBlob(Data, Gitthis.Repo.File.Get(Path, Branch).name);
				} else {
					Link = document.createElement("A");
					Link.href = URL.createObjectURL(Data);
					Link.download = Gitthis.Repo.File.Get(Path, Branch).name;
					Link.target = "_blank";
					
					var Click = document.createEvent("MouseEvents");
						Click.initEvent("click", false, true);
						
					Link.dispatchEvent(Click);
					
					URL.revokeObjectURL(Data);
				}
			},
			
			IsVaild: function (Path, Branch) {
				var VaildChecker = new XMLHttpRequest();
					VaildChecker.open("GET", "https://api.github.com/repos/" + Gitthis.Repo.RepoURL + "/contents/" + Path + "?time=" + new Date().getTime() + "&ref=" + (Branch ? Branch : "master") + "&access_token=" + Gitthis.Token, false);
					VaildChecker.send(null);
					
				return VaildChecker.status == 404 ? false : true;
			}
		}
	}
};



const GoogleAPI = function (Args) {
	Googlethis = this;

	Args = DOM.Util.Param(Args, {});

	this.ClientID = DOM.Util.Param(Args.ID, "");
	this.SecretID = DOM.Util.Param(Args.Key, "");
	this.RedirectURL = DOM.Util.Param(Args.Url, "");
	this.Scope = [];

	this.OnOffline = DOM.Util.Param(Args.OnOffline, false);
	this.DoesSkipLogin = DOM.Util.Param(Args.DoesSkip, true);

	this.AccessToken = DOM.Util.Param(Args.AccessToken, "");
	this.RefreshToken = DOM.Util.Param(Args.RefreshToken, "");

	this.Watchers = [];

	this.login = function (Scope) {
		Scope = DOM.Util.Param(Scope, []);
		localStorage.setItem("GoogleAPI.Scope", JSON.stringify(Scope));

		location.href = "https://accounts.google.com/o/oauth2/v2/auth" + {
			"client_id": this.ClientID,
			"redirect_uri": this.RedirectURL,
			"scope": Scope.join("+"),

			"response_type": "code",
			"approval_prompt": this.DoesSkipLogin ? null : "force",
			"access_type": this.OnOffline ? "offline" : null
		}.toQueryString();
	};

	this.loginOnDialog = function (Scope, Option) {
		Scope = DOM.Util.Param(Scope, []),

		Option = DOM.Util.Param(Option, {
			Width: DOM.width / 3,
			Height: DOM.height / 1.5
		});

		Option.Left = DOM.Util.Param(Option.Left, (DOM.width - Option.Width) / 2),
		Option.Top = DOM.Util.Param(Option.Top, (DOM.height - Option.Height) / 2);

		localStorage.setItem("GoogleAPI.Scope", JSON.stringify(Scope));

		window.open("https://accounts.google.com/o/oauth2/v2/auth" + {
			"client_id": this.ClientID,
			"redirect_uri": this.RedirectURL,
			"scope": Scope.join("+"),

			"response_type": "code",
			"approval_prompt": this.DoesSkipLogin ? null : "force",
			"access_type": this.OnOffline ? "offline" : null
		}.toQueryString(), "LoginTab", Option.connect("=", ", "));
	};

	this.requestToken = function () {
		DOM.XHR({
			Type: "POST",
			URL: "https://www.googleapis.com/oauth2/v4/token",
			DoesSync: true,

			Params: {
				"client_id": this.ClientID,
				"client_secret": this.SecretID,
				"redirect_uri": this.RedirectURL,
				"code": location.querySort().CODE,

				"grant_type": "authorization_code",
				"access_type": this.OnOffline ? "offline" : null
			},

			OnLoad: (function (Event) {
				let Result = JSON.parse(Event.target.response);
				
				localStorage.setItem("GoogleAPI.AccessToken", Result["access_token"]),
				localStorage.setItem("GoogleAPI.RefreshToken", Result["refresh_token"] ? Result["refresh_token"] : "");

				this.dismissOAuthView();
			}).bind(this)
		});
	};

	this.dismissOAuthView = function () {
		if (window.opener) {
			window.close();
		} else {
			location.href = location.origin + location.pathname;
		}
	};

	this.clearOAuth = function () {
		this.AccessToken = "",
		localStorage.removeItem("GoogleAPI.AccessToken"),

		this.RefreshToken = "",
		localStorage.removeItem("GoogleAPI.RefreshToken"),
		
		this.Scope = [],
		localStorage.removeItem("GoogleAPI.Scope");
	};

	this.request = function (Args) {
		DOM.XHR({
			Type: Args.Type,
			URL: Args.URL, 
			DoesSync: Args.DoesSync,

			Headers: Args.Headers,

			Params: (function () {
				(Args.Params && Args.Params.isStrictObject()) ? null : Args.Params = {};
				Args.Params["access_token"] = this.AccessToken;

				return Args.Params;
			}).bind(this)(),

			OnLoad: Args.OnLoad
		});
	};

	this.getUserInfo = function (Args) {
		Args = DOM.Util.Param(Args, {});
		
		if (this.AccessToken && (this.Scope.includes(GoogleAPI.SCOPE.PLUS[0]) || this.Scope.includes(GoogleAPI.SCOPE.PLUS[1]))) {
			this.request({
				Type: "GET",
				URL: "https://www.googleapis.com/plus/v1/people/me",
				DoesSync: Args.DoesSync,
				Headers: Args.Headers,
				Params: Args.Params,

				OnLoad: function (Event) {
					Args.OnLoad(JSON.parse(Event.target.response));
				}
			});
		} else {
			return {};
		}
	};

	(function () {
		this.Watchers[0] = {}, this.Watchers[0][0] = {
			value: null
		}, this.Watchers[0][1] = new DOM.Watcher.ChangeWatcher({
			Target: this.Watchers[0][0],
			Tick: 100,

			OnGetting: (function () {
				this.Watchers[0][0].value = localStorage.getItem("GoogleAPI.AccessToken");
			}).bind(this),

			OnChange: (function (Checker) {
				this.AccessToken = Checker.newValue;
			}).bind(this)
		});

		this.Watchers[1] = [], this.Watchers[1][0] = {
			value: null
		}, this.Watchers[1][1] = new DOM.Watcher.ChangeWatcher({
			Target: this.Watchers[1][0],
			Tick: 100,

			OnGetting: (function () {
				this.Watchers[1][0].value = localStorage.getItem("GoogleAPI.RefreshToken");
			}).bind(this),

			OnChange: (function (Checker) {
				this.RefreshToken = Checker.newValue;
			}).bind(this)
		});

		this.Watchers[2] = [], this.Watchers[2][0] = {
			value: null
		}, this.Watchers[2][1] = new DOM.Watcher.ChangeWatcher({
			Target: this.Watchers[2][0],
			Tick: 100,

			OnGetting: (function () {
				this.Watchers[2][0].value = JSON.parse(localStorage.getItem("GoogleAPI.Scope"));
			}).bind(this),

			OnChange: (function (Checker) {
				this.Scope = Checker.newValue;
			}).bind(this)
		});



		DOM.Watcher.addChangeWatcher(this.Watchers[0][1]);
		DOM.Watcher.addChangeWatcher(this.Watchers[1][1]);
		DOM.Watcher.addChangeWatcher(this.Watchers[2][1]);
	}).bind(this)();

	if (location.querySort()["CODE"] && location.querySort()["PROMPT"] && location.querySort()["SESSION_STATE"]) {
		this.requestToken();
	} else if (location.querySort()["ERROR"] && location.querySort()["ERROR"] == "access_denied") {
		this.dismissOAuthView();
	}
};

//Please check the others at https://developers.google.com/identity/protocols/googlescopes
GoogleAPI.SCOPE = {
	"CALENDAR": [
		"https://www.googleapis.com/auth/calendar",
		"https://www.googleapis.com/auth/calendar.readonly"
	],

	"DRIVE": [
		"https://www.googleapis.com/auth/drive",
		"https://www.googleapis.com/auth/drive.appdata",
		"https://www.googleapis.com/auth/drive.file",
		"https://www.googleapis.com/auth/drive.metadata",
		"https://www.googleapis.com/auth/drive.metadata.readonly",
		"https://www.googleapis.com/auth/drive.photos.readonly",
		"https://www.googleapis.com/auth/drive.readonly",
		"https://www.googleapis.com/auth/drive.scripts"
	],

	"GMAIL": [
		"https://mail.google.com/",
		"https://www.googleapis.com/auth/gmail.compose",
		"https://www.googleapis.com/auth/gmail.insert",
		"https://www.googleapis.com/auth/gmail.labels",
		"https://www.googleapis.com/auth/gmail.metadata",
		"https://www.googleapis.com/auth/gmail.modify",
		"https://www.googleapis.com/auth/gmail.readonly",
		"https://www.googleapis.com/auth/gmail.send",
		"https://www.googleapis.com/auth/gmail.settings.basic",
		"https://www.googleapis.com/auth/gmail.settings.sharing"
	],

	"PLUS": [
		"https://www.googleapis.com/auth/plus.login",
		"https://www.googleapis.com/auth/plus.me",
		"https://www.googleapis.com/auth/userinfo.email",
		"https://www.googleapis.com/auth/userinfo.profile"
	]
};

GoogleAPI.DriveAPI = function () {
	
};


const TwitterAPI = function () {
	Twitterthis = this;
};



const DB = {
	Save: function (FileName, Content) {
		let Data = new Blob([Content], {
			type: "Text/Plain"
		});
		
		if (window.navigator.msSaveBlob) {
			window.navigator.msSaveBlob(Data, FileName);
		} else {
			Link = document.createElement("A");
			Link.href = URL.createObjectURL(Data);
			Link.download = FileName;
			Link.target = "_blank";
			
			let Click = document.createEvent("MouseEvents");
				Click.initEvent("click", false, true);
				
			Link.dispatchEvent(Click);
			
			URL.revokeObjectURL(Data);
		}
	},
	
	Load: function (Extension, OnLoad) {
		let Click = document.createEvent("MouseEvents");
			Click.initEvent("click", false, true);
			
		let Filer = document.createElement("Input");
			Filer.type = "File";
			Filer.accept = Extension;
			
			Filer.addEventListener("change", function (Event) {
				let Reader = new FileReader();
					Reader.readAsText(Event.target.files[0]);
					
					Reader.onload = function (Event) {
						OnLoad(Event);
					}
			});
			
			Filer.dispatchEvent(Click);
	}
};

"use DOMExtender";