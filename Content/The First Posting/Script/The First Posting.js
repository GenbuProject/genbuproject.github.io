window.addEventListener("DOMContentLoaded", function () {
	DOM("#Apply").addEventListener("click", function () {
		let postMem = null;

		DOM("#Apply").textContent = "取得中…",
		DOM("#Apply").disabled = true;

		(function Looper (pageToken) {
			if (postMem) pageToken = postMem.nextPageToken;

			DOM.xhr({
				type: "GET",
				url: "https://www.googleapis.com/plus/v1/people/" + DOM("#UserID").value + "/activities/public",
				doesSync: true,
				resType: "json",

				params: {
					"key": "AIzaSyBIYF6mrAIJpngIQAxqARVCqhqxQFq7qXc",
					"maxResults": "100",
					"pageToken": pageToken
				},

				onLoad: function (event) {
					if (event.target.status == 404) {
						DOM("#Apply").textContent = "取得開始",
						DOM("#Apply").disabled = false;
						
						alert("IDが無効です");
						return false;
					} else {
						postMem = event.target.response;

						if (!postMem.nextPageToken) {
							DOM("#Date").textContent = postMem.items[postMem.items.length - 1].published;
							DOM("#Link").innerHTML = ['<A Target = "_blank" Href = "', postMem.items[postMem.items.length - 1].url, '">', postMem.items[postMem.items.length - 1].url, '</A>'].join("");

							DOM("#Apply").textContent = "取得開始",
							DOM("#Apply").disabled = false;

							alert("投稿取得完了");
							return true;
						} else {
							Looper(pageToken);
						}
					}
				}
			});
		})("");
	})
});