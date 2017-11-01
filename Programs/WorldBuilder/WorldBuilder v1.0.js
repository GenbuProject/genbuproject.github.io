/*/
 *#######################################################################
 *WorldBuilder v1.0
 *Copyright (C) 2017-2020 Genbu Project & Genbu Hase All Rights Reversed.
 *#######################################################################
/*/
const WorldBuilder = (function () {
	let _ctx = null,
		_world = null;

	function WorldBuilder (Args) {
		!Args ? Args = {} : null;
		!Args.width ? Args.width = window.innerWidth : null;
		!Args.height ? Args.height = window.innerHeight : null;



		_ctx = new THREE.WebGLRenderer({ antialias: true });
			_ctx.setSize(Args.width, Args.height);
			
			document.body.appendChild(_ctx.domElement);
			
		_world = new THREE.Scene();
			_world.add(new THREE.AmbientLight(0xFFFFFF));
			
		let _grid = new THREE.GridHelper(16 * 128, 128, new THREE.Color(0xFF8000), new THREE.Color(0x000000));
			_world.add(_grid);

		let _light = new THREE.PointLight(0xFFFF00);
			_light.position.set(128 * 4, 128 * 4, 128 * 4);

			_world.add(_light);

		let _camera = new THREE.PerspectiveCamera(50, Args.width / Args.height, 0.1, 0xFFFFFF);
			_camera.position.set(-8 * 128, 256, 8 * 128);
			
			new THREE.OrbitControls(_camera);
			
		let _ground = new THREE.Mesh(new THREE.PlaneGeometry(16 * 128, 16 * 128), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: "lightseagreen" }));
			_ground.rotation.set(Math.PI / 2, 0, 0);
			
			_world.add(_ground);



		(function Render () {
			requestAnimationFrame(Render);

			_ctx.render(_world, _camera);
		})();



		this.world = new WorldBuilder.World(this);
	}; WorldBuilder.prototype = Object.create(null, {
		constructor: { value: WorldBuilder },

		getPlayer: { value () { return _player } }
	});



	WorldBuilder.World = (function () {
		let scope = null;

		function World (Scope) {
			scope = Scope;
		}; World.prototype = Object.create(null, {
			constructor: { value: World },

			putBlock: {
				value (X, Y, Z, Block) {
					let Poly = new THREE.Mesh(new THREE.CubeGeometry(16, 16, 16), new THREE.MeshStandardMaterial());
						Poly.position.set(16 * (-64 + X) + 8, 16 * Y + 8, 16 * (64 - Z) - 8);
						
						_world.add(Poly);
				}
			},

			removeBlock: {
				value (X, Y, Z) {

				}
			},

			fillBlock: {
				value (Range, Block) {

				}
			},

			replaceBlock: {
				value (Range, Old, New) {

				}
			},

			clearBlock: {
				value () {

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



	WorldBuilder.Model = (function () {
		function Model () {

		};

		return Model;
	})();



	WorldBuilder.Range = (function () {
		function Range (X1, Y1, Z1, X2, Y2, Z2) {
			!X1 ? X1 = 0 : null,
			!Y1 ? Y1 = 0 : null,
			!Z1 ? Z1 = 0 : null,
			!X2 ? X2 = 0 : null,
			!Y2 ? Y2 = 0 : null,
			!Z2 ? Z2 = 0 : null;

			this.startPos = [X1, Y1, Z1],
			this.endPos = [X2, Y2, Z2];
		}; Range.prototype = Object.create(null, {
			startPos: { value: [0, 0, 0], configurable: true, writable: true, enumerable: true },
			endPos: { value: [0, 0, 0], configurable: true, writable: true, enumerable: true }
		});

		return Range;
	})();



	return WorldBuilder;
})();