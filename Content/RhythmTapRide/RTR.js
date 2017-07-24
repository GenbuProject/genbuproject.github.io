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
						createdCallback: { value () {} },
						attachedCallback: { value () {} },
						detachedCallback: { value () {} },
						attributeChangedCallback: { value (attr, oldValue, newValue) {} }
					}),

					extends: "Img"
				}); Object.defineProperties(Tone, {
					CenterToneSign: {
						value: document.registerElement("RTR-Tone-CenterToneSign", {
							prototype: Object.create(Tone.prototype, {
								createdCallback: { value () {} },
								attachedCallback: { value () {} },
								detachedCallback: { value () {} },
								attributeChangedCallback: { value (attr, oldValue, newValue) {} }
							}),

							extends: "Img"
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