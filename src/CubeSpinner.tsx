import { useState } from 'react'
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber'
export default function CubeSpinner() {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const [scene] = useState<THREE.Scene>(new THREE.Scene())//描画対象になるシーン
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.y = 1
    useFrame(() => {//毎フレーム実装
        cube.rotation.x += 1;
        cube.rotation.y += 1;
    })
    return <primitive object={scene} dispose={null} />
}