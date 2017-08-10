window.addEventListener("DOMContentLoaded", () => {
	DOM('@Dialog').forEach((dialog) => {
		dialogPolyfill.registerDialog(dialog);
	});
	
	DOM('@Dialog Button[Data-Action="Dialog_Close"]').forEach((btn) => {
		btn.addEventListener("click", () => {
			btn.offsetParent.close();
		});
	});



	DOM("#Dialogs_Profile_ConfirmDelete_Btns_Yes").addEventListener("click", () => {
		if (DOM("#Dialogs_Profile_ConfirmDelete_Content_Email_Input").value == base.user.email) {
			base.delete();
		}
	});
});