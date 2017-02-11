window.addEventListener("DOMContentLoaded", function () {
	for (let i = 0; i < DOM(":Form").length; i++) {
		DOM(":Form")[i].children.forEach(function (Elem, ID, Parent) {
			Elem.addEventListener("change", function (Event) {
				window.opener.Args[i][ID] = Elem.value != "" ? (ID == 4 ? Elem.value : Elem.valueAsNumber) : 0;
			});
		});
	}
});