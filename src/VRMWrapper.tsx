import { Suspense } from 'react'
import VRMAsset from './VRMRender'
import CubeSpinner from './CubeSpinner'
import { TextToTalk } from './TextToTalk'
interface Props{
    talker: TextToTalk
}
export default function VRMWrapper(props: Props) {
    return (
        <Suspense fallback={<CubeSpinner />}>//ロード中はスピナー（もどき）を表示
            <VRMAsset url='./VRM/Suzuka+11-1.vrm' talker={props.talker} />
        </Suspense>
    )
}