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
					let Img = new Image();
						Img.src = Reader.result;
						
						Img.onload = function (Event) {
							let Pixels = Img.getImageData(),
								Container = new Svg(Pixels.width, Pixels.height);
								
							for (let y = 0; y < Pixels.height; y++) {
								for (let x = 0; x < Pixels.width; x++) {
									Container.appendChild(
										new Svg.Rect({
											Width: 1,
											Height: 1,
											
											X: x,
											Y: y,
											Fill: Svg.RGBA(Pixels.data[(x + y * Pixels.width) * 4], Pixels.data[(x + y * Pixels.width) * 4 + 1], Pixels.data[(x + y * Pixels.width) * 4 + 2], Pixels.data[(x + y * Pixels.width) * 4 + 3])
										})
									);
								}
							}
							
							DOM("#Message").textContent = "こ↑こ↓にファイルをドロップ";
							
							DOM("#Data").appendChild(Container);
							DOM("#Data").className = "Show";
							
							DB.Save("Converted.Svg", Container.outerHTML);
							
							alert("処理が完了しました。\n変換後のSvgファイルは自動的にダウンロードされます…");
						}
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
});