//アクセストークン：atob("YWUzY2I0YTU0ZDdkMTJiMDMzODRiODk2YThiOWZlZGZhMGIwMTZiMw==")
var UploadFileData = null;

function Init() {
	Notification.requestPermission(function (Result) {
		if (Result == "denied") {
			alert("通知の許可がない場合、正しく動作しない場合があります。");
		} else if (Result == "default") {
			alert("通知の許可がない場合、正しく動作しない場合があります。");
		} else if (Result == "granted") {
			alert("通知の許可を確認しました。");
		}
	});
	
	document.getElementById("Upload-File").addEventListener("change", function (Event) {
		var Reader = new FileReader();
			Reader.readAsText(Event.target.files[0]);
			
			Reader.onload = function () {
				UploadFileData = Reader.result;
			}
	});
}

function Upload() {
	if (UploadFileData != null) {
		var Sender = new XMLHttpRequest();
			Sender.open("PUT", "https://api.github.com/repos/GenbuProject/RhythmTapRide/contents/Songs/" + JSON.parse(UploadFileData).Name + ".json?access_token=" + atob("YWUzY2I0YTU0ZDdkMTJiMDMzODRiODk2YThiOWZlZGZhMGIwMTZiMw=="), true);
			
			Sender.onload = function () {
				Notification.requestPermission(function (Result) {
  					new Notification(JSON.parse(UploadFileData).Name + ".jsonのアップロードが完了しました！");
				});
			}
			
			Sender.send(
				JSON.stringify({
					message: "ファイル追加日：" + new Date().toLocaleString(),
					content: btoa(UploadFileData)
				})
			);
	} else {
		alert("ファイルがアップロードされていません");
	}
}