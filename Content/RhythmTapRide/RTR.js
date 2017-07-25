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
							get () { return this.__src__ },

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
		}
	});

	return RTR;
})();