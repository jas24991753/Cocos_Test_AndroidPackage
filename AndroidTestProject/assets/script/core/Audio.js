var Audio = cc.Class({
    extends: cc.Component,

    editor: {
        executeInEditMode: false,
    },

    statics: {

        __ON_ASSETS_READY__: '__ON_ASSETS_READY__',
        __ASSETS_IS_READY__: false,
        // Assets Resources 可使用的音效 url
        __AUDIO_URLS__: [],

        // 場景上的 AudioSource 物件
        __AUDIO_SOURCES__: [],

        __MUSIC_CLIP_ID__: null,
        __MUSIC_VOLUME__: 1,
        __MUSIC_IS_MUTE__: false,

        /**
         * 播放音樂。音樂只能同時存在一個，播放音樂會先停止前一個音樂
         */
        playMusic: function (name) {
            if (Audio.__ASSETS_IS_READY__) {
                let volume = Audio.__MUSIC_IS_MUTE__ ? 0 : Audio.__MUSIC_VOLUME__;
                Audio.stopMusic();
                Audio.__AUDIO_URLS__.forEach(function (url) {
                    let regexp = new RegExp(`/${name}.mp3` + '|' + `/${name}.wav`);
                    if (String(url).match(regexp)) {
                        Audio.__MUSIC_CLIP_ID__ = cc.audioEngine.play(url, true);
                        cc.audioEngine.setVolume(Audio.__MUSIC_CLIP_ID__, volume);
                        return;
                    }
                }, this);
            } else {
                cc.game.once(Audio.__ON_ASSETS_READY__, function (evt) {
                    Audio.playMusic(name);
                });
            }
        },

        /**
         * 暫停音樂
         */
        pauseMusic: function () {
            cc.audioEngine.pause(Audio.__MUSIC_CLIP_ID__);
        },

        /**
         * 回復暫停音樂
         */
        resumeMusic: function () {
            cc.audioEngine.resume(Audio.__MUSIC_CLIP_ID__);
        },

        /**
         * 停止音樂
         */
        stopMusic: function () {
            cc.audioEngine.stop(Audio.__MUSIC_CLIP_ID__);
        },

        /**
         * 設定音樂音量
         */
        setMusicVolume: function (value) {
            Audio.__MUSIC_VOLUME__ = value;
            cc.audioEngine.setVolume(Audio.__MUSIC_CLIP_ID__, Audio.__MUSIC_VOLUME__);
        },

        /**
         * 取得音樂音量
         */
        getMusicVolume: function () {
            return Audio.__MUSIC_VOLUME__;
        },

        /**
         * 開啟/關閉 音樂
         */
        muteMusic: function () {
            Audio.__MUSIC_IS_MUTE__ = !Audio.__MUSIC_IS_MUTE__;
            let volume = Audio.__MUSIC_IS_MUTE__ ? 0 : Audio.__MUSIC_VOLUME__;
            cc.audioEngine.setVolume(Audio.__MUSIC_CLIP_ID__, volume);
            window.isMuteMusic = Audio.__MUSIC_IS_MUTE__;
        },


        __SOUND_CLIPS__: [],
        __SOUND_VOLUME__: 1,
        __SOUND_IS_MUTE__: false,
        __REMOVE_CLIP__: function (id) {
            Audio.__SOUND_CLIPS__.forEach(function (clip, index, array) {
                if (clip.id == id) {
                    array.splice(index, 1);
                    return;
                }
            });
        },

        /**
         * 播放音效。音效可能會同時存在
         */
        playSound: function (name) {
            if (Audio.__ASSETS_IS_READY__) {
                let volume = Audio.__SOUND_IS_MUTE__ ? 0 : Audio.__SOUND_VOLUME__;
                Audio.__AUDIO_URLS__.forEach(function (url) {
                    let regexp = new RegExp(`/${name}.mp3` + '|' + `/${name}.wav`);
                    if (String(url).match(regexp)) {
                        let id = cc.audioEngine.play(url, false);
                        cc.audioEngine.setVolume(id, volume);
                        Audio.__SOUND_CLIPS__.push({
                            id: id,
                            name: name
                        });
                        // 音效只要撥放完，就從清單上移除
                        setTimeout(Audio.__REMOVE_CLIP__, 1000 * cc.audioEngine.getDuration(id), id);
                        return;
                    }
                }, this);
            } else {
                cc.game.once(Audio.__ON_ASSETS_READY__, function (evt) {
                    Audio.playSound(name);
                });
            }
        },



        /**
         * 停止音效。如果同時有同名的音效存在，會一併被停止
         */
        stopSound: function (name) {
            Audio.__SOUND_CLIPS__.forEach(function (clip) {
                if (clip.name == name) {
                    cc.audioEngine.stop(clip.id);
                }
            });
        },

        /**
         * 暫停音效。如果同時有同名的音效存在，會一併被暫停
         */
        pauseSound: function (name) {
            Audio.__SOUND_CLIPS__.forEach(function (clip) {
                if (clip.name == name) {
                    cc.audioEngine.pause(clip.id);
                }
            });
        },

        /**
         * 回復音效。如果同時有同名的音效存在，會一併被回復
         */
        resumeSound: function (name) {
            Audio.__SOUND_CLIPS__.forEach(function (clip) {
                if (clip.name == name) {
                    cc.audioEngine.resume(clip.id);
                }
            });
        },

        /**
         * 設定音效音量。所有的音效音量都會被設定
         */
        setSoundVolume: function (value) {
            Audio.__SOUND_VOLUME__ = value;
            Audio.__SOUND_CLIPS__.forEach(function (clip) {
                cc.audioEngine.setVolume(clip.id, Audio.__SOUND_VOLUME__);
            });
            // 場景上的 audioSource 也要一併設定
            Audio.__AUDIO_SOURCES__.forEach(function (source) {
                source.volume = Audio.__SOUND_VOLUME__;
            });
        },

        /**
         * 取得音效音量
         */
        getSoundVolume: function () {
            return Audio.__SOUND_VOLUME__;
        },

        /**
         * 開啟/關閉 音效
         */
        muteSound: function () {

            Audio.__SOUND_IS_MUTE__ = !Audio.__SOUND_IS_MUTE__;
            let volume = Audio.__SOUND_IS_MUTE__ ? 0 : Audio.__SOUND_VOLUME__;
            Audio.__SOUND_CLIPS__.forEach(function (clip) {
                cc.audioEngine.setVolume(clip.id, volume);
            });

            // 場景上的 audioSource 也要一併設定
            Audio.__AUDIO_SOURCES__.forEach(function (source) {
                source.mute = Audio.__SOUND_IS_MUTE__;
            });

            window.isSoundMute = Audio.__SOUND_IS_MUTE__;
        },

    }
});


cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {

    // 取得場景上所有節點上的 AudioSource 元件
    let scene = cc.director.getScene();
    let audioSource = [];

    scene.children.forEach(function (node) {
        audioSource = audioSource.concat(node.getComponentsInChildren(cc.AudioSource));
    });
    Audio.__AUDIO_SOURCES__ = audioSource;

    // 取的資源上所有可以撥放的音效URL
    if (cc.loader.loadResDir) {
        cc.loader.loadResDir('audios', function (err, assets) {
            Audio.__AUDIO_URLS__ = assets;
            Audio.__ASSETS_IS_READY__ = true;
            cc.game.emit(Audio.__ON_ASSETS_READY__);
        });
    } else {
        cc.loader.loadResAll('audios', function (err, assets) {
            Audio.__AUDIO_URLS__ = assets;
            Audio.__ASSETS_IS_READY__ = true;
            cc.game.emit(Audio.__ON_ASSETS_READY__);
        });
    }


}, this);