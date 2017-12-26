let app = new MastodonAPI({ instance: "https://mstdn.y-zu.org", api_user_token: localStorage.getItem("com.GenbuProject.MastodonRater.accessToken") });
	app.clientId = "27f8012bbcfe4ee9120c1b86d4610fa420a83a57ab634963c176441c1957781d";
	app.secretId = "bca2239b592f98ba8e195497ec35f99499e2dfd94ed16f29a6848a293a5eb3cc";

window.addEventListener("DOMContentLoaded", () => {
	window.mdc.autoInit();
	new mdc.toolbar.MDCToolbar(new DOM('$Header'));


	
	let query = location.querySort();

	if (!query.CODE) {
		//location.href = app.generateAuthLink(app.clientId, location.href, "code", ["read"]);
	} else {
		app.getAccessTokenFromAuthCode(app.clientId, app.secretId, location.href.replace(`?code=${query.CODE}`, ""), query.CODE, res => {
			console.log(res);

			localStorage.setItem("com.GenbuProject.MastodonRater.accessToken", res.access_token);
		});
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