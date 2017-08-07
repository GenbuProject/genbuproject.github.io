window.addEventListener("DOMContentLoaded", () => {
	DOM('@*.mdl-select').forEach((elem) => {
		elem.classList.add("mdl-textfield"),
		elem.classList.add("mdl-js-textfield"),
		elem.classList.add("mdl-textfield--floating-label");

		let uuid = new DOM.Randomizer(DOM.Randomizer.TYPE.LEVEL3).generate(10),
			selectItems = elem.querySelectorAll("Li");

			selectItems.forEach((elem2) => {
				elem2.classList.add("mdl-menu__item");

				elem2.addEventListener("click", (event) => {
					elem.classList.add("is-dirty");
					elem.querySelector("Input.mdl-textfield__input").value = elem2.textContent;

					elem2.textContent || elem.classList.remove("is-dirty");
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

		elem.appendChild((() => {
			let label = DOM("Label", {
				attributes: {
					"Class": "mdl-textfield__label",
				}
			}); label.textContent = elem.getAttribute("Data-Label") || "";

			return label;
		})());

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