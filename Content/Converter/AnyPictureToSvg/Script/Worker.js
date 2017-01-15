let self = this;

self.addEventListener("message", function (Event) {
	for (let y = 0; y < Pixels.height; y++) {
		for (let x = 0; x < Pixels.width; x++) {
			Container.appendChild(
				new Svg.Rect({
					Width: 1,
					Height: 1,
					
					X: x,
					Y: y,
					Fill: Svg.RGBA(Pixels.data[(x + y * Pixels.width) * 4], Pixels.data[(x + y * Pixels.width) * 4 + 1], Pixels.data[(x + y * Pixels.width) * 4 + 2], Pixels.data[(x + y * Pixels.width) * 4 + 3])
				})
			);
		}
	}
});