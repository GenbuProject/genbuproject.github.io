/*/
 *####################################################################################################
 * Plugin for Yづドン ～読み上げちゃん連携～ Ver.2
 * 
 * Author: Genbu Hase
 * Last Updated: 2017/10/21
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
		let post = event.target;

		if (post.nodeName === "ARTICLE" && post.parentNode.nodeName !== "HEAD") {
			let content = post.querySelector("Div.status__content");
			let text = "";
			
			if (content.classList.contains("status__content--with-spoiler")) {
				text = `${post.querySelector("Strong.display-name__html").innerText}さん ${content.querySelector("P > Span").innerText} ${content.querySelector("Div.status__content__text").innerText}`;
			} else {
				text = `${post.querySelector("Strong.display-name__html").innerText}さん ${content.innerText}`;
			}

			bouyomi.speak(-1, -1, -1, 0, text);
		}
	});
});