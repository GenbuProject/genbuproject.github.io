document.addEventListener("DOMContentLoaded", function () {
	document.body.addEventListener("dragover", function (Event) {
		Event.stopPropagation();
		Event.preventDefault();
		
		Event.dataTransfer.dropEffect = "copy";
		
		DOM("#Message").textContent = "ファイルをドロップして実行";
	});
	
	document.body.addEventListener("dragleave", function (Event) {
		DOM("#Message").textContent = "こ↑こ↓にファイルをドロップ";
	});
	
	document.body.addEventListener("drop", function (Event) {
		Event.stopPropagation();
		Event.preventDefault();
		
		if (Event.dataTransfer.files.length == 1) {
			DOM("#Message").textContent = "現在処理実行中です…";
			
			let Reader = new FileReader();
				Reader.onload = function () {
					DOM("#Data").value = Reader.result;
					DOM("#Message").textContent = "こ↑こ↓にファイルをドロップ";
					
					DOM("#Data").className = "Show";
					
					alert("処理が完了したら、テキストエリアを押してコピーしてください。");
				}
				
				Reader.readAsDataURL(Event.dataTransfer.files[0]);
		} else if (Event.dataTransfer.files.length > 1) {
			DOM("#Message").textContent = "同時にドロップ可能なファイルは1つのみです。";
		} else {
			Event.dataTransfer.items[0].getAsString(function (Res) {
				console.log(Res);
			});
			
			DOM("#Message").textContent = "ドロップされたオブジェクトは無効です。";
		}
	});
	
	DOM("#Data").addEventListener("click", function () {
		DOM("#Data").select();
		document.execCommand("copy");
		
		DOM("#Data").className = "Hide";
		DOM("#Data").value = "";
	});
});