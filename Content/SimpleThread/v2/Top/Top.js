window.addEventListener("DOMContentLoaded", () => {
	base.Database.get("threads", (res) => {
		DOM("#Top_ThreadQuantity").textContent = res.length;
	});
});