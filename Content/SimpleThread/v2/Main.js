window.addEventListener("DOMContentLoaded", () => {
	DOM("$Input#Btns_SignIn").addEventListener("click", () => {
		base.signIn(["https://www.googleapis.com/auth/plus.login"]);
	});

	DOM("$Input#Info_Apply").addEventListener("click", () => {
		base.Database.set(["user", JSON.parse(localStorage.getItem("FirebasePlus_credentialInfo")).userId].join("/"), {
			userName: DOM("$Input#Info_UserName").value,
			nickName: DOM("$Input#Info_NickName").value
		});
	});

	DOM("$Input#Info_Reload").addEventListener("click", () => {
		base.Database.get(["user", JSON.parse(localStorage.getItem("FirebasePlus_credentialInfo")).userId].join("/"), (res) => {
			DOM("$Input#Info_UserName").value = res.userName,
			DOM("$Input#Info_NickName").value = res.nickName;
		});
	});
});