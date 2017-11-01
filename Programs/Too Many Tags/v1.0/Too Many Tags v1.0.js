/*/
 *============================================================
 *【Too Many Tags v1.0】(Last Updated:2016/12/15 [Thu])
 *	Copyright (C) 2016 Genbu Hase All Rights Reversed.
 *============================================================
/*/
function TagSetting() {
	const WIDTH = 28;
	const HEIGHT = 14;
	
	var File = document.getElementsByTagName("File");
	var Folder = document.getElementsByTagName("Folder");
	
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
}