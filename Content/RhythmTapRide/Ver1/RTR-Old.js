const RTR = (function () {
	let _self = null,
		_token = "";

	function RTR () {
		_self = this;
		_token = atob("YWUzY2I0YTU0ZDdkMTJiMDMzODRiODk2YThiOWZlZGZhMGIwMTZiMw==");

		this.getSongs();
	};

	RTR.prototype = Object.create(null, {
		songs: { value: [], configurable: true, writable: true, enumerable: true },

		getSongs: {
			value () {
				DOM.XHR({
					Type: "GET",
					URL: "https://api.github.com/repos/GenbuProject/RhythmTapRide/contents/Songs",
					DoesSync: true,

					Params: {
						"access_token": _token
					},

					OnLoad: function (Event) {
						for (let i = 0; i < JSON.parse(Event.target.response).length; i++) {
							DOM.XHR({
								Type: "GET",
								URL: JSON.parse(Event.target.response)[i]["git_url"],
								DoesSync: true,

								Params: {
									"access_token": _token
								},

								OnLoad: function (Event) {
									_self.songs[i] = JSON.parse(atob(JSON.parse(Event.target.response).content));
								}
							});
						}
					}
				});
			}
		}
	});



	RTR.Score = (function () {
		function Score (_song) {

		};

		Score.prototype = Object.create(null, {

		});

		return Score;
	})();


	RTR.Scoreboard = (function () {
		function Scoreboard () {

		};

		Scoreboard.prototype = Object.create(null, {

		});

		return Scoreboard;
	})();

	

	return RTR;
})();

"use DOMExtender";