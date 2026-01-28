/**
 * @name Fuckboy
 * @version 1.0
 * @author DaddyKaze
 * @authorId 1461756942941950105
 * @website https://discord.gg/KcJtS89VxD
 * @description gets ur dead ass mic from mono to stereo on discord this makes u fuckable to da bitches
 */

module.exports = class FuckboyStereo {
    constructor() {
        this.config = {
            info: {
                name: "Fuckboy Stereo",
                author: "Daddy Z/Cumikaze",
                version: "1",
            },
            defaultConfig: []
        }

        this.fuckboy = new WeakSet();
    }

    start() {
        this.warn();
        const voiceModule = BdApi.Webpack.getModule(m => m?.prototype?.setRemoteVideoSinkWants);
        if (!voiceModule) {
            return;
        };
        BdApi.Patcher.after("FuckboyStereo", voiceModule.prototype, "setRemoteVideoSinkWants", (thisObj, _args, ret) => {
            if (thisObj?.conn && !this.fuckboy.has(thisObj.conn)) {
                this.fuckboy.add(thisObj.conn);
                BdApi.Patcher.before("FuckboyStereo", thisObj.conn, "setTransportOptions", (_thisObj, args) => {
                    const options = args[0]
                    if(!options) {
                        return;
                    }
                    if(options.audioEncoder) {
                        options.audioEncoder.params = {
                            stereo: "2"
                        }
                        options.audioEncoder.channels = 2
                    }
                    if(options.fec) {
                        options.fec = false;
                    }
                    if(options.encodingVoiceBitRate < 960000) {
                        options.encodingVoiceBitRate = 398000;
                    }
                    if(options.SetInputVolume) {
                        options.SetInputVolume = 1000;
                    }
                })
            }
            return ret;
        }) 
    }

    warn() {
        const voiceSettingsStore = BdApi.Webpack.getModule(m => typeof m?.getEchoCancellation === "function");
        if(!voiceSettingsStore){
            return;
        }
        if(voiceSettingsStore) {
            var noisesupp = voiceSettingsStore.getNoiseSuppression();
            var noisecancel = voiceSettingsStore.getNoiseCancellation();
            var echocancel = voiceSettingsStore.getEchoCancellation();
            if (noisesupp || noisecancel || echocancel) {
                 BdApi.UI.showToast("🤬 Fix Your Voice Settings Dumbass, Disable [NoiseSuppression, NoiseCancellation, EchoCancellation] To Get Fuckable",
                        {
                            type: "warning",
                            timeout: 5000
                        }
                    )
            } else {
                BdApi.UI.showToast("😍 Ahh Ready to BANG some Hoes Little Boy 💦")
            }
        }
    }
    stop() {
        BdApi.Patcher.unpatchAll("FuckboyStereo");
        this.fuckboy = new WeakSet();
    }
};
