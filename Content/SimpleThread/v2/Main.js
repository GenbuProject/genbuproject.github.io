let base = null;

window.addEventListener("DOMContentLoaded", () => {
	base = new FirebasePlus({
		apiKey: "AIzaSyA62uPkN6WNV41oWWzOdiITMbBF9RDYOhM",
		authDomain: "simple-thread.firebaseapp.com",
		databaseURL: "https://simple-thread.firebaseio.com",
		projectId: "simple-thread",
		storageBucket: "simple-thread.appspot.com",
		messagingSenderId: "646527306803"
	}, () => {
		DOM("$Span#SignIn_Info_UserName").textContent = base.user.displayName;
		DOM("$Input#Info_Reload").click();
	});


	
	DOM("$Input#SignIn_Apply").addEventListener("click", () => {
		base.signIn(["https://www.googleapis.com/auth/plus.login"]);
	});

	DOM("$Input#Info_Apply").addEventListener("click", () => {
		base.Database.set(["user", base.user.uid].join("/"), {
			userName: DOM("$Input#Info_UserName").value,
			nickName: DOM("$Input#Info_NickName").value
		});
	});

	DOM("$Input#Info_Reload").addEventListener("click", () => {
		base.Database.get(["user", base.user.uid].join("/"), (res) => {
			DOM("$Input#Info_UserName").value = res.userName,
			DOM("$Input#Info_NickName").value = res.nickName;
		});
	});
});