{

    document.oncontextmenu = function () {return false;}



    let ready = (callbackFunc) => {
        if (document.readyState !== 'loading') {
            callbackFunc();
        } else {
            document.addEventListener('DOMContentLoaded', callbackFunc);
        }
    }

    ready(() => {
        let video = videojs('video1', {
            userActions: {
                doubleClick: false
            },

            width: 734, // 幅
            height: 413, // 高さ
            autoplay: false, // 自動再生
            loop: false, // ループ再生
            controls: true, // コントロール制御表示
            preload: 'auto', // 読み込み制御
        });
        video.src({
            type: 'application/dash+xml',
            src: 'stream/test/test.mpd',
            keySystemOptions: [
                {
                    name: 'org.w3.clearkey',
                    options: {
                        'clearkeys': {
                            'OCYfniLWkYVAQNXDwaqUeQ': 'jfUe14GofJhw1Sw0yde2eQ'
                        }
                    }
                }
            ]
        });

        video.on(['loadstart', 'loadedmetadata', 'loadeddata', 'play', 'playing', 'pause', 'suspend', 'seeking', 'seeked', 'waiting', 'canplay', 'canplaythrough', 'ratechange', 'ended', 'emptied', 'error', 'abort'], (e) => {
            console.log(`EVENT: ${e.type}`);
        });
        video.on('loadeddata', () => {
            console.debug('########## VideoInfo [start] ##########');
            console.debug(`>> source: ${video.currentSrc()}`);
            console.debug(`>> duration: ${video.duration()}`);
            console.debug(`>> videoSize(WxH): ${video.videoWidth()}px x ${video.videoHeight()}px`);
            console.debug(`>> readyState: ${video.readyState()}`);
            console.debug(`>> networkState: ${video.networkState()}`);
            console.debug('########## VideoInfo [end] ##########');
        });
    });
}