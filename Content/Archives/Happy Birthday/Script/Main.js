let Ctx = new THREE.WebGLRenderer(),
	Scene = new THREE.Scene(),
	
	MousePoint = {X: 0, Y: 0},
	EventTargets = [],
	
	Font = null;
	
function Init() {
	new THREE.FontLoader().load("https://threejs.org/examples/fonts/optimer_regular.typeface.json", function (Result) {
		Font = Result;
	});
	
	let Camera = new THREE.PerspectiveCamera(50, document.documentElement.clientWidth / document.documentElement.clientHeight);
		Camera.position.set(0, 16, -64);
		
		Scene.add(Camera);
		
	let Controls = new THREE.OrbitControls(Camera);
		
	let Light = new THREE.DirectionalLight(0xFFFFFF);
		Light.position.set(-3, 4, -5);
		
		Scene.add(Light);
		
	let Ground = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1600, 100, 100), new THREE.MeshBasicMaterial({side: THREE.DoubleSide, color: 0xFFFFFF}));
		Ground.position.set(0, 0, 0);
		Ground.rotation.set(-(Math.PI / 2), 0, 0);
		
		Scene.add(Ground);
		
	let Present1 = new THREE.CubeGeometry(8, 8, 8),
		
		Present2 = new THREE.MultiMaterial([
			new THREE.MeshPhongMaterial({
				map: new THREE.TextureLoader().load("Image/Present-Right.png", function () {})
			}),
			
			new THREE.MeshPhongMaterial({
				map: new THREE.TextureLoader().load("Image/Present-Left.png", function () {})
			}),
			
			new THREE.MeshPhongMaterial({
				map: new THREE.TextureLoader().load("Image/Present-Top.png", function () {})
			}),
			
			new THREE.MeshPhongMaterial({
				map: new THREE.TextureLoader().load("Image/Present-Top.png", function () {})
			}),
			
			new THREE.MeshPhongMaterial({
				map: new THREE.TextureLoader().load("Image/Present-Back.png", function () {})
			}),
			
			new THREE.MeshPhongMaterial({
				map: new THREE.TextureLoader().load("Image/Present-Prev.png", function () {})
			}),
		]),
		
		Present = new THREE.Mesh(Present1, Present2);
		Present.position.set(0, 4, 0);
		
		Scene.add(Present);
		EventTargets.push(Present);
		
	Scene.fog = new THREE.FogExp2(0xAA9966, 0.005);
	
	Ctx.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
	document.body.appendChild(Ctx.domElement);
	
	(function Render () {
		requestAnimationFrame(Render);
		Controls.update();
		
		Present.rotation.set(0, Present.rotation.y + 0.02, 0);
		
		Ctx.render(Scene, Camera);
	})();
	
	window.addEventListener("click", function (Event) {
		if (Event.target == Ctx.domElement) {
			let Projector = new THREE.Projector();
			
			MousePoint.X = Event.clientX - Event.target.getBoundingClientRect().left;
			MousePoint.Y = Event.clientY - Event.target.getBoundingClientRect().top;
			
			MousePoint.X = (MousePoint.X / document.documentElement.clientWidth) * 2 - 1;
			MousePoint.Y = -(MousePoint.Y / document.documentElement.clientheight) * 2 + 1;
			
			// マウスベクトル
			let Vec = new THREE.Vector3(MousePoint.X, MousePoint.Y, 1);
				Vec.unproject(Camera);
				
			// 始点, 向きベクトルを渡してレイを作成
			let Ray = new THREE.Raycaster(Camera.position, Vec.sub(Camera.position).normalize());
			
			// クリック判定
			var Obj = Ray.intersectObjects(EventTargets);
			
			if (Obj.length > 0) {
				for (let i = 0; i < Obj.length; i++) {
					if (Obj[i].object == Present) {
						let Message = new THREE.Mesh(new THREE.TextGeometry("HAPPY BIRTHDAY, Mom!!!", {
							font: Font,
							curveSegments: 4,
							size: 10.5,
							height: 10
						}), new THREE.MeshLambertMaterial({color: 0x00FF00}));
							Scene.add(Message);
					}
				}
			}
		}
	});
}