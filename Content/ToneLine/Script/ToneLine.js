var ToneLine = function () {
	TL_this = this;
	
	this.Ctx = new (window.webkitAudioContext || window.AudioContext)();
	this.BPM = null;
	this.ToneType = null;
	
	this.System = {
		Play: function (Level, Length) {
			var Audio = TL_this.Ctx.createOscillator();
				Audio.type = TL_this.ToneType;
				Audio.frequency.value = 27.500 * Math.pow(Math.pow(Math.sqrt(2), 1 / (12 / 2)), Level - 1);
				
				Audio.connect(TL_this.Ctx.destination);
				Audio.start(0);
				
			setTimeout(function () {
				Audio.stop();
			}, (60 / TL_this.BPM) * Length * 1000);
		}
	}
	
	this.Control = {
		ChangeBPM: function (BPM) {
			TL_this.BPM = BPM;
		},
		
		ChangeToneType: function (ID) {
			TL_this.ToneType = ID == 0 ? "sine" : ID == 1 ? "square" : ID == 2 ? "sawtooth" : ID == 3 ? "triangle" : "sine";
		}
	}
	
	this.Maker = {
		Tone: function (Pos, Pitch, Length) {
			return {
				Type: "Tone",
				
				Value: {
					Pos: Pos,
					Pitch: Pitch,
					Length: Length
				}
			}
		}
	}
	
	this.Run = function (Ary) {
		var Tones = [],
			Events = [];
			
		for (var i = 0; i < Ary.length; i++) {
			if (Ary[i].Type == "Tone") {
				Tones.push([
					Ary[i].Value.Pos,
					Ary[i].Value.Pitch,
					Ary[i].Value.Length
				]);
			} else {
				Events.push([
					Ary[i].Value.Pos,
					Ary[i].Value.Type,
					Ary[i].Value.Data
				]);
			}
		}
		
		for (let i = 0; i < Tones.length; i++) {
			setTimeout(function () {
				TL_this.System.Play(Tones[i][1], Tones[i][2]);
			}, (60 / TL_this.BPM) * Tones[i][0] * 1000);
		}
		
		for (let i = 0; i < Events.length; i++) {
			switch (Events[i][1].toLowerCase()) {
				case "bpm":
					setTimeout(function () {
						TL_this.Control.ChangeBPM(Events[i][2].BPM);
					}, (60 / TL_this.BPM) * Tones[i][0] * 1000);
					
					break;
					
				case "tonetype":
					setTimeout(function () {
						TL_this.Control.ChangeToneType(Events[i][2].ID);
					}, (60 / TL_this.BPM) * Tones[i][0] * 1000);
					
					break;
					
				default:
					break;
			}
		}
	}
}

with (new ToneLine()) {
	Control.ChangeBPM(120);
	Control.ChangeToneType(0);
	
	var Song = [
		Maker.Tone(0, 52, 1),
		Maker.Tone(1, 54, 1),
		Maker.Tone(2, 56, 2),
		Maker.Tone(4, 52, 1),
		Maker.Tone(5, 54, 1),
		Maker.Tone(6, 56, 2),
		
		Maker.Tone(8, 59, 1),
		Maker.Tone(9, 56, 1),
		Maker.Tone(10, 54, 1),
		Maker.Tone(11, 52, 1),
		Maker.Tone(12, 54, 1),
		Maker.Tone(13, 56, 1),
		Maker.Tone(14, 54, 2),
		
		Maker.Tone(16, 52, 1),
		Maker.Tone(17, 54, 1),
		Maker.Tone(18, 56, 2),
		Maker.Tone(20, 52, 1),
		Maker.Tone(21, 54, 1),
		Maker.Tone(22, 56, 2),
		
		Maker.Tone(24, 59, 1),
		Maker.Tone(25, 56, 1),
		Maker.Tone(26, 54, 1),
		Maker.Tone(27, 52, 1),
		Maker.Tone(28, 54, 1),
		Maker.Tone(29, 56, 1),
		Maker.Tone(30, 52, 2),
	];
	
	Run(Song);
}