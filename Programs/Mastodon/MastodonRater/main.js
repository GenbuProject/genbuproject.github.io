class AppInfo {
	constructor () {}
	
	//.name(String)
	//.website(String)
	//.scopes(Array)
	//.redirectUrl(String)

	get instanceUrl () { return localStorage.getItem("com.GenbuProject.MastodonRater.currentInstance") }
	set instanceUrl (url = "") { localStorage.setItem("com.GenbuProject.MastodonRater.currentInstance", url) }

	get clientId () { return localStorage.getItem(`com.GenbuProject.MastodonRater.clientId?${this.instanceUrl}`) }
	set clientId (clientId = "") { localStorage.setItem(`com.GenbuProject.MastodonRater.clientId?${this.instanceUrl}`, clientId) }

	get secretId () { return localStorage.getItem(`com.GenbuProject.MastodonRater.secretId?${this.instanceUrl}`) }
	set secretId (secretId = "") { localStorage.setItem(`com.GenbuProject.MastodonRater.secretId?${this.instanceUrl}`, secretId) }
}



const DEFAULT = "https://mstdn.y-zu.org";

let appInfo = new AppInfo();
	appInfo.name = "MastodonRater";
	appInfo.website = "https://genbuproject.github.io/Programs/Mastodon/MastodonRater/";
	appInfo.scopes = ["read", "write"];

	appInfo.redirectUrl = (() => {
		let url = new URL(location.href);
			url.search = "";

		return url.href;
	})();

let app = null;



window.addEventListener("DOMContentLoaded", () => {
	window.mdc.autoInit();



	let authForm = new DOM("#authForm");
	let instanceUrl = authForm.querySelector("#authForm_instanceUrl-input");

	let authBtn = authForm.querySelector("#authForm_auth");
		authBtn.addEventListener("click", () => {
			if (instanceUrl.checkValidity()) {
				appInfo.instanceUrl = instanceUrl.value;
				app = new MastodonAPI({ instance: appInfo.instanceUrl, api_user_token: "" });

				app.registerApplication(appInfo.name, appInfo.redirectUrl, appInfo.scopes, appInfo.website, res => {
					console.log(res);

					appInfo.clientId = res.client_id,
					appInfo.secretId = res.client_secret;

					location.href = app.generateAuthLink(appInfo.clientId, appInfo.redirectUrl, "code", appInfo.scopes);
				});
			}
		});


		
	let query = location.querySort();

	if (query.CODE) {
		app = new MastodonAPI({ instance: appInfo.instanceUrl });

		app.getAccessTokenFromAuthCode(appInfo.clientId, appInfo.secretId, appInfo.redirectUrl, query.CODE, res => {
			console.log(res);

			localStorage.setItem(`com.GenbuProject.MastodonRater.accessToken?${appInfo.instanceUrl}`, res.access_token);
		});
	} else {
		instanceUrl.value = appInfo.instanceUrl = DEFAULT;
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

		params: { "access_token": localStorage.getItem("com.GenbuProject.MastodonRater.accessToken") }
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