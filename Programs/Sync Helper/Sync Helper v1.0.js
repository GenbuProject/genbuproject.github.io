/*/
 *#=================================================================================================
 *#Sync Helper v1.0
 *#Copyright (C) 2016 Genbu Project & Genbu Hase All Rights Reversed.
 *#=================================================================================================
/*/
var GitAPI = function (Token) {
	Gitthis = this;
	
	this.Token = Token;
	
	this.Repo = {
		RepoURL: "",
		
		File: {
			Get: function (Path, Branch) {
				var FileGetter = new XMLHttpRequest();
					FileGetter.open("GET", "https://api.github.com/repos/" + Gitthis.Repo.RepoURL + "/contents/" + Path + "?ref=" + (Branch ? Branch : "master") + "&access_token=" + Gitthis.Token, false);
					FileGetter.send(null);
					
				return JSON.parse(FileGetter.responseText);
			},
			
			Create: function (Path, Branch, Message) {
				if (Gitthis.Repo.File.IsVaild(Path, Branch) == false) {
					var FileCreator = new XMLHttpRequest();
						FileCreator.open("PUT", "https://api.github.com/repos/" + Gitthis.Repo.RepoURL + "/contents/" + Path + "?access_token=" + Gitthis.Token, true);
						
						FileCreator.onload = function (Event) {
							console.log("<Sync Helper || Repo.File.Create> it has finished without any problems.");
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
						FileDeleter.open("DELETE", "https://api.github.com/repos/" + Gitthis.Repo.RepoURL + "/contents/" + Path + "?access_token=" + Gitthis.Token, true);
						
						FileDeleter.onload = function (Event) {
							console.log("<Sync Helper || Repo.File.Delete> it has finished without any problems.");
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
			
			Write: function (Path, Content, Branch, Message) {
				if (Gitthis.Repo.File.IsVaild(Path, Branch) == true) {
					var FileUpdater = new XMLHttpRequest();
						FileUpdater.open("PUT", "https://api.github.com/repos/" + Gitthis.Repo.RepoURL + "/contents/" + Path + "?access_token=" + Gitthis.Token, true);
						
						FileUpdater.onload = function (Event) {
							console.log("<Sync Helper || Repo.File.Write> it has finished without any problems.");
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
					FileGetter.open("GET", "https://api.github.com/repos/" + Gitthis.Repo.RepoURL + "/contents/" + Path + "?ref=" + (Branch ? Branch : "master") + "&access_token=" + Gitthis.Token, false);
					FileGetter.send(null);
					
				var ContentGetter = new XMLHttpRequest();
					ContentGetter.open("GET", JSON.parse(FileGetter.responseText).git_url + "?access_token=" + Gitthis.Token, false);
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
					VaildChecker.open("GET", "https://api.github.com/repos/" + Gitthis.Repo.RepoURL + "/contents/" + Path + "?ref=" + (Branch ? Branch : "master") + "&access_token=" + Gitthis.Token, false);
					VaildChecker.send(null);
					
				return VaildChecker.status == 404 ? false : true;
			}
		}
	}
}

var GoogleAPI = function (ClientID, RedirectURL, Scope) {
	Googlethis = this;
	
	this.ClientID = ClientID,
	this.RedirectURL = RedirectURL,
	this.Scope = Scope;
	
	this.Token = "";
	
	this.Login = function () {
		window.open("https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=" + Googlethis.RedirectURL + "&scope=" + Googlethis.Scope + "&client_id=" + Googlethis.ClientID, "Googleアカウントでログイン", "width=" + window.outerWidth / 3 + ", height=" + window.outerHeight / 2 + ", left=" + (window.outerWidth - window.outerWidth / 3) / 2 + ", top=" + (window.outerHeight - window.outerHeight / 2) / 2);
	}
	
	Googlethis.Login();
}

var TwitterAPI = function () {
	Twitterthis = this;
}