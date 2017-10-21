/*/
 *####################################################################################################
 * Plugin for Yづドン ～トゥート読み上げ With 棒読みちゃん～ v1
 * 
 * Author: Genbu Hase
 * Last Updated: 2017/08/09
 * 
 * Details:
 * このプラグインは棒読みちゃんの起動が必須になります。
 * 使用するには棒読みちゃんに以下のプラグインを導入して下さい。
 * https://github.com/chocoa/BouyomiChan-WebSocket-Plugin/raw/master/Plugin_WebSocket.dll
 *####################################################################################################
/*/
class Bouyomi {
	/**
	 * 棒読みちゃんの簡略化クラス
	 * 
	 * @param {Number} [port=50002]
	 */
	constructor (port) {
		this.port = port || 50002;
	}



	static get DELIM () { return "<bouyomi>" }

	/**
	 * 棒読みちゃんと通信
	 * 
	 * @param {Number} [speed=-1] 読み上げ速度(-1で本体設定)
	 * @param {Number} [pitch=-1] 読み上げ音程(-1で本体設定)
	 * @param {Number} [volume=-1] 読み上げ音量(-1で本体設定)
	 * @param {Number} [type=0] 読み上げ音質(0で本体設定)
	 * @param {String} [text=""] 読み上げテキスト
	 */
	speak (speed, pitch, volume, type, text) {
		this.socket = new WebSocket("ws://localhost:" + this.port);

		this.socket.addEventListener("open", () => {
			if (this.socket.readyState == this.socket.OPEN) {
				this.socket.send([speed || -1, pitch || -1, volume || -1, type || 0, text || ""].join(Bouyomi.DELIM));
				this.socket.close();
			}
		});
	}
}



let bouyomi = new Bouyomi(50002);

window.addEventListener("DOMContentLoaded", () => {
	document.querySelector('Div[Role="feed"]').addEventListener("DOMNodeInserted", (event) => {
		let content = event.target;

		if (content.nodeName === "ARTICLE" && content.parentNode.nodeName !== "HEAD") {
			let text = `${content.querySelector("Strong.display-name__html").textContent}さん ${content.querySelector("Div.status__content").getAttribute("Aria-Label")}`;
			bouyomi.speak(-1, -1, -1, 0, text);
		}
	});
});