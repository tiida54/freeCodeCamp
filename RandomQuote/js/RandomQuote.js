function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}


var currentQuote = '',
    currentAuthor = '';

// 開新視窗
function openURL(url) {
    window.open(url, 'Share', 'width=960, height=800, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

function getQuote() {
    $.ajax({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: 'https://sslapi.hitokoto.cn/?encode=json',
        success: function (r) {
            r = JSON.parse(r);
            currentQuote = r.hitokoto;
            currentAuthor = r.from;
            if (inIframe()) {
                $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
                $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + encodeURIComponent(currentAuthor) + '&content=' + encodeURIComponent(currentQuote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
            }
            $(".quote-text").animate({
                    opacity: 0
                }, 500,
                function () {
                    $(this).animate({
                        opacity: 1
                    }, 500);
                    $('#text').text(r.hitokoto);
                });

            $(".quote-author").animate({
                    opacity: 0
                }, 500,
                function () {
                    $(this).animate({
                        opacity: 1
                    }, 500);
                    $('#author').html(r.from);
                });
        }
    });
}
//更改背景颜色
function bgColor() {

    var colors = ['bg-primary', 'bg-secondary', 'bg-success', 'bg-danger', 'bg-info', 'bg-dark'];
    var color = Math.floor(Math.random() * colors.length);
    console.log(colors[color]);
    $(".button,body").removeClass('bg-primary bg-secondary bg-success bg-danger bg-info bg-dark').addClass(colors[color]);
}

$(document).ready(function () {
    getQuote();
    $('#new-quote').on('click', getQuote);
    $('#new-quote').on('click', bgColor);
    $('#tweet-quote').on('click', function () {
        bgColor();
        if (!inIframe()) {
            openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        }
    });
    $('#tumblr-quote').on('click', function () {
        bgColor();
        if (!inIframe()) {
            openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + encodeURIComponent(currentAuthor) + '&content=' + encodeURIComponent(currentQuote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
        }
    });
    // 鍵盤切換quote
    document.onkeydown = function (e) {
        var e = e || event;
        if (e.keyCode == 13) {
            getQuote();
        }
    };
});