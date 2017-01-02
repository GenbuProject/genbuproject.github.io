let R = {
	Token: atob("YWIzNWNjODEyNDA0M2FjZmRmZmUxOTZjMGYzM2NlNjg4NzY3N2YyMg=="),
	ThreadsCount: 0
}

let GitBase = new GitAPI(R.Token);
	GitBase.Repo.RepoURL = "GenbuProject/genbuproject.github.io";
	
const Util = {
	GetThreadsCount: function () {
		return GitBase.Repo.File.Get("Content/SimpleThread/Threads").length;
	}
}

function Init() {
	let TCount = document.getElementsByTagName("TCount");
	
	R.ThreadsCount = Util.GetThreadsCount();
	
	for (let i = 0; i < TCount.length; i++) {
		TCount[i].textContent = R.ThreadsCount;
	}
}