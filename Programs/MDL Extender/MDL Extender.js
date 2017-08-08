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
				attributes: {
					"ID": uuid,
					"Class": "mdl-textfield__input",
					"Type": "Text",
					"Readonly": "Readonly"
				}
			})
		);

		select.appendChild((() => {
			let label = DOM("Label", {
				attributes: {
					"Class": "mdl-textfield__label",
				}
			}); label.textContent = select.dataset.label || "";

			return label;
		})());

		select.appendChild(
			DOM("UL", {
				attributes: {
					"Class": "mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-left",
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
			attributes: {
				"Class": "mdl-list__item"
			},

			children: [
				(() => {
					let labelTitle = DOM("Span", {
						attributes: {
							"Class": "mdl-list__item-primary-content"
						}
					}); labelTitle.textContent = list.dataset.label || "";

					return labelTitle;
				})(),

				DOM("Span", {
					attributes: {
						"Class": "mdl-list__item-secondary-action"
					},

					children: [
						DOM("Button", {
							attributes: {
								"ID": [listUUID, "Add"].join("_"),
								"Class": "mdl-button mdl-js-button mdl-button--icon mdl-js--ripple-effect"
							},

							children: [
								(() => {
									let icon = DOM("I", {
										attributes: {
											"Class": "material-icons"
										}
									}); icon.textContent = "add";

									return icon;
								})()
							],

							events: {
								"click": () => {
									let itemUUID = new DOM.Randomizer(DOM.Randomizer.TYPE.LEVEL3).generate(16);

									list.appendChild(DOM("Li", {
										attributes: {
											"Class": "mdl-list__item",
											"Data-ItemID": list.children.length - 1
										},

										children: [
											DOM("Span", {
												attributes: {
													"Class": "mdl-list__item-primary-content"
												},

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
																attributes: {
																	"ID": [listUUID, itemUUID, fieldUUID].join("_"),
																	"Class": "mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
																},

																children: [
																	DOM("Input", {
																		attributes: {
																			"ID": [listUUID, itemUUID, fieldUUID, "Input"].join("_"),
																			"Class": "mdl-textfield__input",
																			"Type": "Text",
																			"Data-FieldID": i - 1
																		}
																	}),

																	DOM("Label", {
																		attributes: {
																			"ID": [listUUID, itemUUID, fieldUUID, "Label"].join("_"),
																			"Class": "mdl-textfield__label",
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
												attributes: {
													"Class": "mdl-list__item-secondary-action"
												},

												children: [
													DOM("Button", {
														attributes: {
															"ID": [listUUID, itemUUID, "Remove"].join("_"),
															"Class": "mdl-button mdl-js-button mdl-button--icon mdl-js--ripple-effect"
														},

														children: [
															(() => {
																let icon = DOM("I", {
																	attributes: {
																		"Class": "material-icons"
																	}
																}); icon.textContent = "remove";

																return icon;
															})()
														],

														events: {
															"click": (event) => {
																let currentList = event.target.parentNode.parentNode.parentNode;
																
																list.querySelectorAll("*").forEach((otherList) => {
																	!(parseInt(currentList.dataset.itemid) < parseInt(otherList.dataset.itemid)) || otherList.dataset.itemid--;
																});

																currentList.remove();
																list.dataset.listlength--;
															}
														}
													})
												]
											})
										]
									}));

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