let app = new MastodonAPI({ instance: "https://mstdn.y-zu.org", api_user_token: localStorage.getItem("com.GenbuProject.UtilBtns.accessToken") });
	app.clientId = "27f8012bbcfe4ee9120c1b86d4610fa420a83a57ab634963c176441c1957781d";
	app.secretId = "bca2239b592f98ba8e195497ec35f99499e2dfd94ed16f29a6848a293a5eb3cc";

window.addEventListener("DOMContentLoaded", () => {
	new mdc.toolbar.MDCToolbar(new DOM('$Header'));

	new DOM("#accessToken").addEventListener("click", function () {
		this.select();

		document.execCommand("copy");
	});


	
	let query = location.querySort();

	if (!query.CODE) {
		location.href = app.generateAuthLink(app.clientId, location.href, "code", ["read"]);
	} else {
		app.getAccessTokenFromAuthCode(app.clientId, app.secretId, location.href.replace(`?code=${query.CODE}`, ""), query.CODE, res => {
			console.log(res);

			localStorage.setItem("com.GenbuProject.UtilBtns.accessToken", res.access_token);
			new DOM("#accessToken").value = res.access_token;
		});
	}
});