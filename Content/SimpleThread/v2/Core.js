window.base = parent.base || {};

window.addEventListener("DOMContentLoaded", () => {
	DOM('@A[Href]:Not([Href^="javascript:"])').forEach((elem) => {
		elem.addEventListener("click", (event) => {
			event.preventDefault();

			parent.document.querySelector("IFrame.mdl-layout__content").src = elem.href;
		});
	});

	DOM('@*.mdl-select').forEach((elem) => {
		elem.classList.add("mdl-textfield");
		elem.classList.add("mdl-js-textfield");

		let uuid = new DOM.Randomizer(DOM.Randomizer.TYPE.LEVEL3).generate(10),
			selectItems = elem.querySelectorAll("Li");

			selectItems.forEach((elem) => {
				elem.classList.add("mdl-menu__item");

				elem.addEventListener("click", (event) => {
					elem.parentNode.parentNode.parentNode.querySelector("Input.mdl-textfield__input").value = elem.textContent;
				});
			});

		elem.appendChild(
			DOM("Input", {
				attributes: {
					"ID": uuid,
					"Class": "mdl-textfield__input",
					"Type": "Text",
					"Readonly": "Readonly"
				}
			})
		);

		elem.appendChild(
			DOM("UL", {
				attributes: {
					"Class": "mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-left",
					"For": uuid
				},

				children: selectItems
			})
		);
	});
});