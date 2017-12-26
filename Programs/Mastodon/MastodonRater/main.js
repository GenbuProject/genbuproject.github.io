class AppInfo {
	static get Instances () {
		return class Instances extends Array {
			constructor () {
				super();

				if (!sessionStorage.getItem(KEYS.INSTANCES)) this.save();
				this.load();
			}

			add (instance = "") {
				if (!this.exist(instance)) {
					this.push(instance);
					this.save();
				}
			}

			remove (instance = "") {
				this.forEach((item, index) => {
					if (instance == item) this.splice(index, 1);
				});

				this.save();
			}

			clear () {
				while (this.length) this.splice(0, 1);
			}

			exist (instance = "") {
				let hasInstance = false;

				this.forEach(item => {
					if (instance == item) hasInstance = true;
				});

				return hasInstance;
			}

			save (val) { sessionStorage.setItem(KEYS.INSTANCES, JSON.stringify(val || this || [])) }

			load () {
				this.clear();

				let items = JSON.parse(sessionStorage.getItem(KEYS.INSTANCES));
					items.forEach(instance => this.push(instance));
			}
		}
	}

	static get instances () { return new AppInfo.Instances() }



	constructor () {
		if (!AppInfo.instances) AppInfo.instances.add("");
	}
	
	//.name(String)
	//.website(String)
	//.scopes(Array)
	//.redirectUrl(String)

	get instance () { return sessionStorage.getItem(KEYS.INSTANCE) }
	set instance (url = "") { sessionStorage.setItem(KEYS.INSTANCE, url) }

	get clientId () { return sessionStorage.getItem(`${KEYS.CLIENTID}?${this.instance}`) }
	set clientId (clientId = "") { sessionStorage.setItem(`${KEYS.CLIENTID}?${this.instance}`, clientId) }

	get secretId () { return sessionStorage.getItem(`${KEYS.SECRETID}?${this.instance}`) }
	set secretId (secretId = "") { sessionStorage.setItem(`${KEYS.SECRETID}?${this.instance}`, secretId) }

	get accessToken () { return sessionStorage.getItem(`${KEYS.ACCESSTOKEN}?${this.instance}`) }
	set accessToken (token = "") { sessionStorage.setItem(`${KEYS.ACCESSTOKEN}?${this.instance}`, token) }
}



const IDS = {
	AUTH: {
		ROOT: "authPanel",

		FORM: {
			ROOT: "authPanel_authForm",

			INSTANCE: "authPanel_authForm_instanceUrl-input",
			SUBMIT: "authPanel_authForm_submit"
		}
	},

	CONTROL: {
		ROOT: "controlPanel"
	}
}

const KEYS = {
	INSTANCE: "com.GenbuProject.MastodonRater.currentInstance",
	CLIENTID: "com.GenbuProject.MastodonRater.clientId",
	SECRETID: "com.GenbuProject.MastodonRater.secretId",
	ACCESSTOKEN: "com.GenbuProject.MastodonRater.accessToken",
	INSTANCES: "com.GenbuProject.MastodonRater.instances"
}

const DEFAULT = "https://mstdn.y-zu.org";



let app = null,
	appInfo = new AppInfo();

	appInfo.name = "MastodonRater";
	appInfo.website = "https://genbuproject.github.io/Programs/Mastodon/MastodonRater/";
	appInfo.scopes = ["read", "write"];

	appInfo.redirectUrl = (() => {
		let url = new URL(location.href);
			url.search = "";

		return url.href;
	})();



window.addEventListener("DOMContentLoaded", () => {
	window.mdc.autoInit();



	let authForm = document.getElementById(IDS.AUTH.FORM.ROOT);
	let instanceUrl = document.getElementById(IDS.AUTH.FORM.INSTANCE);

	let authBtn = authForm.querySelector(`#${IDS.AUTH.FORM.SUBMIT}`);
		authBtn.addEventListener("click", () => {
			if (instanceUrl.checkValidity()) {
				appInfo.instance = instanceUrl.value;
				app = new MastodonAPI({ instance: appInfo.instance, api_user_token: "" });

				app.registerApplication(appInfo.name, appInfo.redirectUrl, appInfo.scopes, appInfo.website, res => {
					console.log(res);

					appInfo.clientId = res.client_id,
					appInfo.secretId = res.client_secret;

					location.href = app.generateAuthLink(appInfo.clientId, appInfo.redirectUrl, "code", appInfo.scopes);
				});
			}
		});


		
	let query = location.querySort();
	
	if (appInfo.accessToken) {
		app = new MastodonAPI({ instance: appInfo.instance, api_user_token: appInfo.accessToken });
	} else if (query.CODE) {
		app = new MastodonAPI({ instance: appInfo.instance });

		app.getAccessTokenFromAuthCode(appInfo.clientId, appInfo.secretId, appInfo.redirectUrl, query.CODE, res => {
			console.log(res);

			AppInfo.instances.add(appInfo.instance);
			appInfo.accessToken = res.access_token;
			app.setConfig("api_user_token", appInfo.accessToken);
		});
	} else {
		instanceUrl.value = appInfo.instance = DEFAULT;
	}
});

/*
let serverInfo = JSON.parse(
	DOM.xhr({
		type: "GET",
		url: "/api/v1/instance"
	}).response
);

let userInfo = JSON.parse(
	DOM.xhr({
		type: "GET",
		url: "/api/v1/accounts/verify_credentials",

		params: { "access_token": sessionStorage.getItem("com.GenbuProject.MastodonRater.accessToken") }
	}).response
);

let serverToots = serverInfo.stats.status_count,
	userToots = userInfo.statuses_count;

contents.value = [
	"#トゥート率",
	`@${userInfo.username} さんの`,
	`トゥート率は${(userToots / serverToots * 100).toFixed(2)}%です！`,
	`(Tooted from UtilBtns ${VERSION})`
].join("\r\n");
*/