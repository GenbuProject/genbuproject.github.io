//key=AIzaSyBMB3VAvofs_51Nu3c9_7FsxQLvlqGkUmc
function Search(ID, Amount) {
	var Memory;
	var Result;
	
	for (var i = 0; i < Amount; i++) {
		var Token = "";
		
		if (i != 0) {
			Token = Memory.nextPageToken;
		}
		
		var X = new XMLHttpRequest();
			X.open("GET", "https://www.googleapis.com/plus/v1/people/" + ID + "/activities/public?key=AIzaSyBIYF6mrAIJpngIQAxqARVCqhqxQFq7qXc&maxResults=100&pageToken=" + Token, false);
			X.send();
			
			if (X.status == 404) {
				console.log("IDが無効です");
				alert("IDが無効です");
				
				return "Failed.";
			}
			
		Memory = JSON.parse(X.responseText);
		
		if (Memory.nextPageToken == undefined) {
			Result = Memory;
			break;
		}
	}
	
	document.getElementById("Date").innerHTML = Result.items[Result.items.length - 1].published;
	document.getElementById("Link").innerHTML = '<A Target = "_blank" Href = "' + Result.items[Result.items.length - 1].url + '">' + Result.items[Result.items.length - 1].url + '</A>';
	
	console.log("Finished.");
	alert("Finished.");
}
