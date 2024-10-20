var handleNicoRepoPageFlg = false;  // ニコレポ画面の判定フラグ
var handleVideoPageFlg = false;     // 動画画面の判定フラグ
var etcPageFlg = false;             // その他画面判定フラグ

/**
 * 画面読み込み時にどの画面か判定
 */
$(window).on('load', function () {
    var currentURL = window.location.href;
    // console.log("background.js 動作");
    // ニコレポ画面の判定
    if (currentURL.includes("/my")) {
        // console.log("ニコレポ画面です");
        // ニコレポ画面用の処理
        handleNicoRepoPageFlg = true;

        // 動画画面の判定
    } else if (currentURL.includes("/watch")) {
        // console.log("動画画面です");
        // 動画画面用の処理
        handleVideoPageFlg = true;
        //広告のロードが遅いため、ずらして発火
        setTimeout(function () {
            autoOpenOnDisplay();
        }, 5000);  // 5秒後に発火


    } else {
        console.log("その他のページです");
        // その他のページ用の処理
        etcPageFlg = true;
    }
});

/**
 * 現在の画面でマウスカーソルを動かした際に各画面処理を動作
 */
$(document).on('mouseover', function (e) {

    // ニコレポ画面の判定
    if (handleNicoRepoPageFlg === true) {

        console.log("ニコレポ画面用です");
        // ニコレポ画面用の処理
        handleNicoRepoPage();

        // 動画画面の判定
    } else if (handleVideoPageFlg === true) {
        console.log("動画画面です");
        // 動画画面用の処理
        handleVideoPage();

    } else if (etcPageFlg === true) {
        console.log("その他のページです");
        // その他のページ用の処理
    } else {
        console.log("判定無し");
    }
});

/**
 * ニコレポ画面用の処理
 */
function handleNicoRepoPage() {
    // ニコレポ画面用のコード
    $(window).on('scroll', function () {
        // ページのスクロール位置
        var scrollPosition = $(window).scrollTop() + $(window).height();

        // ドキュメントの高さ
        var documentHeight = $(document).height() - 2500;  //ロード時間を加味して、下部到達前に動作させる

        // ページの一番下に到達したかを判定
        if (scrollPosition > documentHeight) {
            // console.log('画面下部に到達しました！');
            $('.Timeline-more').click(); // ボタンのクラスをクリック
        }
    });
}

/**
 * 動画再生画面の動画画面上で音量調節する処理
 */
// スロットリングのためのタイムアウト
let throttleTimeout = null;
const throttleDelay = 0.2; // ミリ秒単位での遅延時間

// 動画画面上での処理
function handleVideoPage() {
    // 対象動画プレイヤーを取得
    // var videoPlayer = $('[data-name="video-content"]');
    var videoPlayer = $('video');

    // 動画画面上の操作
    // ホイールで音量調整
    $(videoPlayer).on('wheel', function (event) {

        // デフォルトのスクロールを無効化
        event.preventDefault();

        // スロットリング処理(連続でホイール判定がおこなわれるため)
        if (throttleTimeout) return;  // 一定時間内に再度イベントが発生したら無視

        // タイムアウト時間設定
        throttleTimeout = setTimeout(() => {
            throttleTimeout = null;  // タイムアウト後に再び処理を許可
        }, throttleDelay);

        // ホイールが上に動いたか下に動いたかを判定
        if (event.originalEvent.deltaY < 0) {
            // キー入力イベントをシミュレート（上矢印）
            var upArrowEvent = new KeyboardEvent('keydown', {
                key: 'ArrowUp',
                keyCode: 38,
                code: 'ArrowUp',
                which: 38,
                bubbles: true
            });
            videoPlayer[0].dispatchEvent(upArrowEvent);  // videoPlayer要素にネイティブのキーイベントを発火

        } else {
            // キー入力イベントをシミュレート（下矢印）
            var downArrowEvent = new KeyboardEvent('keydown', {
                key: 'ArrowDown',
                keyCode: 40,
                code: 'ArrowDown',
                which: 40,
                bubbles: true
            });
            videoPlayer[0].dispatchEvent(downArrowEvent);  // videoPlayer要素にネイティブのキーイベントを発火
        }
    });
}

/**
 * 画面表示時に自動で開く処理
 */
function autoOpenOnDisplay() {

    // コメントリスト上の広告を閉じる処理
    // コメントリスト上の広告を取得
    const commentOnAd = $('[aria-label="Close"]');

    // コメントリストの上に広告があった場合閉じる
    if (commentOnAd) {
        commentOnAd.click();  // 広告を閉じる
    }

    // コメントリストを自動で開く処理
    // コメントリストを取得
    const commentList = $('[aria-label="コメントリスト を開閉する"]');

    // コメントリストが展開中のクラスを取得
    const commentListisOpen = $('.h_100\\%.bg-c_layer.surfaceHighEm.bd-t_m.bd-c_border.highEm.d_flex.flex-d_column');

    // コメントリストが展開済みか判定
    if (commentListisOpen === null) {
        // コメントリスト
        if (commentList) {
            commentList.click();  // コメントリストを展開する
            console.log("autoOpenOnDisplay  動作");
        }
    }

}