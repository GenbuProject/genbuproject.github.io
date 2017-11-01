const RTR = (function () {
	const AudioPlayer = (function () {
		const CTX = new (AudioContext || webkitAudioContext);

		/**
		 * @param {String} url
		 */
		function AudioPlayer (url) {
			!url || (this.src = url);
		}; AudioPlayer.prototype = Object.create(Object.prototype, {
			constructor: { value: AudioPlayer },



			currentSource: { value: CTX.createBufferSource(), configurable: true, writable: true },
			__src__: { value: "", configurable: true, writable: true },
			__buffer__: { value: null, configurable: true, writable: true },

			src: {
				/**
				 * @returns {String}
				 */
				get () {
					return this.__src__;
				},

				/**
				 * @param {String} val
				 */
				set (val) {
					this.__src__ = val;
					
					DOM.xhr({
						type: "GET",
						url: val,
						doesSync: true,
						resType: "arraybuffer",

						onLoad: (function (event) {
							CTX.decodeAudioData(event.target.response, (function (audioBuf) {
								this.buffer = audioBuf;
							}).bind(this));
						}).bind(this)
					});
				}
			},

			buffer: {
				/**
				 * @returns {AudioBuffer}
				 */
				get () {
					return this.__buffer__;
				},

				/**
				 * @param {AudioBuffer} val
				 */
				set (val) {
					this.__buffer__ = val;

					this.generateSource(val);
				}
			},



			play: {
				value () {
					this.currentSource.start(0);

					this.generateSource(this.buffer);
				},

				enumerable: true
			},

			generateSource: {
				/**
				 * @param {AudioBuffer} audioBuf
				 */
				value (audioBuf) {
					this.currentSource = CTX.createBufferSource();
					this.currentSource.buffer = audioBuf;
					this.currentSource.connect(CTX.destination);
				}
			}
		})

		return AudioPlayer;
	})();



	const template = (function () {
		let body = DOM("Body");
			body.innerHTML = DOM.xhr({ url: "Template.html", doesSync: false }).response;
			
		return body;
	})();

	const audioPlayer = {}; Object.defineProperty(audioPlayer, "ctx", { value: new (AudioContext || webkitAutioContext), enumerable: true }); Object.defineProperties(audioPlayer, {
		bgm: {
			value: new AudioPlayer()
		},

		se: {
			value: Object.create(Object.prototype, {
				perfect: {
					value: new AudioPlayer("assets/sounds/Tone_Perfect.wav"),
					enumerable: true
				},

				great: {
					value: new AudioPlayer("assets/sounds/Tone_Great.mp3"),
					enumerable: true
				},

				good: {
					value: new AudioPlayer("assets/sounds/Tone_Good.wav"),
					enumerable: true
				},

				miss: {
					value: new AudioPlayer(),
					enumerable: true
				}
			}),

			enumerable: true
		}
	});



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
								
								this.textContent = val;
								this.shadowRoot.querySelector("RTR-Score-Scorebar").value = val;
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

										this.getRootNode().querySelector('Style[UUID="ScorebarStyle"]').textContent = (function () {
											let style = new Style({
												"RTR-Score-Scorebar:Before": {
													"Width": ((val / 1000000) > 1 ? 1 : val / 1000000) * 100 + "%"
												}
											}); style.setAttribute("UUID", "ScorebarStyle");

											return style.textContent.replace(/\r\n/g, "").replace(/\t/g, "");
										})();
									}
								}
							})
						}),

						enumerable: true
					}
				});

				return Score;
			})(),

			enumerable: true
		},

		Playzone: {
			value: document.registerElement("RTR-Playzone", {
				prototype: Object.create(HTMLDivElement.prototype, {
					createdCallback: {
						value () {
							for (let i = 0; i < this.children.length; i++) {
								this.children[i].style.transform = ["Rotate(", 90 - 22.5 * i, "deg)"].join("");
							}
						}
					}
				})
			}),

			enumerable: true
		},

		ToneStream: {
			value: (function () {
				const ToneStream = document.registerElement("RTR-ToneStream", {
					prototype: Object.create(HTMLDivElement.prototype, {
						createdCallback: {
							value () {
								let base = this.createShadowRoot();
									base.appendChild(document.importNode(template.querySelector("Template#RTR-ToneStream").content, true));
							}
						},

						attachedCallback: { value () {} },
						detachedCallback: { value () {} },
						attributeChangedCallback: { value (attr, oldValue, newValue) {} },



						addTone: {
							value (toneObj) {
								this.appendChild(toneObj || new RTR.Tone());
							}
						}
					})
				}); Object.defineProperties(ToneStream, {
					EndPoint: {
						value: document.registerElement("RTR-ToneStream-EndPoint", {
							prototype: Object.create(HTMLDivElement.prototype, {
								createdCallback: {
									value () {
										["mousedown"].forEach((function (elem, index, parent) {
											this.addEventListener(elem, function (event) {
												let closedTone = this.getRootNode().host.children[this.getRootNode().host.children.length - 1];

												if (closedTone) {
													let selfBoundary = { top: this.offsetTop, height: this.offsetHeight },
														closedToneBoundary = { top: closedTone.offsetTop, height: closedTone.offsetHeight };

													console.info([selfBoundary.height, Math.abs(selfBoundary.top - closedToneBoundary.top)]);

													if (Math.abs(selfBoundary.top - closedToneBoundary.top) <= selfBoundary.height / 3) {
														console.info("Perfect");
														audioPlayer.se.perfect.play();
													} else if (Math.abs(selfBoundary.top - closedToneBoundary.top) <= selfBoundary.height / 2) {
														console.info("Great");
														audioPlayer.se.great.play();
													} else if (Math.abs(selfBoundary.top - closedToneBoundary.top) <= selfBoundary.height / 1.5) {
														console.info("Good");
														audioPlayer.se.good.play();
													} else {
														console.info("Miss");
													}
												}

												document.querySelector("RTR-Score").value += Math.round(Math.random() * 1000 + 1);
											});
										}).bind(this));
									}
								},

								attachedCallback: {
									value () {
										let drawer = this.getRootNode().querySelector('Canvas[UUID="ToneDrawer"]');
											drawer.width = this.offsetWidth,
											drawer.height = this.getRootNode().host.offsetHeight - this.offsetHeight;
									}
								},

								detachedCallback: { value () {} },
								attributeChangedCallback: { value (attr, oldValue, newValue) {} }
							})
						}),

						enumerable: true
					}
				});

				return ToneStream;
			})(),

			enumerable: true
		},

		Tone: {
			value: document.registerElement("RTR-Tone", {
				prototype: Object.create(HTMLImageElement.prototype, {
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

							this.addEventListener("transitionend", function (event) {
								if (event.propertyName == "top") this.streaming = false;
							});
						}
					},

					attachedCallback: {
						value () {
							this.initializeElement();

							setTimeout((function () {
								this.streaming = true;
							}).bind(this), 50);
						}
					},

					detachedCallback: { value () { this.initializeElement() } },

					attributeChangedCallback: {
						value (attr, oldValue, newValue) {
							switch (attr.toLowerCase()) {
								case "src":
									this.src = newValue;
									break;

								case "streaming":
									this.streaming = (newValue === "" ? true : false);
									break;
							}
						}
					},



					__src__: { value: "", configurable: true, writable: true },
					__streaming__: { value: null, configurable: true, writable: true },

					src: {
						/** @returns {String} */
						get () { return this.__src__ },

						/** @param {String} val */
						set (val) {
							this.__src__ = val; this.setAttribute("src", val);

							this.style.backgroundImage = ["URL(", val, ")"].join('"');
						}
					},

					streaming: {
						/** @returns {Boolean} */
						get () { return this.__streaming__ },

						/** @param {Boolean} val */
						set (val) {
							this.__streaming__ = val;
							val ? this.setAttribute("Streaming", "") : this.removeAttribute("Streaming");

							if (!val) this.remove();
						}
					}
				})
			}),

			enumerable: true
		}
	});

	return RTR;
})();