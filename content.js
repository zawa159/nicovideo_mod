// $(document).ready(function () {
//     var currentURL = window.location.href;
//     console.log("background.js 動作");
//     // ニコレポ画面の判定
//     if (currentURL.includes("/my")) {
//         console.log("ニコレポ画面です");
//         // ニコレポ画面用の処理
//         handleNicoRepoPage();

//         // 動画画面の判定
//     } else if (currentURL.includes("/watch")) {
//         console.log("動画画面です");
//         // 動画画面用の処理
//         handleVideoPage();

//     } else {
//         console.log("その他のページです");
//         // その他のページ用の処理
//     }
// });

$(document).on('mouseover', function (e) {
    var currentURL = window.location.href;
    // console.log("background.js 動作");
    // ニコレポ画面の判定
    if (currentURL.includes("/my")) {
        // console.log("ニコレポ画面です");
        // ニコレポ画面用の処理
        handleNicoRepoPage();

        // 動画画面の判定
    } else if (currentURL.includes("/watch")) {
        console.log("動画画面です");
        // 動画画面用の処理
        handleVideoPage();

    } else {
        console.log("その他のページです");
        // その他のページ用の処理
    }
});

function handleNicoRepoPage() {
    // ニコレポ画面用のコード
    $(window).on('scroll', function () {
        // ページのスクロール位置
        var scrollPosition = $(window).scrollTop() + $(window).height();

        // ドキュメントの高さ
        var documentHeight = $(document).height() - 50000 ;  //ロード時間を加味して、下部到達前に動作させる

        // ページの一番下に到達したかを判定
        if (scrollPosition > documentHeight) {
            // console.log('画面下部に到達しました！');
            $('.Timeline-more').click(); // ボタンのクラスをクリック
        }
    });
}

function handleVideoPage() {
    console.log("handleVideoPage work!")

    // 対象動画プレイヤーを取得
    //var videoPlayer = $('.grid-area_[player]');
    // var videoPlayer = $('cursor_inherit ring_none [&_[data-name=storyboard-content]]:filter_[blur(8px)_brightness(0.9)]');
    var videoPlayer = $('[data-name="storyboard-content"]');

    console.log(videoPlayer);

    // 動画画面上の操作
    $(videoPlayer).on('mouseover', function (e) {
        console.log("mouseover");
    });
    $(videoPlayer).on('click', function (e) {
        console.log("click");
    });

    $(videoPlayer).on('while', function (e) {
        console.log("ホイール");
    });
}
