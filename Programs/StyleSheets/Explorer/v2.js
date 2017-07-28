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

							download: {
								value () {
									let dataGetter = new XMLHttpRequest();
										dataGetter.open("GET", this.filePath);

										dataGetter.onload = (function (event) {
											let blob = new Blob([dataGetter.response], { type: this.contentType || dataGetter.getResponseHeader("Content-Type") }),
												fileName = this.filePath.split("/")[this.filePath.split("/").length - 1];

											if (window.navigator.msSaveBlob) {
												window.navigator.msSaveBlob(blob, fileName);
											} else {
												let link = document.createElement("A");
													link.href = URL.createObjectURL(blob);
													link.download = fileName;
													link.target = "_blank";

												let clickEve = document.createEvent("MouseEvents");
													clickEve.initEvent("click", false, true);
													
												link.dispatchEvent(clickEve);
												
												URL.revokeObjectURL(blob);
											}
										}).bind(this);

										dataGetter.send(null);
								},
								
								enumerable: true
							},

							createdCallback: {
								value () {
									this.initializeElement();

									this.addEventListener("click", function (event) {
										if (this.selected) {
											this.download();
										} else {
											this.parentElement.querySelectorAll("GP-Explorer-File[Selected]").forEach(function (elem, index, parent) {
												elem.selected = false;
											});

											this.selected = true;
										}
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

										case "contenttype":
											this.contentType = newValue;
											break;

										case "selected":
											this.selected = (newValue === "" ? true : false);
											break;
									}
								}
							},



							__filePath__: { value: "", configurable: true, writable: true },
							__contentType__: { value: "", configurable: true, writable: true },
							__selected__: { value: false, configurable: true, writable: true },

							filePath: {
								/** @returns {String} **/
								get () { return this.__filePath__ },

								/** @param {String} val **/
								set (val) {
									this.__filePath__ = val;
									this.setAttribute("Path", val);
								}
							},

							contentType: {
								/** @returns {String} **/
								get () { return this.__contentType__ },

								/** @param {String} val **/
								set (val) {
									this.__contentType__ = val;
									this.setAttribute("ContentType", val);
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



console.info('This page uses "Explorer.js v2"');