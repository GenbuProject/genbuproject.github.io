class Notify {
	constructor (snackbar) {
		this.self = new mdc.snackbar.MDCSnackbar(snackbar);
	}

	show () {
		this.self.show({
			message: "投稿が反映されました",
			timeout: 2000
		});
	}
}