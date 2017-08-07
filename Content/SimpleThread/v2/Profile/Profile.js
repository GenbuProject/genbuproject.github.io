window.addEventListener("DOMContentLoaded", () => {
	if (!base.user) {
		location.href = "https://genbuproject.github.io/Content/SimpleThread/v2/403/";
	} else {
		DOM("#Profile_Manager").textContent = (() => {
			return new Style({
				"#Profile_Photo": {
					"Background-Image": ["URL(", base.user.photoURL, ")"].join('"')
				}
			}).textContent;
		})();

		base.Database.get("users/" + base.user.uid, (res) => {
			DOM("#Profile_Info_Name_Input").value = res.userName,
			DOM("#Profile_Info_Detail_Input").value = res.detail;
		});
	}



	DOM("#Profile_Info_Btns_Apply").addEventListener("click", () => {
		base.Database.update("users/" + base.user.uid, {
			userName: DOM("#Profile_Info_Name_Input").value,
			detail: DOM("#Profile_Info_Detail_Input").value
		});
	});

	DOM("#Profile_Info_Btns_Reload").addEventListener("click", () => {
		base.Database.update("users/" + base.user.uid, {
			userName: base.user.displayName
		});

		DOM("#Profile_Info_Name_Input").value = base.user.displayName;
	});
});