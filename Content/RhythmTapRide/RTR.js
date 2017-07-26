window.addEventListener("DOMContentLoaded", function () {
	// Initialize Firebase
	firebase.initializeApp({
		apiKey: "AIzaSyC-VgGf9pRoOpVcTA3eIrump7tKOJH1_Ao",
		authDomain: "rhythm-tap-ride.firebaseapp.com",
		databaseURL: "https://rhythm-tap-ride.firebaseio.com",
		projectId: "rhythm-tap-ride",
		storageBucket: "rhythm-tap-ride.appspot.com",
		messagingSenderId: "568561761665"
	});
});



const RTR = (function () {
	let template = (function () {
		let body = DOM("Body");
			body.innerHTML = DOM.xhr({ url: "Template.html", doesSync: false }).response;
			
		return body;
	})();



	const RTR = {}; Object.defineProperties(RTR, {
		Base: {
			value: document.registerElement("RTR-Base", {
				prototype: Object.create(HTMLDivElement.prototype, {
					createdCallback: { value () {} },
					attachedCallback: { value () {} },
					detachedCallback: { value () {} },
					attributeChangedCallback: { value (attr, oldValue, newValue) {} }
				})
			}),

			enumerable: true
		},

		Tone: {
			value: (function () {
				const Tone = document.registerElement("RTR-Tone", {
					prototype: Object.create(HTMLImageElement.prototype, {
						initializeElement: {
							value () {
								for (let i = 0; i < this.attributes.length; i++) {
									this.attributeChangedCallback(this.attributes[i].name, "", this.attributes[i].value);
								}
							}
						},

						createdCallback: { value () { this.initializeElement() } },
						attachedCallback: { value () { this.initializeElement() } },
						detachedCallback: { value () { this.initializeElement() } },

						attributeChangedCallback: {
							value (attr, oldValue, newValue) {
								switch (attr.toLowerCase()) {
									case "src":
										this.src = newValue;
										break;
								}
							}
						},



						__src__: { value: "", configurable: true, writable: true },

						src: {
							/** @returns {String} */
							get () { return this.__src__ },

							/** @param {String} val */
							set (val) {
								this.__src__ = val; this.setAttribute("src", val);

								this.style.backgroundImage = ["URL(", val, ")"].join('"');
							}
						}
					})
				}); Object.defineProperties(Tone, {
					CenterToneSign: {
						value: document.registerElement("RTR-Tone-CenterToneSign", {
							prototype: Object.create(Tone.prototype, {
							})
						}),

						enumerable: true
					}
				});

				return Tone;
			})(),

			enumerable: true
		},

		Score: {
			value: (function () {
				const Score = document.registerElement("RTR-Score", {
					prototype: Object.create(HTMLDivElement.prototype, {
						initializeElement: {
							value () {
								for (let i = 0; i < this.attributes.length; i++) {
									this.attributeChangedCallback(this.attributes[i].name, "", this.attributes[i].value);
								}
							}
						},



						createdCallback: {
							value () {
								let base = this.createShadowRoot();
									base.appendChild(document.importNode(template.querySelector("Template#RTR-Score").content, true));

								this.initializeElement();
							}
						},

						attachedCallback: { value () { this.initializeElement() } },
						detachedCallback: { value () { this.initializeElement() } },

						attributeChangedCallback: {
							value (attr, oldValue, newValue) {
								switch (attr.toLowerCase()) {
									case "value":
										this.value = parseInt(newValue);
										break;

									case "rankscore":
										this.rankScore = newValue.split(",");
										break;
								}
							}
						},


						
						__value__: { value: 0, configurable: true, writable: true },

						value: {
							/** @returns {Number} */
							get () { return this.__value__ },

							/** @param {Number} val */
							set (val) {
								this.__value__ = val; this.setAttribute("value", val);

								this.shadowRoot.querySelector("Meter").value = val;
							}
						}
					})
				}); Object.defineProperties(Score, {
					Scorebar: {
						value: document.registerElement("RTR-Score-Scorebar", {
							prototype: Object.create(HTMLDivElement.prototype, {
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
									}
								},

								attachedCallback: { value () { this.initializeElement() } },
								detachedCallback: { value () { this.initializeElement() } },

								attributeChangedCallback: {
									value (attr, oldValue, newValue) {
										switch (attr.toLowerCase()) {
											case "value":
												this.value = parseInt(newValue);
												break;

											case "rankscore":
												this.rankScore = newValue.split(",");
												break;
										}
									}
								},
							})
						}),

						enumerable: true
					},

					ScorePoint: {
						value: document.registerElement("RTR-Score-ScorePoint", { prototype: Object.create(HTMLDivElement.prototype, {}) }),
						enumerable: true
					}
				});

				return Score;
			})(),

			enumerable: true
		}
	});

	return RTR;
})();