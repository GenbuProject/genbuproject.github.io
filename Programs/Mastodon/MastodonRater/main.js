const IDS = {
	AUTH: {
		ROOT: "authPanel",

		FORM: {
			ROOT: "authPanel_authForm",

			INSTANCE: "authPanel_authForm_instanceUrl_items",
			SUBMIT: "authPanel_authForm_submit"
		}
	},

	CONTROL: {
		ROOT: "controlPanel",
		SIGNOUT: "controlPanel_signOut",

		APPS: {
			ROOT: "controlPanel_apps",

			TOOTRATER: "controlPanel_apps_app-tootRater",
			TPD: "controlPanel_apps_app-tpd",
			REVELANCE: "controlPanel_apps_app-relevanceAnalyzer"
		}
	},

	NOTIFY: "notify"
}

const CLASSES = {
	PANEL: {
		ROOT: "mstdnRater_panel",
		DISABLED: "mstdnRater_panel-disabled"
	}
}

const SERVERS = {
	"https://mstdn.y-zu.org": {
		CLIENTID: "bca80b2d45ed527ce2df258c221f9adfb6bf5deee793e7da8b6b024e0a3172cc",
		SECRETID: "cb265cd91b565af0135544ba8e962f984da1f688ad6da44752de7988449600b0"
	},

	"https://mstdn.kemono-friends.info": {
		CLIENTID: "0a23fb3bd0f024f1acc0fe28cda94f6a457b4189548e1bcabee31d3fe597a847",
		SECRETID: "04a94354faf8885c8c5a70327e4d5ebec18856a5ecfa0961055ee70e41b24563"
	}
}



let app = null;

let appInfo = new AppInfo();
	appInfo.scopes = ["read", "write"],
	appInfo.redirectUrl = (() => {
		let url = new URL(location.href);
			url.search = "";

		return url.href;
	})();



window.addEventListener("DOMContentLoaded", () => {
	window.mdc.autoInit();



	let query = location.querySort();
	
	if (appInfo.accessToken) {
		app = new MastodonAPI({ instance: appInfo.instance, api_user_token: appInfo.accessToken });

		document.getElementById(IDS.AUTH.ROOT).classList.toggle(CLASSES.PANEL.DISABLED),
		document.getElementById(IDS.CONTROL.ROOT).classList.toggle(CLASSES.PANEL.DISABLED);
	} else if (query.CODE) {
		app = new MastodonAPI({ instance: appInfo.instance });

		app.getAccessTokenFromAuthCode(SERVERS[appInfo.instance].CLIENTID, SERVERS[appInfo.instance].SECRETID, appInfo.redirectUrl, query.CODE, res => {
			console.log(res);

			appInfo.accessToken = res.access_token;
			location.href = appInfo.redirectUrl;
		});
	}
});

window.addEventListener("DOMContentLoaded", () => {
	let authForm = document.getElementById(IDS.AUTH.FORM.ROOT);
		authForm.querySelector(`#${IDS.AUTH.FORM.SUBMIT}`).addEventListener("click", () => {
			let instanceUrl = authForm.querySelector(`#${IDS.AUTH.FORM.INSTANCE}`);
			
			if (instanceUrl.checkValidity()) {
				appInfo.instance = instanceUrl.value;
				app = new MastodonAPI({ instance: appInfo.instance });

				location.href = app.generateAuthLink(SERVERS[appInfo.instance].CLIENTID, appInfo.redirectUrl, "code", appInfo.scopes);
			}
		});

	let controlPanel = document.getElementById(IDS.CONTROL.ROOT);
		controlPanel.querySelector(`#${IDS.CONTROL.SIGNOUT}`).addEventListener("click", () => {
			appInfo.accessToken = "",
			appInfo.instance = "";

			location.reload();
		});

	let apps = document.getElementById(IDS.CONTROL.APPS.ROOT);
		apps.querySelector(`#${IDS.CONTROL.APPS.TOOTRATER}`).addEventListener("click", (event) => {
			event.preventDefault();

			let serverInfo = {},
				userInfo = {};

				app.get("instance").then(res => serverInfo = res).then(res => {
					app.get("accounts/verify_credentials").then(res => userInfo = res).then(res => {
						let serverToots = serverInfo.stats.status_count,
							userToots = userInfo.statuses_count;

						app.post("statuses", {
							status: [
								`@${userInfo.username} さんの`,
								`#トゥート率 は${(userToots / serverToots * 100).toFixed(2)}%です！`,
								"",
								"(Tooted from #MastodonRater)"
							].join("\r\n")
						}).then(() => notify.show());
					});
				});
		});

		apps.querySelector(`#${IDS.CONTROL.APPS.TPD}`).addEventListener("click", (event) => {
			event.preventDefault();

			app.get("accounts/verify_credentials").then(res => {
				let nowTime = new Date().getTime(),
					createdAt = new Date(res.created_at).getTime();

				let countDays = Math.floor((nowTime - createdAt) / (1000 * 60 * 60 * 24));

				app.post("statuses", {
					status: [
						`@${res.username} さんの`,
						`#TPD は${Math.floor(res.statuses_count / countDays)}です！`,
						"",
						"(Tooted from #MastodonRater)"
					].join("\r\n")
				}).then(() => notify.show());
			});
		});

	let notify = new Notify(document.getElementById(IDS.NOTIFY));


	
	let query = location.querySort();
	
	if (!appInfo.accessToken && !query.CODE) {
		let instances = authForm.querySelector(`#${IDS.AUTH.FORM.INSTANCE}`);

		for (let server in SERVERS) {
			instances.add(new Option(server, server));
		}
	}
});