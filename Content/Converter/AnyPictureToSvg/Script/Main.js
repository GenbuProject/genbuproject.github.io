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
							const Pixels = Img.getImageData().data;
							
							let Container = new Svg(Img.naturalWidth, Img.naturalHeight);
							
							for (var y = 0; y < Img.naturalHeight; y++) {
								for (var x = 0; x < Img.naturalWidth * 4; x += 4) {
									Container.appendChild(Svg.Rect({
										X: x / 4,
										Y: y,
										
										Width: 1,
										Height: 1,
										
										Fill: Svg.RGBA(Pixels[y * Img.naturalWidth + x], Pixels[y * Img.naturalWidth + x + 1], Pixels[y * Img.naturalWidth + x + 2], Pixels[y * Img.naturalWidth + x + 3])
									}));
								}
							}
							
							DOM("#Message").textContent = "こ↑こ↓にファイルをドロップ";
							
							DOM("#Data").appendChild(Container);
							DOM("#Data").className = "Show";
							
							alert("処理が完了しました。");
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