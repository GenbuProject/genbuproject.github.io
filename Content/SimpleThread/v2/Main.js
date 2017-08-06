let base = null;

window.addEventListener("DOMContentLoaded", () => {
	base = new FirebasePlus({
		apiKey: window.atob("QUl6YVN5QTYydVBrTjZXTlY0MW9XV3pPZGlJVE1iQkY5UkRZT2hN"),
		authDomain: "simple-thread.firebaseapp.com",
		databaseURL: "https://simple-thread.firebaseio.com",
		projectId: "simple-thread",
		storageBucket: "simple-thread.appspot.com",
		messagingSenderId: window.atob("NjQ2NTI3MzA2ODAz")
	}, () => {
		DOM("$Span#Account_Info_UserName").textContent = base.user.displayName;
		DOM("$Input#UserInfo_Reload").click();
	});


	
	DOM("$Input#Account_SignIn").addEventListener("click", () => {
		base.signIn([
			"https://www.googleapis.com/auth/plus.login",
			"https://www.googleapis.com/auth/plus.me",
			"https://www.googleapis.com/auth/userinfo.profile"
		]);
	});

	DOM("$Input#Account_SignOut").addEventListener("click", () => {
		base.signOut();
	});

	DOM("$Input#UserInfo_Apply").addEventListener("click", () => {
		base.Database.set(["user", base.user.uid].join("/"), {
			userName: DOM("$Input#UserInfo_UserName").value,
			nickName: DOM("$Input#UserInfo_NickName").value,
			message: DOM("$TextArea#UserInfo_Message").value
		});
	});

	DOM("$Input#UserInfo_Reload").addEventListener("click", () => {
		base.Database.get(["user", base.user.uid].join("/"), (res) => {
			DOM("$Input#UserInfo_UserName").value = res.userName,
			DOM("$Input#UserInfo_NickName").value = res.nickName,
			DOM("$TextArea#UserInfo_Message").value = res.message;
		});
	});
});