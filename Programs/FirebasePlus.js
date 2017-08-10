const FirebasePlus = (function () {
	let project = null,
		auth = null,
		database = null,
		storage = null;

	function FirebasePlus (option, onLoad) {
		onLoad = onLoad || ((user) => {});

		project = firebase.initializeApp(option);
		auth = project.auth(),
		database = project.database(),
		storage = project.storage();

		auth.onAuthStateChanged((user) => {
			onLoad(user);
		});
	}; FirebasePlus.prototype = Object.create(Function.prototype, {
		constructor: { value: FirebasePlus },

		user: { get () { return auth.currentUser } },



		Database: {
			value: Object.create(Object.prototype, {
				connect: {
					value (path, onConnect) {
						path = path || "",
						onConnect = onConnect || ((res) => {});

						database.ref(path).on("value", (res) => {
							onConnect(res);
						});
					},

					enumerable: true
				},

				getFile: {
					value (path) {
						return database.ref(path || "");
					},

					enumerable: true
				},

				getInfo: {
					value (path, onGet) {
						path = path || "",
						onGet = onGet || ((res) => {});

						database.ref(path).once("value").then((res) => {
							onGet(res);
						});
					},

					enumerable: true
				},

				get: {
					value (path, onGet) {
						path = path || "",
						onGet = onGet || ((res) => {});

						database.ref(path).once("value").then((res) => {
							onGet(res.val());
						});
					},

					enumerable: true
				},

				set: {
					value (path, val) {
						path = path || "",
						val = val || "";

						database.ref(path).set(val);
					},

					enumerable: true
				},

				update: {
					value (path, val) {
						path = path || "",
						val = val || "";

						database.ref(path).update(val);
					},

					enumerable: true
				},

				delete: {
					value (path) {
						path = path || "";
						database.ref(path).remove();
					},

					enumerable: true
				}
			}),

			enumerable: true
		},

		Storage: {
			value: Object.create(Object.prototype, {

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

				auth.signInWithRedirect(provider);
			},

			enumerable: true
		},

		signOut: {
			value () {
				auth.signOut();
				location.reload();
			},

			enumerable: true
		},

		reauth: {
			value (scope) {
				scope = scope || [""];

				let provider = new firebase.auth.GoogleAuthProvider();
					scope.forEach((value) => {
						provider.addScope(value);
					});

				return this.user.reauthenticateWithPopup(provider);
			},

			enumerable: true
		},

		delete: {
			value () {
				this.reauth([]).then((res) => {
					this.Database.delete("users/" + this.user.uid);
					database.goOffline();
					
					this.user.delete();

					database.goOnline();
					location.reload();
				});
			},

			enumerable: true
		}
	});

	return FirebasePlus;
})();