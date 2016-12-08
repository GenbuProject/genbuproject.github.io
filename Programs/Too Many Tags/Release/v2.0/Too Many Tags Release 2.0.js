/*/
 *============================================================
 *【Too Many Tags Release 2.0】(Last Updated:2016/11/12 [Sat])
 *	Copyright (C) 2016 Genbu Hase All Rights Reversed.
 *============================================================
/*/
const WIDTH = 28;
const HEIGHT = 14;

let File = document.getElementsByTagName("File");
let Folder = document.getElementsByTagName("Folder");
let Collapsible = document.getElementsByTagName("Collapsible");
let Copyright = document.getElementsByTagName("Copyright");

function TMTInit() {
	for (let i = 0; i < File.length; i++) {
		switch (File[i].attributes["Type"].value.toLowerCase()) {
			case "text":
				File[i].innerHTML = '<Img Src = "Images/File/File-Text.Svg" Width = "' + WIDTH + '" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + File[i].innerHTML;
				break;
				
			case "image":
				File[i].innerHTML = '<Img Src = "Images/File/File-Image.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + File[i].innerHTML;
				break;
				
			case "music":
				File[i].innerHTML = '<Img Src = "Images/File/File-Music.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + File[i].innerHTML;
				break;
				
			case "video":
				File[i].innerHTML = '<Img Src = "Images/File/File-Video.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + File[i].innerHTML;
				break;
				
			case "zip":
				File[i].innerHTML = '<Img Src = "Images/File/File-Zip.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + File[i].innerHTML;
				break;
				
			case "other":
			default:
				File[i].innerHTML = '<Img Src = "Images/File/File-Other.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + File[i].innerHTML;
				break;
		}
	}
	
	for (let i = 0; i < Folder.length; i++) {
		if (Folder[i].attributes["Type"] != undefined) {
			switch (Folder[i].attributes["Type"].value.toLowerCase()) {
				case "drive":
					Folder[i].innerHTML = '<Img Src = "Images/Folder/Folder-Drive.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + Folder[i].innerHTML;
					break;
					
				case "directory":
				default:
					Folder[i].innerHTML = '<Img Src = "Images/Folder/Folder-Normal.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + Folder[i].innerHTML;
					break;
			}
		} else {
			Folder[i].innerHTML = '<Img Src = "Images/Folder/Folder-Normal.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + Folder[i].innerHTML;
		}
	}
	
	for (let i = 0; i < Collapsible.length; i++) {
		let Memory = [];
		Collapsible[i].innerHTML = "<Span> " + Collapsible[i].attributes["Name"].value + "</Span><Div>" + Collapsible[i].innerHTML + "</Div>";
		
		Collapsible[i].attributes["Value"].value.toLowerCase() == "true" ? (function () {
			Collapsible[i].children[1].style.display = "None";
			
			let Switch = document.createElement("Span");
				Switch.className = "Collapsible-Button";
				Switch.textContent = "＋";
				
				Switch.onclick = function () {
					if (Collapsible[i].attributes["Value"].value.toLowerCase() == "true") {
						Switch.textContent = "－";
						
						Collapsible[i].attributes["Value"].value = "false";
						Collapsible[i].children[2].style.display = "Block";
					} else if (Collapsible[i].attributes["Value"].value.toLowerCase() == "false") {
						Switch.textContent = "＋";
						
						Collapsible[i].attributes["Value"].value = "true";
						Collapsible[i].children[2].style.display = "None";
					}
				}
				
			Collapsible[i].insertBefore(Switch, Collapsible[i].children[0]);
		})() : (function () {
			Collapsible[i].children[1].style.display = "Block";
			
			let Switch = document.createElement("Span");
				Switch.className = "Collapsible-Button";
				Switch.textContent = "－";
				
				Switch.onclick = function () {
					if (Collapsible[i].attributes["Value"].value.toLowerCase() == "true") {
						Switch.textContent = "－";
						
						Collapsible[i].attributes["Value"].value = "false";
						Collapsible[i].children[2].style.display = "Block";
					} else if (Collapsible[i].attributes["Value"].value.toLowerCase() == "false") {
						Switch.textContent = "＋";
						
						Collapsible[i].attributes["Value"].value = "true";
						Collapsible[i].children[2].style.display = "None";
					}
				}
				
			Collapsible[i].insertBefore(Switch, Collapsible[i].children[0]);
		})();
		
		for (let j = 0; j < Collapsible[i].children[2].textContent.split("\n").length; j++) {
			Memory[j] = Collapsible[i].children[2].textContent.split("\n")[j].length;
		}
		
		Collapsible[i].children[2].style.width = (14 * Math.max.apply(this, Memory)) + "px";
		
		if (Collapsible[i].attributes["Width"]) {
			Collapsible[i].children[2].style.width = Collapsible[i].attributes["Width"].value + "px";
		}
	}
	
	for (let i = 0; i < Copyright.length; i++) {
		Copyright[i].textContent = "Copyright (C) " + Copyright[i].attributes["Auther"].value + " " + Copyright[i].attributes["Year"].value + " All Rights Reversed.";
	}
}