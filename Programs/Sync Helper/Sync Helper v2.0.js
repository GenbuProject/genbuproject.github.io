/*/
 *#######################################################################
 *Sync Helper v2.0
 *Copyright (C) 2016-2020 Genbu Project & Genbu Hase All Rights Reversed.
 *#######################################################################
/*/
const GitAPI = (function () {
	function GitAPI (token) {
		this.token = token;
	}; GitAPI.prototype = Object.create(null, {
		token: { value: "", configurable: true, writable: true, enumerable: true },

		Repository: {
			value: (function () {
				function Repository (repoUrl) {
					this.baseUrl = repoUrl;
				}; Repository.prototype = Object.create(null, {
					baseUrl: { value: "", configurable: true, writable: true, enumerable: true },

					File: {
						value: Object.create(Object.prototype, {
							get: {
								value (path, branch) {
									return DOM.XHR({
										Type: "GET",
										URL: "https://api.github.com/repos/" + this.baseUrl + "/contents/" + path,
										DoesSync: false,

										Params: {
											"access_token": this.token
										}
									});
								}
							}
						})
					}
				});

				return Repository;
			})()
		}
	});

	return GitAPI;
})();

/*const GitAPI = function (Token) {
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
};*/



const GoogleAPI = function (Args) {
	Googlethis = this;

	Args = DOM.Util.Param(Args, {});

	var Watchers = [];

	this.ClientID = DOM.Util.Param(Args.ID, "");
	this.SecretID = DOM.Util.Param(Args.Key, "");
	this.RedirectURL = DOM.Util.Param(Args.Url, "");
	this.Scope = [];
	this.OnOffline = DOM.Util.Param(Args.OnOffline, false);
	this.DoesSkipLogin = DOM.Util.Param(Args.DoesSkip, true);

	this.AccessToken = DOM.Util.Param(Args.AccessToken, "");
	this.RefreshToken = DOM.Util.Param(Args.RefreshToken, "");



	this.DriveAPI = function (DoesSync) {
		Drivethis = this;

		this.AccessToken = DOM.Util.Param(Googlethis.AccessToken, "");
		this.RefreshToken = DOM.Util.Param(Googlethis.RefreshToken, "");
		this.DoesSync = DOM.Util.Param(DoesSync, true);
	};

	this.DriveAPI.prototype = Object.create(null, {
		File: {
			value: {
				getFiles: function (OnLoad) {
					OnLoad = DOM.Util.Param(OnLoad, function (Event) {});

					let Res = Googlethis.request({
						Type: "GET",
						URL: "https://www.googleapis.com/drive/v3/files",
						DoesSync: Drivethis.DoesSync,

						Params: {
							"orderBy": "folder,name",
							"fields": "files"
						},

						OnLoad: function (Event) {
							OnLoad(JSON.parse(Event.target.response));
						}
					});

					return Res.response ? JSON.parse(Res.response).files : {};
				},

				create: function (Name, ContentType, OnLoad) {
					Name = DOM.Util.Param(Name, "Untitled");
					ContentType = DOM.Util.Param(ContentType, "text/plain");
					OnLoad = DOM.Util.Param(OnLoad, function (Event) {});

					let Separator = "{Drive API}";

					let Res = Googlethis.request({
						Type: "POST",
						URL: "https://www.googleapis.com/upload/drive/v3/files",
						DoesSync: Drivethis.DoesSync,

						Headers: {
							"Content-Type": 'multipart/related; boundary="' + Separator + '"'
						},

						Params: {
							"uploadType": "multipart"
						},

						Data: [
							"--" + Separator,
							"Content-Type: application/json; charset=UTF-8",
							"",
							JSON.stringify({
								name: Name
							}, null, "\t"),
							"",
							"--" + Separator,
							"Content-Type: " + ContentType,
							"",
							"",
							"--" + Separator + "--"
						].join("\n"),

						OnLoad: OnLoad
					});

					return Res.response ? JSON.parse(Res.response) : {};
				},

				delete: function (FileID, OnLoad) {
					FileID = DOM.Util.Param(FileID, "");
					OnLoad = DOM.Util.Param(OnLoad, function (Event) {});

					let Res = Googlethis.request({
						Type: "DELETE",
						URL: "https://www.googleapis.com/drive/v3/files/" + FileID,
						DoesSync: Drivethis.DoesSync,

						OnLoad: OnLoad
					});

					return Res.response ? JSON.parse(Res.response) : {};
				},

				write: function () {

				}
			},

			configurable: false,
			writable: false,
			enumerable: false
		}
	}), this.DriveAPI.prototype[Symbol.toStringTag] = "DriveAPI", this.DriveAPI.prototype.File[Symbol.toStringTag] = "DriveFile";



	this.GmailAPI = function (DoesSync) {
		Gmailthis = this;

		this.AccessToken = DOM.Util.Param(Googlethis.AccessToken, "");
		this.RefreshToken = DOM.Util.Param(Googlethis.RefreshToken, "");
		this.DoesSync = DOM.Util.Param(DoesSync, true);



		this.Gmail = function (To, Subject, Content, ContentType) {
			To = DOM.Util.Param(To, "@gmail.com");
			Subject = DOM.Util.Param(Subject, "");
			Content = DOM.Util.Param(Content, "");
			ContentType = DOM.Util.Param(ContentType, "text/plain");

			let toRTC2822 = function (To, Subject, Content, ContentType) {
				return [
					"To: " + To,
					"Subject: =?utf-8?B?" + btoaAsUTF8(Subject) + "?=",
					"MIME-Version: 1.0",
					"Content-Type: " + ContentType + "; charset=UTF-8",
					"",
					Content
				].join("\n");
			};

			this.Separator = "{Gmail API}";
			this.Type = "Multipart Mail";

			this.Data = [
				"--" + this.Separator,
				"Content-Type: application/json; charset=UTF-8",
				"",
				JSON.stringify({
					raw: urlSafe(btoaAsUTF8(toRTC2822(To, Subject, Content, ContentType)))
				}, null, "\t"),
				"",
				"--" + this.Separator,
				"Content-Type: message/rfc822",
				"",
				toRTC2822(To, Subject, Content, ContentType),
				"--" + this.Separator + "--"
			].join("\n");
		};
	};

	this.GmailAPI.prototype = Object.create(null, {
		send: {
			value: function (Mail, OnLoad) {
				Mail = DOM.Util.Param(Mail, new this.Gmail());
				OnLoad = DOM.Util.Param(OnLoad, function (Res) {});

				let Res = Googlethis.request({
					Type: "POST",
					URL: "https://www.googleapis.com/upload/gmail/v1/users/me/messages/send",
					DoesSync: this.DoesSync,

					Params: {
						"uploadType": "multipart"
					},

					Headers: {
						"Content-Type": 'multipart/related; boundary="' + Mail.Separator + '"'
					},

					Data: Mail.Data,

					OnLoad: function () {
						OnLoad(Res.response ? JSON.parse(Res.response) : {});
					}
				});

				return Res.response ? JSON.parse(Res.response) : {};
			},

			configurable: false,
			writable: false,
			enumerable: false
		},

		delete: {
			value: function (MailID, OnLoad) {
				MailID = DOM.Util.Param(MailID, "Yajuu1145148101919364364");
				OnLoad = DOM.Util.Param(OnLoad, function (Res) {});

				let Res = Googlethis.request({
					Type: "DELETE",
					URL: "https://www.googleapis.com/gmail/v1/users/me/messages/" + MailID,
					DoesSync: this.DoesSync,

					OnLoad: function () {
						OnLoad(Res.response ? JSON.parse(Res.response) : {});
					}
				});

				return Res.response ? JSON.parse(Res.response) : {};
			},

			configurable: false,
			writable: false,
			enumerable: false
		}
	}), this.GmailAPI.prototype[Symbol.toStringTag] = "GmailAPI";



	(function () {
		Watchers[0] = [], Watchers[0][0] = {
			value: null
		}, Watchers[0][1] = new DOM.Watcher.ChangeWatcher({
			Target: Watchers[0][0],
			Tick: 100,

			OnGetting: (function () {
				Watchers[0][0].value = localStorage.getItem("GoogleAPI.AccessToken");
			}).bind(this),

			OnChange: (function (Checker) {
				this.AccessToken = Checker.newValue;
			}).bind(this)
		});

		Watchers[1] = [], Watchers[1][0] = {
			value: null
		}, Watchers[1][1] = new DOM.Watcher.ChangeWatcher({
			Target: Watchers[1][0],
			Tick: 100,

			OnGetting: (function () {
				Watchers[1][0].value = localStorage.getItem("GoogleAPI.RefreshToken");
			}).bind(this),

			OnChange: (function (Checker) {
				this.RefreshToken = Checker.newValue;
			}).bind(this)
		});

		Watchers[2] = [], Watchers[2][0] = {
			value: null
		}, Watchers[2][1] = new DOM.Watcher.ChangeWatcher({
			Target: Watchers[2][0],
			Tick: 100,

			OnGetting: (function () {
				Watchers[2][0].value = JSON.parse(localStorage.getItem("GoogleAPI.Scope"));
			}).bind(this),

			OnChange: (function (Checker) {
				this.Scope = Checker.newValue;
			}).bind(this)
		});

		DOM.Watcher.addChangeWatcher(Watchers[0][1]);
		DOM.Watcher.addChangeWatcher(Watchers[1][1]);
		DOM.Watcher.addChangeWatcher(Watchers[2][1]);
	}).bind(this)();

	if (location.querySort()["CODE"] && location.querySort()["PROMPT"] && location.querySort()["SESSION_STATE"]) {
		this.requestToken();
	} else if (location.querySort()["ERROR"] && location.querySort()["ERROR"] == "access_denied") {
		this.dismissOAuthView();
	}
};

GoogleAPI.prototype = Object.create(null, {
	login: {
		value: function (Scope) {
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
		},

		configurable: false,
		writable: false,
		enumerable: false
	},

	loginOnDialog: {
		value: function (Scope, Option) {
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
		},

		configurable: false,
		writable: false,
		enumerable: false
	},

	dismissOAuthView: {
		value: function () {
			if (window.opener) {
				window.close();
			} else {
				location.href = location.origin + location.pathname;
			}
		},

		configurable: false,
		writable: false,
		enumerable: false
	},

	requestToken: {
		value: function () {
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
		},

		configurable: false,
		writable: false,
		enumerable: false
	},

	revokeToken: {
		value: function () {
			this.request({
				Type: "GET",
				URL: "https://accounts.google.com/o/oauth2/revoke",
				DoesSync: true,

				Params: {
					"token": this.AccessToken
				}
			}, true);
		},

		configurable: false,
		writable: false,
		enumerable: false
	},

	hasLogined: {
		value: function () {
			if (this.AccessToken) {
				let Res = this.request({
					Type: "GET",
					URL: "https://www.googleapis.com/oauth2/v3/tokeninfo",
					DoesSync: false,
				});

				return JSON.parse(Res.response).exp ? true : false;
			} else {
				return false;
			}
		},

		configurable: false,
		writable: false,
		enumerable: false
	},

	clearOAuth: {
		value: function () {
			this.revokeToken();

			this.AccessToken = "",
			localStorage.removeItem("GoogleAPI.AccessToken"),

			this.RefreshToken = "",
			localStorage.removeItem("GoogleAPI.RefreshToken"),
			
			this.Scope = [],
			localStorage.removeItem("GoogleAPI.Scope");
		},

		configurable: false,
		writable: false,
		enumerable: false
	},

	request: {
		value: function (Args, IsWithoutToken) {
			return DOM.XHR({
				Type: Args.Type,
				URL: Args.URL,
				DoesSync: Args.DoesSync,

				Headers: Args.Headers,

				Params: (function () {
					(Args.Params && Args.Params.isStrictObject()) ? null : Args.Params = {};
					!IsWithoutToken ? Args.Params["access_token"] = this.AccessToken : null;

					return Args.Params;
				}).bind(this)(),
				
				Data: Args.Data,
				OnLoad: Args.OnLoad
			});
		},

		configurable: false,
		writable: false,
		enumerable: false
	},

	getUserInfo: {
		value: function () {
			if (this.AccessToken && (this.Scope.includes(GoogleAPI.SCOPE.PLUS[0]) || this.Scope.includes(GoogleAPI.SCOPE.PLUS[1]))) {
				let Res = this.request({
					Type: "GET",
					URL: "https://www.googleapis.com/plus/v1/people/me",
					DoesSync: false
				});

				return Res.response ? JSON.parse(Res.response) : {};
			} else {
				return {};
			}
		},

		configurable: false,
		writable: false,
		enumerable: false
	}
}), GoogleAPI.prototype[Symbol.toStringTag] = "GoogleAPI";

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