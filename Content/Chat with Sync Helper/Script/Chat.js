let GitBase = new GitAPI(atob("YWIzNWNjODEyNDA0M2FjZmRmZmUxOTZjMGYzM2NlNjg4NzY3N2YyMg=="));
	GitBase.Repo.RepoURL = "GenbuProject/genbuproject.github.io";
	
let CommentData = null;

function ResourceLoad() {
	GitBase.Repo.File.Create("Content/Chat with Sync Helper/Comments.Json");
	CommentData = GitBase.Repo.File.Read("Content/Chat with Sync Helper/Comments.Json");
}

function SendComment(Title, Content, Commentator, CommentDate) {
	let Data = JSON.stringify({
		Title: Title,
		Content: Content,
		Commentator: Commentator,
		CommentDate: CommentDate
	});
	
	GitBase.Repo.File.Write("Content/Chat with Sync Helper/Comments.Json", Data);
	
	return Data;
}