import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { useFrame } from 'react-three-fiber'
import { VRM, VRMUtils, VRMLoaderPlugin } from '@pixiv/three-vrm'
import { Scene, Group, Clock } from 'three'
import { TextToTalk } from "./TextToTalk"

interface Props {
    url: string
    talker: TextToTalk
}
let model: VRM | null = null
let scene: Scene | Group | null = null
const clock: Clock = new Clock(true)
export default function VRMRender(props: Props) {
    useFrame(() => {//毎フレーム実装
        if (model) {//モデルが読み込み済なら
            model.update(clock.getDelta());//モデルの描画をアップデート
            model.expressionManager?.setValue("aa", props.talker ? props.talker.GetLevel() : 0)//口を音量に応じ開ける
        }
    })
    if (scene === null) {//まだシーンが読み込めてないなら
        const loader = new GLTFLoader()//GLTF用のローダー
        loader.register((parser) => {
            return new VRMLoaderPlugin(parser)//VRM用のプラグインを登録
        })
        throw loader.loadAsync(//ロードを行う
            props.url,
            // 進捗を出力
            (xhr) => {
                console.log(((xhr.loaded / xhr.total) * 100).toString() + "%")
            }
        ).then((tmpGltf) => {//ロードが完了したら
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const vrm: VRM = (tmpGltf.userData.vrm as VRM)//VRMのインスタンスを取り出す
            console.log("ロード完了！")
            model = vrm//モデルを変数に保存
            VRMUtils.removeUnnecessaryJoints(vrm.scene)//不必要に結合されたジョイントを削除
            VRMUtils.rotateVRM0(vrm)//VRMのバージョンが古いと後ろを向いているので前を向かせる
            scene = vrm.scene//シーンを設定
        }).catch((error) => {
            console.log("読み込みエラー発生")
            console.log(error)
        })
    }
    return <primitive object={scene} dispose={null} />//読み込んだシーンを返す
}