window.addEventListener("DOMContentLoaded", () => {
	DOM('@*.mdl-extender__mdl-select').forEach((select) => {
		select.classList.add("mdl-textfield"),
		select.classList.add("mdl-js-textfield"),
		select.classList.add("mdl-textfield--floating-label");

		let uuid = new DOM.Randomizer(DOM.Randomizer.TYPE.LEVEL3).generate(16),
			selectItems = select.querySelectorAll("Li");

			selectItems.forEach((selectItem) => {
				selectItem.classList.add("mdl-menu__item");

				selectItem.addEventListener("click", (event) => {
					select.classList.add("is-dirty");
					select.querySelector("Input.mdl-textfield__input").value = selectItem.textContent;

					selectItem.textContent || select.classList.remove("is-dirty");
				});
			});

		select.appendChild(
			DOM("Input", {
				id: uuid,
				classes: ["mdl-textfield__input"],

				attributes: {
					"Type": "Text",
					"Readonly": "Readonly"
				}
			})
		);

		select.appendChild(
			DOM("Label", {
				classes: ["mdl-textfield__label"],
				text: select.dataset.label || ""
			})
		);

		select.appendChild(
			DOM("UL", {
				classes: ["mdl-menu", "mdl-js-menu", "mdl-js-ripple-effect", "mdl-menu--bottom-left"],

				attributes: {
					"For": uuid
				},

				children: selectItems
			})
		);
	});

	DOM("@*.mdl-extender__mdl-list--editable").forEach((list) => {
		let listUUID = list.id || new DOM.Randomizer(DOM.Randomizer.TYPE.LEVEL3).generate(16),
			fieldQuantity = 0,
			items = list.querySelectorAll("Li");

		for (let i = 1; i <= 5; i++) {
			if (list.classList.contains("mdl-extender__mdl-list--" + i + "-field")) {
				fieldQuantity = i;
				break;
			} else {
				if (i >= 5) {
					fieldQuantity = 1;
					list.classList.add("mdl-extender__mdl-list--1-field");
				}
			}
		}
		
		list.id = listUUID;
		list.dataset.listlength = 0;

		list.insertBefore(DOM("Li", {
			classes: ["mdl-list__item"],

			children: [
				DOM("Span", {
					classes: ["mdl-list__item-primary-content"],
					text: list.dataset.label || ""
				}),

				DOM("Span", {
					classes: ["mdl-list__item-secondary-action"],

					children: [
						DOM("Button", {
							id: [listUUID, "Add"].join("_"),
							classes: ["mdl-button", "mdl-js-button", "mdl-button--icon", "mdl-js--ripple-effect"],

							children: [
								DOM("I", {
									classes: ["material-icons"],
									text: "add"
								})
							],

							events: {
								"click": () => {
									let itemUUID = new DOM.Randomizer(DOM.Randomizer.TYPE.LEVEL3).generate(16);
									let item = DOM("Li", {
										classes: ["mdl-list__item"],

										attributes: {
											"Data-ItemID": list.children.length - 1
										},

										children: [
											DOM("Span", {
												classes: ["mdl-list__item-primary-content"],

												children: (() => {
													let items = [];

													for (let i = 1; i <= 5; i++) {
														if (list.classList.contains("mdl-extender__mdl-list--" + i + "-field")) {
															fieldQuantity = i;
															break;
														} else {
															if (i >= 5) {
																fieldQuantity = 1;
																list.classList.add("mdl-extender__mdl-list--1-field");
															}
														}
													}

													for (let i = 1; i <= fieldQuantity; i++) {
														let fieldUUID = new DOM.Randomizer(DOM.Randomizer.TYPE.LEVEL3).generate(16);

														items.push((() => {
															let field = DOM("Div", {
																id: [listUUID, itemUUID, fieldUUID].join("_"),
																classes: ["mdl-textfield", "mdl-js-textfield", "mdl-textfield--floating-label"],

																children: [
																	DOM("Input", {
																		id: [listUUID, itemUUID, fieldUUID, "Input"].join("_"),
																		classes: ["mdl-textfield__input"],

																		attributes: {
																			"Type": "Text",
																			"Data-FieldID": i - 1
																		}
																	}),

																	DOM("Label", {
																		id: [listUUID, itemUUID, fieldUUID, "Label"].join("_"),
																		classes: ["mdl-textfield__label"],

																		attributes: {
																			"For": [listUUID, itemUUID, fieldUUID, "Input"].join("_")
																		}
																	})
																]
															}); new MaterialTextfield(field);

															field.querySelector("#" + [listUUID, itemUUID, fieldUUID, "Label"].join("_")).textContent = list.dataset["field" + (field.querySelector("#" + [listUUID, itemUUID, fieldUUID, "Input"].join("_")).dataset.fieldid || 0)] || "";

															return field;
														})());
													}

													return items;
												})()
											}),

											DOM("Span", {
												classes: ["mdl-list__item-secondary-action"],

												children: [
													DOM("Button", {
														id: [listUUID, itemUUID, "Remove"].join("_"),
														classes: ["mdl-button", "mdl-js-button", "mdl-button--icon", "mdl-js--ripple-effect"],

														children: [
															DOM("I", {
																classes: ["material-icons"],
																text: "remove"
															})
														],

														events: {
															"click": (event) => {
																list.querySelectorAll("*").forEach((otherList) => {
																	!(parseInt(item.dataset.itemid) < parseInt(otherList.dataset.itemid)) || otherList.dataset.itemid--;
																});

																item.remove();
																list.dataset.listlength--;
															}
														}
													})
												]
											})
										]
									});

									list.appendChild(item);
									list.dataset.listlength++;
								}
							}
						})
					]
				})
			]
		}), items[0]);
	});
});