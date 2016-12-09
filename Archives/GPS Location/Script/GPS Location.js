var GetLatitude, GetLongitude, GetAccuracy, GetAltitude, GetAltitudeAccuracy, GetHeading, GetSpeed;

function PosGet() {
	/*var GPSOption = {
		"enableHighAccuracy": true,
		"timeout": 5000,
		"maximumAge": 0,
	};
	
	var Sender = new XMLHttpRequest();
		Sender.open("POST", "https://mandrillapp.com/api/1.0/messages/send.json", true);
		
		Sender.send(
			JSON.stringify({
				"key": "CtP_qm26xC14fExKlc1SNA",
				
				"message": {
					"text": "",
					"subject": "IP発信",
					"from_email": "GenbuProject@gmail.com",
					"from_name": "Genbu Project",
					
					"to": [
						{
							"email": "GenbuProject@gmail.com",
							"name": "Genbu Project",
							"type": "to"
						}
					]
				}
			})
		);
		
	navigator.geolocation.getCurrentPosition(function (Position) {
		GetLatitude = Position.coords.latitude;	// 緯度
		GetLongitude = Position.coords.longitude;	// 経度
		GetAccuracy = Position.coords.accuracy;	// 緯度・経度の誤差
		GetAltitude = Position.coords.altitude;	// 高度
		GetAltitudeAccuracy = Position.coords.altitudeAccuracy;	// 高度の誤差
		GetHeading = Position.coords.heading;	// 方角(0:北)
		GetSpeed = Position.coords.speed;	// 速度
		
		$.ajax({
			type: "POST",
			url: "https://mandrillapp.com/api/1.0/messages/send.json",
			
			data: {
				"key": "CtP_qm26xC14fExKlc1SNA",
				
				"message": {
					"text": "",
					"subject": "https://www.google.co.jp/maps/search/" + GetLatitude + "," + GetLongitude + " # " + GetAccuracy + "#" + GetAltitude + "#" + GetAltitudeAccuracy + "#" + GetHeading + "#" + GetSpeed,
					"from_email": "GenbuProject@gmail.com",
					"from_name": "Genbu Project",
					
					"to": [
						{
							"email": "GenbuProject@gmail.com",
							"name": "Genbu Project",
							"type": "to"
						}
					]
				}
			}
		});
	}, function (Error) {
		var ErrorMsg = "";
		
		switch (Error.code) {
			case 1:
				ErrorMsg = "位置情報の利用が許可されていません";
				break;
				
			case 2:
				ErrorMsg = "デバイスの位置が判定できません";
				break;
				
			case 3:
				ErrorMsg = "タイムアウトしました";
				break;
		}
		
		if (ErrorMsg == "") {
			ErrorMsg = Error.message;
		}
		
		alert(ErrorMsg);
	}, GPSOption);*/
}