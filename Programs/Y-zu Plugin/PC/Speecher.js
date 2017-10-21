/*/
 *####################################################################################################
 * Plugin for Yづドン ～トゥート読み上げ～ v1
 * 
 * Author: Genbu Hase
 * Last Updated: 2017/08/09
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
		let content = event.target;

		if (content.nodeName === "ARTICLE" && content.parentNode.nodeName !== "HEAD") {
			let text =
				`${content.querySelector("Strong.display-name__html").textContent}さん
				${content.querySelector("Div.status__content").children[0].textContent}`;

			speaker.speak(1, 1, 1, text, TextSpeaker.getVoice("Google 日本語"));

			console.log(text);
		}
	});
});