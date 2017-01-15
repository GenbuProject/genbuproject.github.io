window.addEventListener("DOMContentLoaded", function () {
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
			let FileName = Event.dataTransfer.files[0].name.replace("." + Event.dataTransfer.files[0].name.split(".")[Event.dataTransfer.files[0].name.split(".").length - 1], "") + " - Converted.svg";
			
			DOM("#Message").textContent = "現在処理実行中です…";
			
			let Reader = new FileReader();
				Reader.onload = function () {
					let Img = new Image();
						Img.src = Reader.result;
						
						Img.onload = function (Event) {
							let Container = Img.toSvg();
							
							DOM("#Message").textContent = "こ↑こ↓にファイルをドロップ";
							
							DOM("#Data").appendChild(Container);
							DOM("#Data").className = "Show";
							
							alert([
								"処理が完了しました。",
								"このダイアログを閉じると、変換後のBase64ファイルは自動的にダウンロードされます。"
							].join("\n"));
							
							DB.Save(FileName, Container.outerHTML);
						}
				}
				
				Reader.readAsDataURL(Event.dataTransfer.files[0]);
		} else if (Event.dataTransfer.files.length > 1) {
			DOM("#Message").textContent = "同時にドロップ可能なファイルは1つのみです。";
		} else {
			Event.dataTransfer.items[0].getAsString(function (Res) {
				let FileName = Res.split("/")[Res.split("/").length - 1].replace("." + Res.split(".")[Res.split(".").length - 1], "") + " - Converted.svg";
				
				let Img = new Image();
					Img.crossOrigin = "anonymous";
					Img.src = Res;
					
					Img.onload = function () {
						let Container = Img.toSvg();
						
						DOM("#Message").textContent = "こ↑こ↓にファイルをドロップ";
						
						DOM("#Data").appendChild(Container);
						DOM("#Data").className = "Show";
						
						alert([
							"処理が完了しました。",
							"このダイアログを閉じると、変換後のBase64ファイルは自動的にダウンロードされます。"
						].join("\n"));
						
						DB.Save(FileName, Container.outerHTML);
					}
			});
		}
	});
});