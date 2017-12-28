class Notify {
	constructor (snackbar) {
		this.self = new mdc.snackbar.MDCSnackbar(snackbar);
	}

	begin () {
		this.self.show({
			message: "処理を実行しています..."
		});
	}

	finish () {
		this.self.show({
			message: "投稿が反映されました"
		});
	}
}