import './App.css';
import VRMWrapper from './VRMWrapper';
import { Canvas } from 'react-three-fiber'
import ReadUI from './ReadUI';
import { TextToTalk } from "./TextToTalk"
const talker = new TextToTalk(new AudioContext())
function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas flat camera={{
        fov: 45,  //画角
        near: 0.1,//描画距離（最小）
        far: 1000,//描画距離（最大）
        position: [0, 1, 2],//位置を調整する
        rotation: [0, 0, 0]//角度の単位はラジアンなので注意
      }}>
        <gridHelper />{/*グリッド線を床に表示*/}
        <VRMWrapper talker={talker} /> {/*モデルを表示*/}
        <ambientLight />{/*環境光を表示*/}
      </Canvas>
      <ReadUI talker={talker} />
    </div>
  );
}
export default App;