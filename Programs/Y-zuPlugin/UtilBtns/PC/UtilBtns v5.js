/*/
 *####################################################################################################
 * Plugin for Yづドン ～ユーティリティボタン～ v5
 * 
 * Based: Mastodon 2.1.0
 * Author: Genbu Hase
 * Last Updated: 2017/12/26
 * 
 * Details:
 * このプラグインは色々と便利なボタンを追加します。
 *####################################################################################################
/*/
window.addEventListener("DOMContentLoaded", () => {
	let _scriptElem = document.createElement("script");
		_scriptElem.src = "https://genbuproject.github.io/Programs/DOM Extender/DOM Extender v3.4.js";

		_scriptElem.addEventListener("load", () => {
			const VERSION = "v5";

			const IDS = {
				CONTAINER: "utilBtn",

				BUTTONS: {
					GOJI: "utilBtn__button--goji",
					HARUKIN: "utilBtn__button--harukin",
					RISA: "utilBtn__button--risa"
				}
			}

			const CLASSES = {
				BUTTON: "utilBtn__button"
			}



			let form = new DOM("$.compose-form"),
				btnContainer = new DOM("Div", { id: IDS.CONTAINER }),

				btnContainerStyle = new Style(
					(() => {
						let obj = {};
							obj[`#${IDS.CONTAINER}`] = {
								"Padding-Top": "10px"
							};

							obj[`#${IDS.CONTAINER} > *`] = {
								"Margin-Bottom": "1em"
							};

						return obj;
					})()
				);

				form.appendChild(btnContainer);
				btnContainer.appendChild(btnContainerStyle);

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
						let quantity = Math.random.randomInt(1, 7),
							type = Math.random.randomInt(1, 2);

						let harukin = "";

						switch (type) {
							case 1:
								harukin = ":harukin: ";
								break;

							case 2:
								harukin = ":harukin_old: ";
								break;
						}

						switch (quantity) {
							default:
								contents.value = [
									harukin.repeat(quantity),
									"🔥 ".repeat(quantity)
								].join("\r\n");

								break;
								
							case 7:
								contents.value = `${harukin}💕\r\n`.repeat(6);
								break;
						}

						submitBtn.click();
					}
				},

				{
					id: IDS.BUTTONS.RISA,
					text: "りさ姉ご指名",

					onclick: (contents, submitBtn) => {
						contents.value = [
							"@RISA "
						].join("\r\n");

						contents.focus();
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