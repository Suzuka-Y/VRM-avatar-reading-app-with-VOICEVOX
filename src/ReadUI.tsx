import { useState } from "react"
import { TextToTalk } from "./TextToTalk"
interface Props {
    talker: TextToTalk
}
export default function ReadUI(props: Props) {
    const [text, setText] = useState<string>("")
    function TTS() {
        props.talker.Talk(text)
    }
    return (
        <div style={{ position: "absolute", bottom: 0 }}>
            <label htmlFor='text'>読み上げる文章</label>
            <textarea name='text' id='text' rows={2} cols={50} defaultValue={text} onChange={(e) => { setText(e.target.value) }} />
            <button onClick={() => TTS()}>読み上げ</button>
        </div>
    )
}