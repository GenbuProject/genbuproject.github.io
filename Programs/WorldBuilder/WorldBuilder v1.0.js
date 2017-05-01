/*/
 *#######################################################################
 *WorldBuilder v1.0
 *Copyright (C) 2017-2020 Genbu Project & Genbu Hase All Rights Reversed.
 *#######################################################################
/*/
const WorldBuilder = (function () {
	function WorldBuilder (Width, Height) {
		let Ctx = new THREE.WebGLRenderer({ antialias: true });
			Ctx.setSize(Width, Height);

			document.body.appendChild(Ctx.domElement);

		let World = new THREE.Scene();

		let Camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);
			Camera.position.set(-256, 128, 256);
			
			new THREE.OrbitControls(Camera);

		let Light = new THREE.AmbientLight(0xFFFFFF);
			World.add(Light);
			
		let Grid = new THREE.GridHelper(1024, 32);
			Grid.material.color = new THREE.Color(0x666666);

			World.add(Grid);

			

		let Ground = new THREE.Mesh(new THREE.PlaneGeometry(1024, 1024), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("Image/Ground.png") }));
			Ground.position.set(0, 0, 0);
			Ground.rotation.set(-(Math.PI / 2), 0, 0);

			World.add(Ground);

		(function Render () {
			requestAnimationFrame(Render);

			Ctx.render(World, Camera);
		})();



		this.world = new WorldBuilder.World(this);
		this.blockManager = null//new WorldBuilder.BlockManager();
	}; WorldBuilder.prototype = Object.create(null, {
		world: { value: null, configurable: true, writable: true, enumerable: true },
		blockManager: { value: null, configurable: true, writable: true, enumerable: true }
	});

	WorldBuilder.World = (function () {
		function World (Scope) {
			World.scope = Scope;

			this.environment = new World.Environment();
		}; World.prototype = Object.create(null, {
			blocks: { value: [], configurable: true, writable: true, enumerable: true },
			environment: { value: null, configurable: true, writable: true, enumerable: true },

			putBlock: {
				value: function (X, Y, Z, Block) {

				}
			}
		});

		World.Environment = (function () {
			function Environment () {};
			
			Environment.prototype = Object.create(null, {
				blockSize: { value: [32, 32, 32], configurable: true, writable: true, enumerable: true },
				worldSize: { value: [1024, 4096, 1024], configurable: true, writable: true, enumerable: true }
			});

			return Environment;
		})();

		return World;
	})();

	return WorldBuilder;
})();