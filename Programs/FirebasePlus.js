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
				getInfo: {
					value (path, onGet) {
						path = path || "",
						onGet = onGet || ((res) => {});

						database.ref(path).on("value", (res) => {
							onGet(res);
						});
					}
				},

				get: {
					value (path, onGet) {
						path = path || "",
						onGet = onGet || ((res) => {});

						database.ref(path).on("value", (res) => {
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
					}
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
		}
	});

	return FirebasePlus;
})();