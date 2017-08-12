window.base = null;

window.addEventListener("DOMContentLoaded", () => {
	base = new FirebasePlus({
		apiKey: window.atob("QUl6YVN5QTYydVBrTjZXTlY0MW9XV3pPZGlJVE1iQkY5UkRZT2hN"),
		authDomain: "simple-thread.firebaseapp.com",
		databaseURL: "https://simple-thread.firebaseio.com",
		projectId: "simple-thread",
		storageBucket: "simple-thread.appspot.com",
		messagingSenderId: window.atob("NjQ2NTI3MzA2ODAz")
	}, (user) => {
		if (user) {
			base.Database.getInfo("users/" + user.uid, (res) => {
				if (!res.exists()) {
					base.Database.set("users/" + user.uid, {
						gplusName: user.providerData[0].displayName,
						detail: "",
						links: []
					});

					document.querySelector("#Dialogs_Account_CreateNotify").showModal();
				}

				base.Database.update("users/" + user.uid, {
					gplusName: user.providerData[0].displayName
				});
			});

			DOM("#Header_AccountPane-Btn_Manager").textContent = (() => {
				return new Style({
					"#Header_AccountPane-Btn": {
						"Background-Image": ["URL(", user.photoURL, ")"].join('"')
					}
				}).textContent;
			})();

			DOM("#Header_SignInOut").textContent = "Sign Out";
		} else {
			DOM("#Header_AccountPane-Btn").setAttribute("SignOut", "");
		}
	});



	DOM("#Header_SignInOut").addEventListener("click", () => {
		alert("Called.");
		
		switch (DOM("#Header_SignInOut").textContent) {
			case "Sign In":
				base.signIn(["https://www.googleapis.com/auth/plus.login"]);
				break;

			case "Sign Out":
				base.signOut();
				break;
		}
	});

	DOM("$IFrame#Page").contentWindow.addEventListener("beforeunload", () => {
		DOM("#Screens_Loading").removeAttribute("Disabled");
	});

	DOM("$IFrame#Page").addEventListener("load", () => {
		DOM("#Screens_Loading").setAttribute("Disabled", "");
	});
});
