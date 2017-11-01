var MaxTipID = 0;
var MapWidth = 0;
var MapHeight = 0;

var L1Datas = [];
var L2Datas = [];
var L3Datas = [];

function Load(File) {
	var Reader = new FileReader();
		Reader.readAsArrayBuffer(File);
		
		Reader.onload = function () {
			var Link = URL.createObjectURL(
				new Blob(
					[Reader.result],
					{type: "image/png"}
				)
			);
			
			var Img = new Image();
				Img.src = Link;
				
				Img.onload = function () {
					console.log(Img);
					
					var Cvs = document.getElementById("TipCanvas");
						Cvs.width = Img.width;
						Cvs.height = Img.height;
						
					var Ctx = Cvs.getContext("2d");
						Ctx.clearRect(0, 0, Img.width, Img.height);
						Ctx.drawImage(Img, 0, 0);
						
					var TipDatas = [];
					
					for (var i = 0; i < (Img.width / 16) * (Img.height / 16); i++) {
						var X = i % ((Img.width / 16));
						var Y = Math.floor(i / (Img.width / 16));
						
						TipDatas[i] = Ctx.getImageData(X * 16, Y * 16, 16, 16).data;
					}
					
					MaxTipID = TipDatas.length - 1;
				}
		}
}

function TipIDCreate(File) {
	var Reader = new FileReader();
		Reader.readAsArrayBuffer(File);
		
		Reader.onload = function () {
			MapWidth = new DataView(Reader.result).getUint8(38);
			MapHeight = new DataView(Reader.result).getUint8(42);
			
			var MapDatas = new DataView(Reader.result.slice(50));
			
			console.log("Xサイズ：" + MapWidth + ", Yサイズ：" + MapHeight);
			console.log("チップタイル上限値：" + MaxTipID);
			
			console.log("レイヤー1範囲：" + (MapWidth * MapHeight * 4 * 0) + "～" + (MapWidth * MapHeight * 4 * 1 - 1));
			console.log("レイヤー2範囲：" + (MapWidth * MapHeight * 4 * 1) + "～" + (MapWidth * MapHeight * 4 * 2 - 1));
			console.log("レイヤー3範囲：" + (MapWidth * MapHeight * 4 * 2) + "～" + (MapWidth * MapHeight * 4 * 3 - 1));
			
			for (var L1 = MapWidth * MapHeight * 4 * 0; L1 < MapWidth * MapHeight * 4 * 1; L1 += 4) {
				if (L1 == MapWidth * MapHeight * 4 * 0) {
					L1Datas[0] = MapDatas.getUint32(MapWidth * MapHeight * 4 * 0).toString(16);
					
					if (L1Datas[0].length == 7) {
						L1Datas[0] = "0" + L1Datas[0];
					}
					
					var M = L1Datas[0].match(/../g);
					L1Datas[0] = parseInt(M[3] + M[2] + M[1] + M[0], 16);
					
					if (L1Datas[0] > MaxTipID) {
						L1Datas[0] = -1;
					}
				} else {
					L1Datas[(L1 - MapWidth * MapHeight * 4 * 0) / 4] = MapDatas.getUint32(L1).toString(16);
					
					if (L1Datas[(L1 - MapWidth * MapHeight * 4 * 0) / 4].length == 7) {
						L1Datas[(L1 - MapWidth * MapHeight * 4 * 0) / 4] = "0" + L1Datas[(L1 - MapWidth * MapHeight * 4 * 0) / 4];
					}
					
					var M = L1Datas[(L1 - MapWidth * MapHeight * 4 * 0) / 4].match(/../g);
					L1Datas[(L1 - MapWidth * MapHeight * 4 * 0) / 4] = parseInt(M[3] + M[2] + M[1] + M[0], 16);
					
					if (L1Datas[(L1 - MapWidth * MapHeight * 4 * 0) / 4] > MaxTipID) {
						L1Datas[(L1 - MapWidth * MapHeight * 4 * 0) / 4] = -1;
					}
				}
			}
			
			for (var L2 = MapWidth * MapHeight * 4 * 1; L2 < MapWidth * MapHeight * 4 * 2; L2 += 4) {
				if (L2 == MapWidth * MapHeight * 4 * 1) {
					L2Datas[0] = MapDatas.getUint32(MapWidth * MapHeight * 4 * 1).toString(16);
					
					if (L2Datas[0].length == 7) {
						L2Datas[0] = "0" + L2Datas[0];
					}
					
					var M = L2Datas[0].match(/../g);
					L2Datas[0] = parseInt(M[3] + M[2] + M[1] + M[0], 16);
					
					if (L2Datas[0] > MaxTipID) {
						L2Datas[0] = -1;
					}
				} else {
					L2Datas[(L2 - MapWidth * MapHeight * 4 * 1) / 4] = MapDatas.getUint32(L2).toString(16);
					
					if (L2Datas[(L2 - MapWidth * MapHeight * 4 * 1) / 4].length == 7) {
						L2Datas[(L2 - MapWidth * MapHeight * 4 * 1) / 4] = "0" + L2Datas[(L2 - MapWidth * MapHeight * 4 * 1) / 4];
					}
					
					var M = L2Datas[(L2 - MapWidth * MapHeight * 4 * 1) / 4].match(/../g);
					L2Datas[(L2 - MapWidth * MapHeight * 4 * 1) / 4] = parseInt(M[3] + M[2] + M[1] + M[0], 16);
					
					if (L2Datas[(L2 - MapWidth * MapHeight * 4 * 1) / 4] > MaxTipID) {
						L2Datas[(L2 - MapWidth * MapHeight * 4 * 1) / 4] = -1;
					}
				}
			}
			
			for (var L3 = MapWidth * MapHeight * 4 * 2; L3 < MapWidth * MapHeight * 4 * 3; L3 += 4) {
				if (L3 == MapWidth * MapHeight * 4 * 2) {
					L3Datas[0] = MapDatas.getUint32(MapWidth * MapHeight * 4 * 2).toString(16);
					
					if (L3Datas[0].length == 7) {
						L3Datas[0] = "0" + L3Datas[0];
					}
					
					var M = L3Datas[0].match(/../g);
					L3Datas[0] = parseInt(M[3] + M[2] + M[1] + M[0], 16);
					
					if (L3Datas[0] > MaxTipID) {
						L3Datas[0] = -1;
					}
				} else {
					L3Datas[(L3 - MapWidth * MapHeight * 4 * 2) / 4] = MapDatas.getUint32(L3).toString(16);
					
					if (L3Datas[(L3 - MapWidth * MapHeight * 4 * 2) / 4].length == 7) {
						L3Datas[(L3 - MapWidth * MapHeight * 4 * 2) / 4] = "0" + L3Datas[(L3 - MapWidth * MapHeight * 4 * 2) / 4];
					}
					
					var M = L3Datas[(L3 - MapWidth * MapHeight * 4 * 2) / 4].match(/../g);
					L3Datas[(L3 - MapWidth * MapHeight * 4 * 2) / 4] = parseInt(M[3] + M[2] + M[1] + M[0], 16);
					
					if (L3Datas[(L3 - MapWidth * MapHeight * 4 * 2) / 4] > MaxTipID) {
						L3Datas[(L3 - MapWidth * MapHeight * 4 * 2) / 4] = -1;
					}
				}
			}
			
			var Result = new Array();
				Result[0] = new Array();
				Result[1] = new Array();
				Result[2] = new Array();
				
			for (var Y = 0; Y < MapHeight; Y++) {
				Result[0][Y] = new Array();
				Result[1][Y] = new Array();
				Result[2][Y] = new Array();
				
				for (var X = 0; X < L1Datas.length; X += MapHeight) {
					Result[0][Y].push(L1Datas[X + Y]);
				}
				
				for (var X = 0; X < L2Datas.length; X += MapHeight) {
					Result[1][Y].push(L2Datas[X + Y]);
				}
				
				for (var X = 0; X < L3Datas.length; X += MapHeight) {
					Result[2][Y].push(L3Datas[X + Y]);
				}
			}
			
			document.getElementById("Result-TipIDCreator").textContent = JSON.stringify(Result, null, "\t");
		}
}


var CheckKey = "";
var TileDatas;

function TileSettingCreate(File) {
	var Reader = new FileReader();
		Reader.readAsArrayBuffer(File);
		
		Reader.onload = function () {
			var Count = 0;
			var Result = [];
			
			TileDatas = new DataView(Reader.result);
			
			for (var i = 0; i < TileDatas.byteLength; i++) {
				if (TileDatas.getUint8(i).toString(16).toUpperCase() == "FF") {
					Count++;
					
					var Key = TileDatas.getUint32(i).toString(16).toUpperCase();
						Key = Key.match(/../g);
						Key = Key[3] + Key[2] + Key[1] + Key[0];
						
					CheckKey = Key;
					
					if (Count == 2) {
						TileDatas = new DataView(TileDatas.buffer, i + 4 + 64, 4 * (MaxTipID + 1));
						
						console.log("識別キー：" + CheckKey);
						console.log("タイル設定範囲：0～" + (TileDatas.byteLength - 1));
						
						break;
					}
				}
			}
			
			for (var i = 0; i < TileDatas.byteLength / 4; i++) {
				var ID = TileDatas.getUint32(4 * i).toString(16).toUpperCase();
				Result[i] = ID;
			}
			
			document.getElementById("Result-TileSettingCreator").textContent = JSON.stringify(Result, null, "\t");
		}
}
