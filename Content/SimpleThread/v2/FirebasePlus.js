const FirebasePlus = (function () {
	let AUTH = null,
		DATABASE = null;

	function FirebasePlus (option) {
		firebase.initializeApp(option);

		firebase.auth().getRedirectResult().then((res) => {
			if (res.credential) {
				this.credentialInfo = {
					accessToken: res.credential.accessToken,
					userId: res.user.uid
				};
			}
		});

		AUTH = firebase.auth(),
		DATABASE = firebase.database();
	}; FirebasePlus.prototype = Object.create(Function.prototype, {
		constructor: { value: FirebasePlus },

		_credentialInfo: { value: {}, configurable: true, writable: true },
		credentialInfo: {
			get () {
				return this._credentialInfo;
			},

			set (val) {
				this._credentialInfo = val;
				localStorage.setItem("FirebasePlus_credentialInfo", JSON.stringify(val));
			}
		},



		Database: {
			value: Object.create(Object.prototype, {
				get: {
					value (path, onGet) {
						path = path || "",
						onGet = onGet || ((res) => {});

						DATABASE.ref(path).on("value", (res) => {
							onGet(res.val());
						});
					},

					enumerable: true
				},

				set: {
					value (path, val) {
						path = path || "",
						val = val || "";

						DATABASE.ref(path).set(val);
					},

					enumerable: true
				}
			}),

			enumerable: true
		},



		signIn: {
			value (scope) {
				scope = scope || [""];

				let provider = new firebase.auth.GoogleAuthProvider();
					scope.forEach((value) => {
						provider.addScope(value);
					});

				AUTH.signInWithRedirect(provider);
			},

			enumerable: true
		}
	});

	return FirebasePlus;
})();