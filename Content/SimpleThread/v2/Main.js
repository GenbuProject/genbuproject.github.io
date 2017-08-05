const SimpleThread = (() => {
	function SimpleThread (option) {
		firebase.initializeApp(option);

		firebase.auth().getRedirectResult().then((res) => {
			console.log(res);

			if (res.credential) {
				this.credentialInfo = {
					accessToken: res.credential.accessToken,
					refreshToken: res.user.refreshToken,
					userId: res.user.uid
				};
			}
		});
	}; SimpleThread.prototype = Object.create(Function.prototype, {
		constructor: { value: SimpleThread },
		
		__credentialInfo: { value: {}, configurable: true, writable: true },

		credentialInfo: {
			get () {
				return this.__credentialInfo;
			},

			set (val) {
				this.__credentialInfo = val;

				localStorage.setItem("accessToken", val.accessToken),
				localStorage.setItem("refreshToken", val.refreshToken),
				localStorage.setItem("userId", val.userId);
			}
		},



		signIn: {
			/**
			 * @param {Array<String>} scope
			 */
			value (scope) {
				scope = scope || [""];

				let provider = new firebase.auth.GoogleAuthProvider();
					scope.forEach((value) => {
						provider.addScope(value);
					});

				firebase.auth().signInWithRedirect(provider);
			}
		}
	});

	return SimpleThread;
})();

window.addEventListener("DOMContentLoaded", () => {
	DOM("$Input#Btns_SignIn").addEventListener("click", () => {
		base.signIn(["https://www.googleapis.com/auth/plus.login"]);
	});

	DOM("$Input#Info_Apply").addEventListener("click", () => {
		let database = firebase.database();
			database.ref(["user", localStorage.getItem("userId")].join("/")).set({
				userName: DOM("$Input#Info_UserName").value,
				nickName: DOM("$Input#Info_NickName").value
			});
	});

	DOM("$Input#Info_Reload").addEventListener("click", () => {
		let database = firebase.database();
			database.ref(["user", localStorage.getItem("userId")].join("/")).on("value", (res) => {
				DOM("$Input#Info_UserName").value = res.val().userName,
				DOM("$Input#Info_NickName").value = res.val().nickName;
			});
	});
});