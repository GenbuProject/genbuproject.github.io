const FirebasePlus = (function () {
	let project = null,
		auth = null,
		database = null,
		storage = null;

	let onLoad = null;

	function FirebasePlus (option = {}, onLoad = (user) => {}) {
		project = firebase.initializeApp(option);
		auth = project.auth(),
		database = project.database(),
		storage = project.storage();

		onLoad = onLoad;

		auth.onAuthStateChanged((user) => {
			onLoad(user);
		});
	}; FirebasePlus.prototype = Object.create(Function.prototype, {
		constructor: { value: FirebasePlus },

		SIGNINTYPE: {
			get () {
				return {
					GOOGLE: Symbol.for("GOOGLE"),
					ANONYMOUS: Symbol.for("ANONYMOUS")
				}
			},

			enumerable: true
		},



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
					value (mode = this.ONCE, path = "", onGet = (res) => {}) {
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
					value (mode = this.ONCE, path = "", onGet = (res) => {}) {
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
					value (path = "", val = "", onComplete = (error) => {}) {
						database.ref(path).set(val, onComplete);
					},

					enumerable: true
				},

				push: {
					value (path = "", val = "", onComplete = (error) => {}) {
						database.ref(path).push(val, onComplete);
					}
				},

				delete: {
					value (path = "", onComplete = (error) => {}) {
						database.ref(path).remove(onComplete);
					},

					enumerable: true
				},

				update: {
					value (path = "", val = "", onComplete = (error) => {}) {
						database.ref(path).update(val, onComplete);
					},

					enumerable: true
				},

				transaction: {
					value (path = "", onGet = (res) => {}, onComplete = (error) => {}) {
						database.ref(path).transaction(onGet, onComplete);
					},

					enumerable: true
				},

				sortByChild: {
					value (path = "", childKey = "", onGet = (res) => {}, sortOption = new FirebasePlus.SortManager()) {
						let query = sortOption.apply(database.ref(path).orderByChild(childKey));
							query.on("child_added", (res) => {
								onGet(res);
							});
					}
				},

				sortByKey: {
					value (path = "", onGet = (res) => {}, sortOption = new FirebasePlus.SortManager()) {
						let query = sortOption.apply(database.ref(path).orderByKey());
							query.on("child_added", (res) => {
								onGet(res);
							});
					}
				},

				sortByValue: {
					value (path = "", onGet = (res) => {}, sortOption = new FirebasePlus.SortManager()) {
						let query = sortOption.apply(database.ref(path).orderByValue());
							query.on("child_added", (res) => {
								onGet(res);
							});
					}
				},

				sortByPriority: {
					value (path = "", onGet = (res) => {}, sortOption = new FirebasePlus.SortManager()) {
						let query = sortOption.apply(database.ref(path).orderByPriority());
							query.on("child_added", (res) => {
								onGet(res);
							});
					}
				},
			}),

			enumerable: true
		},

		Storage: {
			value: Object.create(Object.prototype, {

			}),

			enumerable: true
		},



		user: { get () { return auth.currentUser } },

		signInWithRedirect: {
			value (signInType = this.SIGNINTYPE.GOOGLE, scope = [""]) {
				let provider = null;

				switch (signInType) {
					case this.SIGNINTYPE.GOOGLE:
						provider = new firebase.auth.GoogleAuthProvider();
						break;

					case this.SIGNINTYPE.ANONYMOUS:
						this.signInWithAnonymous();
						return;

						break;
				}

				scope.forEach((value) => {
					provider.addScope(value);
				});

				localStorage.setItem("com.GenbuProject.FirebasePlus.signInType", Symbol.keyFor(signInType)),
				localStorage.setItem("com.GenbuProject.FirebasePlus.signInScope", scope.toString());
				
				auth.signInWithRedirect(provider);
			},

			enumerable: true
		},

		signInWithPopup: {
			value (signInType = this.SIGNINTYPE.GOOGLE, scope = [""]) {
				let provider = null;

				switch (signInType) {
					case this.SIGNINTYPE.GOOGLE:
						provider = new firebase.auth.GoogleAuthProvider();
						break;

					case this.SIGNINTYPE.ANONYMOUS:
						this.signInWithAnonymous();
						return;
						
						break;
				}

				scope.forEach((value) => {
					provider.addScope(value);
				});

				localStorage.setItem("com.GenbuProject.FirebasePlus.signInType", Symbol.keyFor(signInType)),
				localStorage.setItem("com.GenbuProject.FirebasePlus.signInScope", scope.toString());
				
				auth.signInWithPopup(provider).then(res => {
					onLoad(res.user);
				});
			},

			enumerable: true
		},

		signInWithAnonymous: {
			value () {
				localStorage.setItem("com.GenbuProject.FirebasePlus.signInType", "Anonymous"),
				localStorage.setItem("com.GenbuProject.FirebasePlus.signInScope", "[]");

				auth.signInAnonymously();
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
			value (scope = [""]) {
				let provider = null;
				
				switch (localStorage.getItem("com.GenbuProject.FirebasePlus.signInType")) {
					case Symbol.keyFor(this.SIGNINTYPE.GOOGLE):
						provider = new firebase.auth.GoogleAuthProvider();
						break;
				}

				scope.forEach((value) => {
					provider.addScope(value);
				});

				return this.user.reauthenticateWithPopup(provider);
			},

			enumerable: true
		}
	}); Object.defineProperties(FirebasePlus, {
		SortManager: {
			value: (() => {
				function SortManager (option) {
					if (option instanceof String) {
						this.value = option;
					} else if (option instanceof SortManager.Range) {
						this.range = option;
					}
				}; SortManager.prototype = Object.create(null, {
					constructor: { value: SortManager },

					value: { value: "", configurable: true, writable: true, enumerable: true },
					range: { value: null, configurable: true, writable: true, enumerable: true },

					apply: {
						value (query) {
							if (this.value) {
								query = query.equalTo(option.value);
							} else if (this.range) {
								!this.range[0] || (query = query.startAt(this.range[0]));
								!this.range[1] || (query = query.endAt(this.range[1]));
							}

							return query;
						}
					}
				}); Object.defineProperties(SortManager, {
					Range: {
						value: (() => {
							function Range (start, end) {
								let self = Reflect.construct(Array, [], Range);
									!start || (self[0] = start);
									!end || (self[1] = end);

								return self;
							}; Range.prototype = Object.create({
								constructor: { value: Range }
							});

							return Range;
						})(),

						enumerable: true
					}
				});

				return SortManager;
			})(),

			enumerable: true
		}
	});

	return FirebasePlus;
})();