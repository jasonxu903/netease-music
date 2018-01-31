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
    audio.src = 'http://dl.stream.qqmusic.qq.com/C400003vUjJp3QwFcd.m4a?vkey=60AB72EE74D416F8C9B73D1DE0F829C94099CC166301DD82478BBB1FC241E4EDB03A1ED700124D299EC954E5655E32A8439C4A6FB73DBD6C&guid=6569913352&uin=0&fromtag=66'
    audio.oncanplay = function () {
        audio.play()
        $vinyl.addClass('active')
    }
    $play.on('click', function () {
        audio.pause()
        $vinyl.removeClass('active')
        $pause.addClass('active')
    })
    $pause.on('click', function () {
        audio.play()
        $vinyl.addClass('active')
        $pause.removeClass('active')
    })
})

