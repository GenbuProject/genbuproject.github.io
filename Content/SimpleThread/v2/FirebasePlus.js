const FirebasePlus = (function () {
	let project = null,
		auth = null,
		database = null;

	function FirebasePlus (option, onLoad) {
		onLoad = onLoad || (() => {});

		project = firebase.initializeApp(option);
		auth = project.auth(),
		database = project.database();

		auth.onAuthStateChanged((user) => {
			onLoad();
		});
	}; FirebasePlus.prototype = Object.create(Function.prototype, {
		constructor: { value: FirebasePlus },

		user: { get () { return auth.currentUser } },



		Database: {
			value: Object.create(Object.prototype, {
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

				auth.signInWithRedirect(provider);
			},

			enumerable: true
		}
	});

	return FirebasePlus;
})();