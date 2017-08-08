window.addEventListener("DOMContentLoaded", () => {
	DOM('@Dialog Button[Data-Action="Dialog_Close"]').forEach((btn) => {
		btn.addEventListener("click", () => {
			btn.offsetParent.close();
		});
	});
});