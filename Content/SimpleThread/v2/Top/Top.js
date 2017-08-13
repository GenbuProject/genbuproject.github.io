window.addEventListener("DOMContentLoaded", () => {
	base.Database.get(base.Database.INTERVAL, "threads", (res) => {
		DOM("#Top_ThreadQuantity").textContent = res.length;
	});
});