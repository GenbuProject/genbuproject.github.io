let R = {
	Token: atob("YWIzNWNjODEyNDA0M2FjZmRmZmUxOTZjMGYzM2NlNjg4NzY3N2YyMg=="),
	Comments: []
}

const CommentDiv = function (CTitle, CContent, CCommentator, CDate) {
	let Root = document.createElement("Li");
	
	let Wrapper = document.createElement("Div");
		Wrapper.className = "Comment";
		
		Wrapper.appendChild(CTitle);
		Wrapper.appendChild(CContent);
		Wrapper.appendChild(CCommentator);
		Wrapper.appendChild(CDate);
		
	Root.appendChild(Wrapper);
	
	return Root;
}

const CTitle = function (Str) {
	let Elem = document.createElement("CTitle");
		Elem.textContent = Str;
		
	return Elem;
}

const CContent = function (Str) {
	let Elem = document.createElement("CContent");
		Elem.textContent = Str;
		
	return Elem;
}

const CCommentator = function (Str) {
	let Elem = document.createElement("CCommentator");
		Elem.textContent = Str;
		
	return Elem;
}

const CDate = function (Str) {
	let Elem = document.createElement("CDate");
		Elem.textContent = Str;
		
	return Elem;
}



let GitBase = new GitAPI(R.Token);
	GitBase.Repo.RepoURL = "GenbuProject/genbuproject.github.io";
	
const Util = {
	Load: function () {
		if (!GitBase.Repo.File.IsVaild("Content/Chat with Sync Helper/Comments.Json")) {
			GitBase.Repo.File.Create("Content/Chat with Sync Helper/Comments.Json");
			
			setTimeout(function () {
				GitBase.Repo.File.Write("Content/Chat with Sync Helper/Comments.Json", "[]");
				console.log("Created.");
			}, 5000);
			
			R.Comments = [];
		} else {
			R.Comments = JSON.parse(GitBase.Repo.File.Read("Content/Chat with Sync Helper/Comments.Json"));
		}
	},
	
	Send: function (Title, Content, Commentator, Date) {
		R.Comments.push({
			Title: Title,
			Content: Content,
			Commentator: Commentator,
			Date: Date
		});
		
		GitBase.Repo.File.Write("Content/Chat with Sync Helper/Comments.Json", JSON.stringify(R.Comments, null, "\t"));
		
		return R.Comments;
	},
	
	Reload: function () {
		Util.Load();
		
		let Elem = document.getElementById("Comments");
		
		while (Elem.children.length > 0) {
			Elem.removeChild(Elem.children[0]);
		}
		
		for (let i = 0; i < R.Comments.length; i++) {
			let Comment = new CommentDiv(new CTitle(R.Comments[i].Title), new CContent(R.Comments[i].Content), new CCommentator(R.Comments[i].Commentator), new CDate(R.Comments[i].Date));
			Elem.appendChild(Comment);
		}
	}
}

function Init() {
	setInterval(function () {
		Util.Reload();
	}, 30000);
	
	Util.Reload();
}