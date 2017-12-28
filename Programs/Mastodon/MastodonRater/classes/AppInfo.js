class AppInfo {
	static get KEYS () {
		return {
			INSTANCE: "com.GenbuProject.MastodonRater.currentInstance",
			ACCESSTOKEN: "com.GenbuProject.MastodonRater.accessToken"
		}
	}



	constructor () {}

	get instance () { return localStorage.getItem(AppInfo.KEYS.INSTANCE) }
	set instance (url = "") { localStorage.setItem(AppInfo.KEYS.INSTANCE, url) }

	get accessToken () { return localStorage.getItem(`${AppInfo.KEYS.ACCESSTOKEN}?${this.instance}`) }
	set accessToken (token = "") { localStorage.setItem(`${AppInfo.KEYS.ACCESSTOKEN}?${this.instance}`, token) }
}