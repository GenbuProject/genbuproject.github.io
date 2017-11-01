window.addEventListener("DOMContentLoaded", () => {
	DOM('@Dialog Button[Data-Action="Dialog_Close"]').forEach((btn) => {
		btn.addEventListener("click", () => {
			btn.offsetParent.close();
		});
	});

	DOM('@Dialog').forEach((dialog) => {
		dialogPolyfill.registerDialog(dialog);
	});



	DOM("#Dialogs_UnauthorizedNotify_Btns_OK").addEventListener("click", function () {
		GBase.login([
			GoogleAPI.SCOPE.PLUS[0],
			GoogleAPI.SCOPE.PLUS[1],

			GoogleAPI.SCOPE.GMAIL[0],
			"https://www.googleapis.com/auth/contacts.readonly"
		]);
	});
});