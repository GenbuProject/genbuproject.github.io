window.addEventListener("DOMContentLoaded", () => {
	if (!base.user) {
		location.href = "http://localhost:8001/Content/SimpleThread/v2/403/";
	} else {
		DOM("#Profile_Manager").textContent = (() => {
			return new Style({
				"#Profile_Photo": {
					"Background-Image": ["URL(", base.user.photoURL, ")"].join('"')
				}
			}).textContent;
		})();

		DOM("#Profile_Info_Name").textContent = base.user.displayName;
	}
});