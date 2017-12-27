/*/
 *####################################################################################################
 * Plugin for Yづドン ～ユーティリティボタン(For Mobile)～ v6
 * 
 * Based: Mastodon 2.1.0
 * Author: Genbu Hase
 * Last Updated: 2017/12/27
 * 
 * Details:
 * このプラグインは色々と便利なボタンを追加します。
 *####################################################################################################
/*/
let _scriptElem = document.createElement("script");
	_scriptElem.src = "https://genbuproject.github.io/Programs/DOM Extender/DOM Extender v3.4.js";

	_scriptElem.addEventListener("load", () => {
		window.initUtilBtns = () => {
			const VERSION = "v6";

			const IDS = {
				CONTAINER: "utilBtn",

				BUTTONS: {
					RISA: "utilBtn__button--risa",
					GOJI: "utilBtn__button--goji",
					HARUKIN: "utilBtn__button--harukin"
				}
			}

			const CLASSES = {
				BUTTON: "utilBtn__button",
				TOOTCONTAINER: "compose-form__publish-button-wrapper"
			}



			const contents = new DOM("$Textarea.autosuggest-textarea__textarea");
			const submitBtn = new DOM(`$.${CLASSES.TOOTCONTAINER} > Button:Not(.${CLASSES.BUTTON})`);



			let form = new DOM("$.compose-form"),
				btnContainer = new DOM("Div", { id: IDS.CONTAINER }),

				btnContainerStyle = new Style(
					(() => {
						let obj = {};
							obj[`.${CLASSES.TOOTCONTAINER}`] = {
								"Overflow": "Initial !Important"
							};
							
							obj[`.${CLASSES.TOOTCONTAINER} > Button`] = {
								"Display": "Inline-Block !Important",
								"Width": "Auto !Important",

								"Margin-Right": "0.5em"
							};

							obj[`.${CLASSES.TOOTCONTAINER} > Button:Last-Child`] = {
								"Margin-Right": "Auto"
							};

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

				new DOM(`$.${CLASSES.TOOTCONTAINER}`).insertBefore(
					new DOM("Button", {
						id: IDS.BUTTONS.RISA,
						classes: ["button", "button--block", CLASSES.BUTTON],
	
						text: "りさ姉",
	
						events: {
							"click": () => {
								contents.value = [
									"@RISA "
								].join("\r\n");
		
								contents.focus();
							}
						}
					}), submitBtn
				);



			let btns = [
				{
					id: IDS.BUTTONS.GOJI,
					text: "ｺﾞｼﾞﾓﾘｨｨｨｨｨｨ!!!",

					onclick: () => {
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

					onclick: () => {
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
				}
			];	btns.forEach(btnInfo => {
				btnContainer.appendChild(
					new DOM("Button", {
						id: btnInfo.id,
						classes: ["button", "button--block", CLASSES.BUTTON],

						text: btnInfo.text,

						events: {
							"click": btnInfo.onclick
						}
					})
				)
			});
		}
	});

	document.body.appendChild(_scriptElem);



window.addEventListener("DOMNodeInserted", (event) => {
	if (event.target.nodeName !== "#text" && event.target.classList.contains("drawer")) {
		if (event.target.querySelector('Div.compose-form')) {
			initUtilBtns();
		}
	}
});