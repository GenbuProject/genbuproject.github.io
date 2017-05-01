/*/
 *#######################################################################
 *WorldBuilder v1.0
 *Copyright (C) 2017-2020 Genbu Project & Genbu Hase All Rights Reversed.
 *#######################################################################
/*/
const WorldBuilder = (function () {
	function WorldBuilder (Args) {
		!Args ? Args = {} : null;
		!Args.width ? Args.width = window.innerWidth : null;
		!Args.height ? Args.height = window.innerHeight : null;



		let Ctx = new THREE.WebGLRenderer({ antialias: true });
			Ctx.setSize(Args.width, Args.height);

			document.body.appendChild(Ctx.domElement);

		let World = new THREE.Scene();

		let Camera = new THREE.PerspectiveCamera(50, Args.width / Args.height, 0.1, 0xFFFFFF);
			Camera.position.set(-256, 128, 256);
			
			new THREE.OrbitControls(Camera);

		let Light = new THREE.DirectionalLight(0xFFFFFF);
			Light.position.set(128, 512, 128);
			World.add(Light);
			
		let Grid = new THREE.GridHelper(16 * 512, 16, new THREE.Color(0xFF8000), new THREE.Color(0x666666));
			World.add(Grid);

			

		let Ground = new THREE.Mesh(new THREE.CubeGeometry(16 * 512, 16 * 512, 16 * 512), new THREE.MeshStandardMaterial({ color: "lightseagreen" }));
			Ground.position.set(0, -16 * 256, 0);
			Ground.rotation.set(-(Math.PI / 2), 0, 0);

			World.add(Ground);

		(function Render () {
			requestAnimationFrame(Render);

			Ctx.render(World, Camera);
		})();



		this.world = new WorldBuilder.World(this);
		this.blockManager = null//new WorldBuilder.BlockManager();
	}; WorldBuilder.prototype = Object.create(null, {
		constructor: { value: WorldBuilder }
	});



	WorldBuilder.World = (function () {
		function World (Scope) {
			World.scope = Scope;
		}; World.prototype = Object.create(null, {
			constructor: { value: World },

			putBlock: {
				value: function (X, Y, Z, Block) {

				}
			}
		});

		return World;
	})();



	WorldBuilder.Block = (function () {
		function Block () {

		}; Block.prototype = Object.create(null, {
			constructor: { value: Block },

			id: { value: 0, configurable: true, writable: true, enumerable: true },
			damage: { value: 0, configurable: true, writable: true, enumerable: true },
			name: { value: "", configurable: true, writable: true, enumerable: true },
			textures: { value: [null], configurable: true, writable: true, enumerable: true },
			modelType: { value: null, configurable: true, writable: true, enumerable: true }
		});

		return Block;
	})();



	return WorldBuilder;
})();