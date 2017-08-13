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
				ONCE: {
					value: Symbol.for("ONCE"),
					enumerable: true
				},

				INTERVAL: {
					value: Symbol.for("INTERVAL"),
					enumerable: true
				},



				getInfo: {
					value (mode, path, onGet) {
						mode = mode || this.ONCE,
						path = path || "",
						onGet = onGet || ((res) => {});

						if (mode === this.ONCE) {
							database.ref(path).once("value").then((res) => {
								onGet(res);
							});
						} else if (mode === this.INTERVAL) {
							database.ref(path).on("value", (res) => {
								onGet(res);
							});
						}
					},

					enumerable: true
				},

				get: {
					value (mode, path, onGet) {
						mode = mode || this.ONCE,
						path = path || "",
						onGet = onGet || ((res) => {});

						if (mode === this.ONCE) {
							database.ref(path).once("value").then((res) => {
								onGet(res.val());
							});
						} else if (mode === this.INTERVAL) {
							database.ref(path).on("value", (res) => {
								onGet(res.val());
							});
						}
					},

					enumerable: true
				},

				set: {
					value (path, val, onComplete) {
						path = path || "",
						val = val || "",
						onComplete = onComplete || ((error) => {});

						database.ref(path).set(val, onComplete);
					},

					enumerable: true
				},

				push: {
					value (path, val, onComplete) {
						path = path || "",
						val = val || null,
						onComplete = onComplete || ((error) => {});

						database.ref(path).push(val, onComplete);
					}
				},

				delete: {
					value (path, onComplete) {
						path = path || "",
						onComplete = onComplete || ((error) => {});

						database.ref(path).remove(onComplete);
					},

					enumerable: true
				},

				update: {
					value (path, val, onComplete) {
						path = path || "",
						val = val || "",
						onComplete = onComplete || ((error) => {});

						database.ref(path).update(val, onComplete);
					},

					enumerable: true
				},

				transaction: {
					value (path, onGet, onComplete) {
						path = path || "",
						onGet = onGet || ((res) => {}),
						onComplete = onComplete || ((error) => {});

						database.ref(path).transaction(onGet, onComplete);
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
				this.reauth([""]).then((res) => {
					this.Database.delete("users/" + this.user.uid);
					this.user.delete();
					
					location.reload();
				});
			},

			enumerable: true
		}
	});

	return FirebasePlus;
})();