window.addEventListener("DOMContentLoaded", () => {
	let querys = location.querySort();



	let doc = parent.document;

	DOM('@A[Data-TagID="ProfilePhoto--Btn"]').forEach((btn) => {
		btn.addEventListener("click", () => {
			doc.querySelector("#Dialogs_Profile_InfoViewer").showModal();
		});
	});
});