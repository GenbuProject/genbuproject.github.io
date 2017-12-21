/*/
 *####################################################################################################
 * Plugin for Yづドン ～ユーティリティボタン～ v4
 * 
 * Based: Mastodon 2.1.0
 * Author: Genbu Hase
 * Last Updated: 2017/12/21
 * 
 * Details:
 * このプラグインは色々と便利なボタンを追加します。
 * まずはこちらで認証を行ってください。
 * 
 * https://genbuproject.github.io/Programs/Y-zuPlugin/UtilBtns/
 *####################################################################################################
/*/
window.addEventListener("DOMContentLoaded", () => {
	let _scriptElem = document.createElement("script");
		_scriptElem.src = "https://genbuproject.github.io/Programs/DOM Extender/DOM Extender v3.4.js";

		_scriptElem.addEventListener("load", () => {
			const VERSION = "v4";

			const IDS = {
				CONTAINER: "utilBtn",
				
				TOKENHOLDER: {
					ROOT: "utilBtn__tokenHolder",

					ACCESSTOKEN: "utilBtn__tokenHolder__input--accessToken",
					AUTH: "utilBtn__tokenHolder__button--auth"
				},

				BUTTONS: {
					GOJI: "utilBtn__button--goji",
					HARUKIN: "utilBtn__button--harukin",
					TOOTRATE: "utilBtn__button--tootRate",
					RISA: "utilBtn__button--risa",
					ZUHO: "utilBtn__button--zuho"
				}
			}

			const CLASSES = {
				BUTTON: "utilBtn__button"
			}



			let form = new DOM("$.compose-form"),
				btnContainer = new DOM("Div", {
					id: IDS.CONTAINER,

					children: [
						new DOM("Div", {
							id: IDS.TOKENHOLDER.ROOT,

							children: [
								new DOM("Input", {
									id: IDS.TOKENHOLDER.ACCESSTOKEN,
									classes: ["search__input"],

									attributes: {
										Type: "Text",
										Value: localStorage.getItem("com.GenbuProject.UtilBtns.accessToken") || "",
										PlaceHolder: "アクセストークン"
									}
								}),

								new DOM("Button", {
									id: IDS.TOKENHOLDER.AUTH,
									classes: ["button", CLASSES.BUTTON],

									text: "認証",

									events: {
										"click": function () {
											localStorage.setItem("com.GenbuProject.UtilBtns.accessToken", document.getElementById(IDS.TOKENHOLDER.ACCESSTOKEN).value);
										}
									}
								})
							]
						})
					]
				}),

				btnContainerStyle = new Style(
					(() => {
						let obj = {};
							obj[`#${IDS.CONTAINER}`] = {
								"Padding-Top": "10px"
							};

							obj[`#${IDS.CONTAINER} > *`] = {
								"Margin-Bottom": "1em"
							};

							obj[`#${IDS.TOKENHOLDER.ROOT}`] = {
								"Display": "Flex"
							};

							obj[`#${IDS.TOKENHOLDER.ACCESSTOKEN}`] = {
								"Flex": 1
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

								params: { "access_token": localStorage.getItem("com.GenbuProject.UtilBtns.accessToken") }
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

						submitBtn.click();
					}
				},

				{
					id: IDS.BUTTONS.RISA,
					text: "りさ姉ご指名",

					onclick: (contents, submitBtn) => {
						contents.value = [
							"@RISA",
							""
						].join("\r\n");
					}
				},

				{
					id: IDS.BUTTONS.ZUHO,
					text: "づ　　ほ",

					onclick: (contents, submitBtn) => {
						contents.value = [
							"づほ",
							"「JS ＝ ？」"
						].join("\r\n");

						submitBtn.click();
					}
				},
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