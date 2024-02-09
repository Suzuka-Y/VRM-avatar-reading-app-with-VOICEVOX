const TIME_DOMAIN_DATA_LENGTH = 2048;
export class TextToTalk {
    public readonly ac: AudioContext
    public readonly analyser: AnalyserNode;//音声解析用ノード
    public readonly timeDomainData: Float32Array;//スペクトルデータ格納用配列

    public constructor(ac: AudioContext) {
        this.ac = ac
        this.analyser = ac.createAnalyser()//AudioContextから生成する
        this.timeDomainData = new Float32Array(TIME_DOMAIN_DATA_LENGTH);
    }
    public Talk(text: string) {
        const url_query = `http://localhost:50021/audio_query?text=${text}&speaker=43`
        const url_synth = "http://localhost:50021/synthesis?speaker=43&enable_interrogative_upspeak=true"
        fetch(url_query, { method: 'post', headers: { 'accept': 'application/json' } })
            .then(res => res.text())
            .then(query => fetch(url_synth, { method: 'post', headers: { "accept": "audio/wav", 'Content-Type': 'application/json' }, body: query }))
            .then(res => res.arrayBuffer())
            .then(synth => this.ac.decodeAudioData(synth))
            .then(buffer => {
                const bufferSource = this.ac.createBufferSource()
                bufferSource.buffer = buffer
                bufferSource.connect(this.ac.destination)
                bufferSource.connect(this.analyser)//アナライザーに接続しておく
                bufferSource.start()
            })
            .catch(() => { console.log("音声合成時エラー") })
    }
    public GetLevel(): number {//音量を取得するための関数
        this.analyser.getFloatTimeDomainData(this.timeDomainData)//スペクトル情報を取得
        let volume = 0.0
        for (let i = 0; i < TIME_DOMAIN_DATA_LENGTH; i++) {
            volume = Math.max(volume, Math.abs(this.timeDomainData[i]))//スペクトルの最大値を取得
        }
        volume = 1 / (1 + Math.exp(-45 * volume + 5))
        if (volume < 0.1) volume = 0;//0.1未満は0とみなす
        return volume
    }
}