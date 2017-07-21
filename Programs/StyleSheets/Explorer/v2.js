/*/
 *###########################################################################
 *#Explorer.js v2
 *#Copyright (C) 2017 Genbu Project & Genbu Hase All Rights Reserved.
 *###########################################################################
/*/

const GP = Object.create(Object.prototype, {
	Explorer: {
		value: (function () {
			const Explorer = document.registerElement("GP-Explorer", {
				prototype: Object.create(HTMLTableElement.prototype, {
					createdCallback: { value () {} },
					attachedCallback: { value () {} },
					detachedCallback: { value () {} },
					attributeChangedCallback: { value (attr, oldValue, newValue) {} }
				})
			}); Object.defineProperties(Explorer, {
				Header: {
					value: document.registerElement("GP-Explorer-Header", {
						prototype: Object.create(HTMLTableSectionElement.prototype, {
							createdCallback: { value () {} },
							attachedCallback: { value () {} },
							detachedCallback: { value () {} },
							attributeChangedCallback: { value (attr, oldValue, newValue) {} }
						})
					}),

					enumerable: true
				},

				Content: {
					value: document.registerElement("GP-Explorer-Content", {
						prototype: Object.create(HTMLTableSectionElement.prototype, {
							createdCallback: { value () {} },
							attachedCallback: { value () {} },
							detachedCallback: { value () {} },
							attributeChangedCallback: { value (attr, oldValue, newValue) {} }
						})
					}),

					enumerable: true
				},



				File: {
					value: document.registerElement("GP-Explorer-File", {
						prototype: Object.create(HTMLTableRowElement.prototype, {
							initializeElement: {
								value () {
									for (let i = 0; i < this.attributes.length; i++) {
										this.attributeChangedCallback(this.attributes[i].name, "", this.attributes[i].value);
									}
								}
							},

							createdCallback: {
								value () {
									this.initializeElement();

									this.addEventListener("click", function (event) {
										this.selected = !this.selected;
									});
								}
							},

							attachedCallback: { value () { this.initializeElement() } },
							detachedCallback: { value () { this.initializeElement() } },

							attributeChangedCallback: {
								value (attr, oldValue, newValue) {
									switch (attr.toLowerCase()) {
										case "path":
											this.filePath = newValue;
											break;
									}
								}
							},



							__filepath__: { value: "", configurable: true, writable: true },
							__selected__: { value: false, configurable: true, writable: true },

							filePath: {
								/** @returns {String} **/
								get () { return this.__filepath__ },

								/** @param {String} val **/
								set (val) {
									this.__filepath__ = val;
									this.setAttribute("Path", val);
								}
							},

							selected: {
								/** @returns {Boolean} **/
								get () { return this.__selected__ },

								/** @param {Boolean} val **/
								set (val) {
									this.__selected__ = val;
									val ? this.setAttribute("Selected", "") : this.removeAttribute("Selected");
								}
							}
						})
					}),

					enumerable: true
				}
			});

			return Explorer;
		})(),

		enumerable: true
	}
});