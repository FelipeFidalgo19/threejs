let scene, camera, renderer;

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    camera.rotation.y = 45/180*Math.PI;
    camera.position.x = 5;
    camera.position.y = 15;
    camera.position.Z = 1000;

    hlight = new THREE.AmbientLight (0x404040,5);
    scene.add(hlight);
    
    directionalLight = new THREE.DirectionalLight(0xffffff,5);
    directionalLight.position.set(5,1,0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);                
    
    

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);;
    controls.addEventListener('change', renderer);

    let loader = new THREE.GLTFLoader();
    loader.load('3d/terra/scene.gltf',function(gltf){
        terra = gltf.scene.children[0];
        terra.scale.set(5,5,5);
        scene.add(gltf.scene);
        animate();
    });
}

function newMaterial(){
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x0fffff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x += 0.01;

}

function animate(){
    renderer.render(scene,camera);
    requestAnimationFrame(animate); 
    window.document.getElementById('px').innerHTML = terra.position.x;
    window.document.getElementById('py').innerHTML = terra.position.y;
    terra.rotation.x += 0.01;
}

init();