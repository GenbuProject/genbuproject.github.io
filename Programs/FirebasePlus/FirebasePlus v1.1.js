/*/
 *#######################################################################
 *FirebasePlus v1.1
 *Copyright (C) 2016 Genbu Project All Rights Reversed.
 *#######################################################################
/*/
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
						switch (mode) {
							case this.ONCE:
								return database.ref(path).once("value").then((res) => {
									onGet(res);
								});

								break;

							case this.INTERVAL:
								return database.ref(path).on("value", (res) => {
									onGet(res);
								});

								break;
						}
					},

					enumerable: true
				},

				get: {
					value (mode = this.ONCE, path = "", onGet = (res) => {}) {
						switch (mode) {
							case this.ONCE:
								return database.ref(path).once("value").then((res) => {
									onGet(res.val());
								});

								break;
								
							case this.INTERVAL:
								return database.ref(path).on("value", (res) => {
									onGet(res.val());
								});

								break;
						}
					},

					enumerable: true
				},

				set: {
					value (path = "", val = "", onComplete = (error) => {}) {
						return database.ref(path).set(val, onComplete);
					},

					enumerable: true
				},

				push: {
					value (path = "", val = "", onComplete = (error) => {}) {
						return database.ref(path).push(val, onComplete);
					}
				},

				delete: {
					value (path = "", onComplete = (error) => {}) {
						return database.ref(path).remove(onComplete);
					},

					enumerable: true
				},

				update: {
					value (path = "", val = "", onComplete = (error) => {}) {
						return database.ref(path).update(val, onComplete);
					},

					enumerable: true
				},

				transaction: {
					value (path = "", onGet = (res) => {}, onComplete = (error) => {}) {
						return database.ref(path).transaction(onGet, onComplete);
					},

					enumerable: true
				},

				setPriority: {
					value (path = "", priority = 0, onComplete = (error) => {}) {
						return database.ref(path).setPriority(priority, onComplete);
					},

					enumerable: true
				},

				sortByChild: {
					value (path = "", childKey = "", onGet = (res) => {}, sortOption = {}) {
						let query = FirebasePlus.SortManager.filter(database.ref(path).orderByChild(childKey), sortOption);
							query.on("child_added", (res) => {
								onGet(res);
							});
					}
				},

				sortByKey: {
					value (path = "", onGet = (res) => {}, sortOption = {}) {
						let query = FirebasePlus.SortManager.filter(database.ref(path).orderByKey(), sortOption);
							query.on("child_added", (res) => {
								onGet(res);
							});
					}
				},

				sortByValue: {
					value (path = "", onGet = (res) => {}, sortOption = {}) {
						let query = FirebasePlus.SortManager.filter(database.ref(path).orderByValue(), sortOption);
							query.on("child_added", (res) => {
								onGet(res);
							});
					}
				},

				sortByPriority: {
					value (path = "", onGet = (res) => {}, sortOption = {}) {
						let query = FirebasePlus.SortManager.filter(database.ref(path).orderByPriority(), sortOption);
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
				function SortManager () {

				}; SortManager.prototype = Object.create(null, {
					constructor: { value: SortManager }
				}); Object.defineProperties(SortManager, {
					filter: {
						value (query, option = {}) {
							if (option.equal) {
								query = query.equalTo(option.equal);
							} else if (option.range) {
								!option.range[0] || (query = query.startAt(option.range[0]));
								!option.range[1] || (query = query.endAt(option.range[1]));
							}

							if (option.amount) {
								!option.amount[0] || (query.limitToFirst(option.amount[0]));
								!option.amount[1] || (query.limitToLast(option.amount[1]));
							}

							return query;
						}
					}
				});

				return SortManager;
			})(),

			enumerable: true
		}
	});

	return FirebasePlus;
})();