$(function () {
    // 歌词获取及部署
    $.get('./source/lyric.json').then(function (res) {
        let {lyric} = res
        let arr = lyric.split('\n')
        let reg = /^\[(.+)\](.*)$/
        let $lyric = $('.description .lyric-container .lyric')
        arr = arr.map(function (item) {
            let matches = item.match(reg)
            if (matches && matches[2]) {
                return {
                    'time': matches[1],
                    'words': matches[2]
                }
            }
        })
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i]) {
                arr.splice(i, 1)
            }
        }
        arr.map(function (item) {
            let $p = $('<p></p>')
            $p.attr('data-time', item.time).text(item.words)
            $p.appendTo($lyric)
        })
    })

    // 歌曲播放及控制
    let audio = document.createElement('audio')
    let $vinyl = $('.song .vinyl')
    let $play = $('.song .play')
    let $pause = $('.vinyl .pause')
    audio.src = '//res.cloudinary.com/dreza9htn/video/upload/v1517406676/C400003vUjJp3QwFcd_cp6uup.mp4'
    audio.oncanplay = function () {
        audio.play()
        $vinyl.addClass('active')
    }
    $pause.on('click', function () {
        audio.pause()
        $vinyl.removeClass('active')
        $play.addClass('active')
    })
    $play.on('click', function () {
        audio.play()
        $vinyl.addClass('active')
        $play.removeClass('active')
    })

    // 歌词控制
    $('.open').on('click', function () {
        console.log(audio.currentTime)
    })

})

