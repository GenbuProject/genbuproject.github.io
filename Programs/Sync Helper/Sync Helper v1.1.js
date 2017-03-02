/*/
 *#=================================================================================================
 *#Sync Helper v1.1
 *#Copyright (C) 2016-2020 Genbu Project & Genbu Hase All Rights Reversed.
 *#=================================================================================================
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
	this.Token = DOM.Util.Param(Args.Token, "");

	this.login = function (Scope) {
		if (!Scope.isStrictArray()) {
			return "<Sync Helper || [GoogleAPI] login has finished with some problems.";
		} else {
			this.Scope = Scope;

			location.href = "https://accounts.google.com/o/oauth2/v2/auth" + {
				"client_id": this.ClientID,
				"redirect_uri": this.RedirectURL,
				"scope": Scope.join("+"),

				"response_type": "code",
				"access_type": this.OnOffline ? "offline" : null
			}.toQueryString();
		}
	}

	this.loginOnDialog = function (Scope, Option) {
		Option = DOM.Util.Param(Option, {
			Width: DOM.height / 4,
			Height: DOM.height / 2
		});

		window.open("https://accounts.google.com/o/oauth2/v2/auth?" + {
			"client_id": this.ClientID,
			"redirect_uri": this.RedirectURL,
			"scope": Scope.join("+"),

			"response_type": "code",
			"access_type": this.OnOffline ? "offline" : null
		}.toQueryString(), "LoginTab", Option.connect("=", ", "));
	}

	this.request = function (Args) {
		DOM.XHR({
			Type: Args.Type,
			URL: Args.URL, 
			DoesSync: Args.DoesSync,

			Headers: Args.Headers,

			Params: (function () {
				(Args.Params && Args.Params.isStrictObject()) ? Args.Params["access_token"] = this.Token : null;
				return Args.Params;
			}).bind(this)(),

			OnLoad: Args.OnLoad
		});
	}
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

(function () {
    let Urls = [
        "https://genbuproject.github.io/Programs/DOM Extender/DOM Extender.js"
    ]

    for (let i = 0; i < Urls.length; i++) {
        let Elem = document.createElement("Script");
            Elem.src = Urls[i];

        document.head.appendChild(Elem);
    }
})();