/*/
 *####################################################################################################
 * Plugin for Yづドン ～ユーティリティボタン～ v1
 * 
 * Author: Genbu Hase
 * Last Updated: 2017/12/15
 * 
 * Details:
 * このプラグインは色々と便利なボタンを追加します。
 *####################################################################################################
/*/
window.addEventListener("DOMContentLoaded", () => {
	let _scriptElem = document.createElement("script");
		_scriptElem.src = "https://genbuproject.github.io/Programs/DOM Extender/DOM Extender v3.4.js";

		_scriptElem.addEventListener("load", () => {
			const IDS = {
				CONTAINER: "btn-extender",

				BUTTONS: {
					GOJI: "btn-extender__button--goji",
					HARUKIN: "btn-extender__button--harukin",
					TOOTRATE: "btn-extender__button--toot-rate"
				}
			}

			const CLASSES = {
				BUTTON: "btn-extender__button"
			}



			let form = new DOM("$.compose-form"),
				btnContainer = new DOM("Div", {
					id: IDS.CONTAINER,
					classes: ["compose-form__publish-button-wrapper"]
				}),

				btnContainerStyle = new Style(
					(() => {
						let obj = {};
							obj[`#${IDS.CONTAINER} > .${CLASSES.BUTTON}`] = {
								"Margin-Bottom": "1em"
							};

						return obj;
					})()
				);
		
				form.appendChild(btnContainer),
				form.appendChild(btnContainerStyle);

			let btns = [
				{
					id: IDS.BUTTONS.GOJI,
					text: "ｺﾞｼﾞﾓﾘｨｨｨｨｨｨ!!!",

					onclick: (contents, submitBtn) => {
						contents.value = [
							"#誤字に淫夢厨",
							":goji:"
						].join("\r\n");

						submitBtn.click();
					}
				},

				{
					id: IDS.BUTTONS.HARUKIN,
					text: "はるきん焼却",

					onclick: (contents, submitBtn) => {
						contents.value = [
							":harukin: :harukin: :harukin: :harukin: :harukin: :harukin:",
							"🔥 🔥 🔥 🔥 🔥 🔥"
						].join("\r\n");

						submitBtn.click();
					}
				},

				{
					id: IDS.BUTTONS.TOOTRATE,
					text: "トゥート率投稿",

					onclick: (contents, submitBtn) => {
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

								params: { "access_token": "f56a74678dbfbf111ca2f210b1a3cf225b5b1582f070dd2cb961e8b2f64b87f0" }
							}).response
						);

						let serverToots = serverInfo.stats.status_count,
							userToots = userInfo.statuses_count;

						contents.value = [
							"《トゥート率》",
							`@${userInfo.username} さんの`,
							`トゥート率は${(userToots / serverToots * 100).toFixed(2)}%です！`
						].join("\r\n");

						submitBtn.click();
					}
				}
			];	btns.forEach(btnInfo => {
				let contents = new DOM("$Textarea.autosuggest-textarea__textarea"),
					submitBtn = new DOM(`$.compose-form__publish-button-wrapper:Not([ID="${IDS.CONTAINER}"]) > Button`);

				btnContainer.appendChild(
					new DOM("Button", {
						id: btnInfo.id,
						classes: ["button", "button--block", CLASSES.BUTTON],

						text: btnInfo.text,

						events: {
							"click": () => {
								btnInfo.onclick(contents, submitBtn);
							}
						}
					})
				)
			});
		});

		document.body.appendChild(_scriptElem);
});