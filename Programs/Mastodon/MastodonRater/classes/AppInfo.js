class AppInfo {
	static get KEYS () {
		return {
			INSTANCE: "com.GenbuProject.MastodonRater.currentInstance",
			ACCESSTOKEN: "com.GenbuProject.MastodonRater.accessToken"
		}
	}



	constructor () {}

	get instance () { return sessionStorage.getItem(AppInfo.KEYS.INSTANCE) }
	set instance (url = "") { sessionStorage.setItem(AppInfo.KEYS.INSTANCE, url) }

	get accessToken () { return sessionStorage.getItem(`${AppInfo.KEYS.ACCESSTOKEN}?${this.instance}`) }
	set accessToken (token = "") { sessionStorage.setItem(`${AppInfo.KEYS.ACCESSTOKEN}?${this.instance}`, token) }
}