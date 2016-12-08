//アクセストークン：atob("YWUzY2I0YTU0ZDdkMTJiMDMzODRiODk2YThiOWZlZGZhMGIwMTZiMw==")
//BPM * x = 60 * 1000
var RTR = function () {
	RTR_this = this;
	
	this.Song = [];
	
	this.PlayingID = 0;
	this.Stream = [[], [], [], []];
	
	this.System = {
		Load: function (OnLoad) {
			let SongListGetter = new XMLHttpRequest();
				SongListGetter.responseType = "json";
				SongListGetter.open("GET", "https://api.github.com/repos/GenbuProject/RhythmTapRide/contents/Songs?access_token=" + atob("YWUzY2I0YTU0ZDdkMTJiMDMzODRiODk2YThiOWZlZGZhMGIwMTZiMw=="), true);
				
				SongListGetter.onload = function () {
					var SongGetter = [];
					
					for (let i = 0; i < SongListGetter.response.length; i++) {
						SongGetter[i] = new XMLHttpRequest();
							SongGetter[i].responseType = "json";
							SongGetter[i].open("GET", SongListGetter.response[i].git_url + "?access_token=" + atob("YWUzY2I0YTU0ZDdkMTJiMDMzODRiODk2YThiOWZlZGZhMGIwMTZiMw=="), true);
							
							SongGetter[i].onload = function () {
								RTR_this.Song[i] = JSON.parse(atob(SongGetter[i].response.content));
								
								let Count = 0;
								
								for (var j = 0; j < SongListGetter.response.length; j++) {
									if (RTR_this.Song[j] != null) {
										Count++;
									}
								}
								
								if (Count == SongListGetter.response.length) {
									OnLoad();
								}
							}
							
							SongGetter[i].send(null);
					}
				}
				
				SongListGetter.send(null);
		}
	}
	
	this.Node = {
		Play: function () {
			let Selecter = document.createElement("Select");
				Selecter.onchange = function () {
					RTR_this.Node.ShowInfo(Selecter.selectedIndex);
				}
				
			for (let i = 0; i < RTR_this.Song.length; i++) {
				let Item = new Option(RTR_this.Song[i].Name + " / " + RTR_this.Song[i].Author, RTR_this.Song[i].Name);
				Selecter.appendChild(Item);
			}
			
			var Accept = document.createElement("Button");
				Accept.textContent = "Let's Play!";
				
				Accept.onclick = function () {
					RTR_this.PlayingID = Selecter.selectedIndex;
					
					let StartMsg = RTR_this.Util.Message(document.body, "Music Start in 3 seconds", 30);
					document.getElementById("SongSelecter").parentElement.removeChild(document.getElementById("SongSelecter"));
					
					setTimeout(function () {
						StartMsg.parentElement.removeChild(StartMsg);
						
						let Media = new Audio(RTR_this.Song[RTR_this.PlayingID].Music);
							Media.play();
							
						let Screen = document.createElement("Div");
							Screen.id = "Screen";
							
						let TapArea = document.createElement("Div");
							TapArea.id = "TapArea";
							
						let ToneArea = document.createElement("Div");
							ToneArea.id = "ToneArea";
							
						let DeadLine = document.createElement("Div");
							DeadLine.id = "DeadLine";
							
						let Stream = document.createElement("Div");
							Stream.id = "Stream";
							
						document.body.appendChild(Screen);
						
						Screen.appendChild(TapArea);
						Screen.appendChild(ToneArea);
						
						ToneArea.appendChild(DeadLine);
						ToneArea.appendChild(Stream);
						
						for (let i = 0; i < 4; i++) {
							let Btn = document.createElement("Div");
								Btn.id = "Btn" + (i + 1);
								Btn.textContent = i == 0 ? "↑" : i == 1 ? "↓" : i == 2 ? "←" : i == 3 ? "→" : "";
								
							TapArea.appendChild(Btn);
						}
						
						for (let i = 0; i < 4; i++) {
							let StreamColumn = document.createElement("Div");
								StreamColumn.id = (i == 0 ? "Up" : i == 1 ? "Down" : i == 2 ? "Left" : i == 3 ? "Right" : "") + "Stream";
								
							Stream.appendChild(StreamColumn);
						}
						
						for (let i = 0; i < RTR_this.Song[RTR_this.PlayingID].Data.Up.length; i++) {
							RTR_this.Util.Tone(0, RTR_this.Song[RTR_this.PlayingID].Data.Up[i]);
						}
						
						for (let i = 0; i < RTR_this.Song[RTR_this.PlayingID].Data.Down.length; i++) {
							RTR_this.Util.Tone(1, RTR_this.Song[RTR_this.PlayingID].Data.Down[i]);
						}
						
						for (let i = 0; i < RTR_this.Song[RTR_this.PlayingID].Data.Left.length; i++) {
							RTR_this.Util.Tone(2, RTR_this.Song[RTR_this.PlayingID].Data.Left[i]);
						}
						
						for (let i = 0; i < RTR_this.Song[RTR_this.PlayingID].Data.Right.length; i++) {
							RTR_this.Util.Tone(3, RTR_this.Song[RTR_this.PlayingID].Data.Right[i]);
						}
						
						setInterval(function () {
							for (let i = 0; i < RTR_this.Stream[0].length; i++) {
								RTR_this.Stream[0][i].style.left = (RTR_this.Stream[0][i].style.left.replace("px", "") - (document.getElementById("UpStream").clientWidth / 4) / 50) + "px";
								
								if (RTR_this.Stream[0][i].style.left.replace("px", "") + 0 <= 0) {
									RTR_this.Stream[0][i].parentElement.removeChild(RTR_this.Stream[0][i]);
									RTR_this.Stream[0].splice(i, 1);
								}
							}
							
							for (let i = 0; i < RTR_this.Stream[1].length; i++) {
								
							}
							
							for (let i = 0; i < RTR_this.Stream[2].length; i++) {
								
							}
							
							for (let i = 0; i < RTR_this.Stream[3].length; i++) {
								
							}
						}, (60000 / RTR_this.Song[RTR_this.PlayingID].BPM) / 50);
					}, 3000);
				}
				
			document.getElementById("SongSelecter").appendChild(Selecter);
			document.getElementById("SongSelecter").appendChild(Accept);
			
			RTR_this.Node.ShowInfo(Selecter.selectedIndex);
		},
		
		ShowInfo: function (ID) {
			if (document.getElementById("SongInfo")) {
				document.getElementById("SongInfo").parentElement.removeChild(document.getElementById("SongInfo"));
			}
			
			var Info = document.createElement("Table");
				Info.id = "SongInfo";
				Info.frame = "border";
				Info.rules = "all"
				
			for (var i = 0; i < 5; i++) {
				var Row = Info.insertRow();
					Row.insertCell().innerHTML = "<B>" + (i == 0 ? "楽曲名" : i == 1 ? "BPM" : i == 2 ? "難易度" : i == 3 ? "作者" : i == 4 ? "カバー画像" : "") + "</B>";
					Row.insertCell().innerHTML = i == 0 ? RTR_this.Song[ID].Name : i == 1 ? RTR_this.Song[ID].BPM : i == 2 ? RTR_this.Song[ID].Difficulty : i == 3 ? RTR_this.Song[ID].Author : i == 4 ? "<Img ID = 'CoverImage' Src = '" + RTR_this.Song[ID].CoverImage + "' Alt = 'カバー'></Img>" : "";
			}
			
			document.getElementById("SongSelecter").appendChild(Info);
		},
		
		SongMaker: function () {
			
		},
		
		Option: function () {
			
		}
	}
	
	this.Util = {
		Message: function (Elem, Text, Angle) {
			var Msg = document.createElement("Span");
				Msg.className = "Message";
				Msg.textContent = Text;
				
				Msg.style.transform = "rotate(" + Angle + "deg)";
				
			Elem.appendChild(Msg);
			
			return Msg;
		},
		
		Tone: function (Line, Pos) {
			setTimeout(function () {
				let Tone = document.createElement(Line == 0 ? "UTone" : Line == 1 ? "DTone" : Line == 2 ? "LTone" : Line == 3 ? "UTone" : "Tone");
					Tone.style.width = document.getElementById((Line == 0 ? "Up" : Line == 1 ? "Down" : Line == 2 ? "Left" : Line == 3 ? "Right" : "Up") + "Stream").clientWidth / 40 + "px";
					Tone.style.height = document.getElementById((Line == 0 ? "Up" : Line == 1 ? "Down" : Line == 2 ? "Left" : Line == 3 ? "Right" : "Up") + "Stream").clientWidth / 40 + "px";
					Tone.style.left = document.getElementById((Line == 0 ? "Up" : Line == 1 ? "Down" : Line == 2 ? "Left" : Line == 3 ? "Right" : "Up") + "Stream").clientWidth - document.getElementById((Line == 0 ? "Up" : Line == 1 ? "Down" : Line == 2 ? "Left" : Line == 3 ? "Right" : "Up") + "Stream").clientWidth / 40 + "px";
					
				document.getElementById((Line == 0 ? "Up" : Line == 1 ? "Down" : Line == 2 ? "Left" : Line == 3 ? "Right" : "Up") + "Stream").appendChild(Tone);
				
				RTR_this.Stream[Line].push(Tone);
			}, (60000 / RTR_this.Song[RTR_this.PlayingID].BPM) * (Pos - 1));
		}
	}
}

function Init() {
	with (new RTR()) {
		Util.Message(document.getElementById("SongSelecter"), "Now Loading...", 0);
		
		System.Load(function () {
			document.getElementsByClassName("Message")[0].parentElement.removeChild(document.getElementsByClassName("Message")[0]);
			Node.Play();
		});
	}
}