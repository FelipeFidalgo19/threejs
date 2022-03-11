let scene, camera, renderer;

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    camera.rotation.y = 45/180*Math.PI;
    camera.position.x = 800;
    camera.position.y = 100;
    camera.position.Z = 1000;

    hlight = new THREE.AmbientLight (0x404040,100);
    scene.add(hlight);
    
    directionalLight = new THREE.DirectionalLight(0xffffff,100);
    directionalLight.position.set(0.5,1,0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);                
    
    light = new THREE.PointLight(0xc4c4c4,10);
    light.position.set(0,300,500);
    scene.add(light);
    


    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);;
    controls.addEventListener('change', renderer);

    let loader = new THREE.GLTFLoader();
    loader.load('3d/ironman/scene.gltf',function(gltf){
        car = gltf.scene.children[0];
        car.scale.set(5,5,5);
        scene.add(gltf.scene);
        animate();
    });
}

function animate(){
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

init();