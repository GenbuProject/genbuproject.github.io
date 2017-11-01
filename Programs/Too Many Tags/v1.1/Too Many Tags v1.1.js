/*/
 *============================================================
 *【Too Many Tags v1.1】(Last Updated:2016/12/15 [Thu])
 *	Copyright (C) 2016 Genbu Hase All Rights Reversed.
 *============================================================
/*/
function TagSetting() {
	const WIDTH = 28;
	const HEIGHT = 14;
	
	var File = document.getElementsByTagName("File");
	var Folder = document.getElementsByTagName("Folder");
	var Collapsible = document.getElementsByTagName("Collapsible");
		var CollDiv = [];
		var CollDivLength = [];
	
	for (var Files = 0; Files < File.length; Files++) {
		if (File[Files].attributes["Type"] != undefined) {
			switch (File[Files].attributes["Type"].value.toLowerCase()) {
				case "text":
					File[Files].innerHTML = '<Img Src = "https://genbuproject.github.io/Programs/Too Many Tags/Images/File/File-Text.Svg" Width = "' + WIDTH + '" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + File[Files].innerHTML;
					break;
					
				case "image":
					File[Files].innerHTML = '<Img Src = "https://genbuproject.github.io/Programs/Too Many Tags/Images/File/File-Image.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + File[Files].innerHTML;
					break;
					
				case "music":
					File[Files].innerHTML = '<Img Src = "https://genbuproject.github.io/Programs/Too Many Tags/Images/File/File-Music.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + File[Files].innerHTML;
					break;
					
				case "video":
					File[Files].innerHTML = '<Img Src = "https://genbuproject.github.io/Programs/Too Many Tags/Images/File/File-Video.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + File[Files].innerHTML;
					break;
					
				case "zip":
					File[Files].innerHTML = '<Img Src = "https://genbuproject.github.io/Programs/Too Many Tags/Images/File/File-Zip.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + File[Files].innerHTML;
					break;
					
				case "other":
				default:
					File[Files].innerHTML = '<Img Src = "https://genbuproject.github.io/Programs/Too Many Tags/Images/File/File-Other.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + File[Files].innerHTML;
					break;
			}
		} else {
			File[Files].innerHTML = '<Img Src = "https://genbuproject.github.io/Programs/Too Many Tags/Images/File/File-Other.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + File[Files].innerHTML;
		}
	}
	
	for (var Folders = 0; Folders < Folder.length; Folders++) {
		if (Folder[Folders].attributes["Type"] != undefined) {
			switch (Folder[Folders].attributes["Type"].value.toLowerCase()) {
				case "drive":
					Folder[Folders].innerHTML = '<Img Src = "https://genbuproject.github.io/Programs/Too Many Tags/Images/Folder/Folder-Drive.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + Folder[Folders].innerHTML;
					break;
					
				case "directory":
				default:
					Folder[Folders].innerHTML = '<Img Src = "https://genbuproject.github.io/Programs/Too Many Tags/Images/Folder/Folder-Normal.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + Folder[Folders].innerHTML;
					break;
			}
		} else {
			Folder[Folders].innerHTML = '<Img Src = "https://genbuproject.github.io/Programs/Too Many Tags/Images/Folder/Folder-Normal.Svg" Width = "' + WIDTH + '" Height = "' + HEIGHT + '">' + ' ' + Folder[Folders].innerHTML;
		}
	}
	
	for (var i = 0; i < Collapsible.length; i++) {
		CollDiv[i] = Collapsible[i].children[0].outerHTML;
		
		if (Collapsible[i].attributes["Value"].value.toLowerCase() == "true") {
			Collapsible[i].innerHTML = '<Span Class = "Collapsible-Btn" Style = "Border: Thin Solid White">－</Span>' + ' ' + Collapsible[i].attributes["Title"].value + CollDiv[i];
			Collapsible[i].children[1].style.display = "Block";
		} else if (Collapsible[i].attributes["Value"].value.toLowerCase() == "false") {
			Collapsible[i].innerHTML = '<Span Class = "Collapsible-Btn" Style = "Border: Thin Solid White">＋</Span>' + ' ' + Collapsible[i].attributes["Title"].value + CollDiv[i];
			Collapsible[i].children[1].style.display = "None";
		}
		
		for (var j = 0; j < Collapsible[i].children[1].textContent.split("\n").length; j++) {
			CollDivLength[j] = (Collapsible[i].children[1].textContent.split("\n")[j].replace(/\t/g, "").length);
		}
		
		Collapsible[i].children[1].style.width = (14 * Math.max.apply(this, CollDivLength)) + "px";
		
		document.getElementsByClassName("Collapsible-Btn")[i].onclick = function () {
			for (var j = 0; j < Collapsible.length; j++) {
				if (Collapsible[j].attributes["Value"].value.toLowerCase() == "true") {
					document.getElementsByClassName("Collapsible-Btn")[j].textContent = "＋";
					Collapsible[j].children[1].style.display = "None";
					Collapsible[j].attributes["Value"].value = "false";
				} else if (Collapsible[j].attributes["Value"].value.toLowerCase() == "false") {
					document.getElementsByClassName("Collapsible-Btn")[j].textContent = "－";
					Collapsible[j].children[1].style.display = "Block";
					Collapsible[j].attributes["Value"].value = "true";
				}
			}
		}
	}
}