/*/
 *####################################################################################################
 * Plugin for Yづドン ～トゥート読み上げ～ v2
 * 
 * Author: Genbu Hase
 * Last Updated: 2017/10/21
 * 
 * Details:
 * このプラグインは投稿の読み上げ機能を追加します。
 *####################################################################################################
/*/
class TextSpeaker {
	constructor () {}

	/**
	 * 声質取得
	 * 
	 * @param {String} name 声質の名前
	 * @returns {SpeechSynthesisVoice}
	 */
	static getVoice (name) {
		let result = speechSynthesis.getVoices()[0];

		speechSynthesis.getVoices().forEach((voice) => {
			!(voice.name == name) || (result = voice);
		});

		return result;
	}

	/**
	 * 発声開始
	 * 
	 * @param {Number} [speed=1] 読み上げ速度
	 * @param {Number} [pitch=1] 読み上げ音程
	 * @param {Number} [volume=1] 読み上げ音量
	 * @param {String} [text=""] 読み上げテキスト
	 * @param {SpeechSynthesisVoice} [type=SpeechSynthesisVoice()] 読み上げ声質
	 */
	speak (speed, pitch, volume, text, type) {
		let ctx = new SpeechSynthesisUtterance();
			ctx.rate = speed || 1,
			ctx.pitch = pitch || 1,
			ctx.volume = volume || 1,
			ctx.text = text || "",
			ctx.voice = type || TextSpeaker.getVoice("");

		speechSynthesis.speak(ctx);
	}
}



let speaker = new TextSpeaker();

window.addEventListener("DOMContentLoaded", () => {
	document.querySelector('Div[Role="feed"]').addEventListener("DOMNodeInserted", (event) => {
		let post = event.target;

		if (post.nodeName === "ARTICLE" && post.parentNode.nodeName !== "HEAD") {
			let content = post.querySelector("Div.status__content");
			let text = "";
			
			if (content.classList.contains("status__content--with-spoiler")) {
				text = `${post.querySelector("Strong.display-name__html").innerText}さん ${content.querySelector("P > Span").innerText} ${content.querySelector("Div.status__content__text").innerText}`;
			} else {
				text = `${post.querySelector("Strong.display-name__html").innerText}さん ${content.innerText}`;
			}

			speaker.speak(1, 1, 1, text, TextSpeaker.getVoice("Google 日本語"));
		}
	});
});