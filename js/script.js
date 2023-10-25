//memo

//localStorage.clear(); 一括削除したいとき

// Audioオブジェクトを作成
let Audio_elem = [document.getElementById("selectSE"), document.getElementById("colorPinSE"), document.getElementById("hitPinSE"), document.getElementById("blowPinSE"), document.getElementById("hitBlowDisplaySE"), document.getElementById("normalBGM"), document.getElementById("clearSE")];
let MAIN_vol = 0.5;//1
let BGM_vol = 0.5;//2
let SE_vol = 0.5;//3
let CV_vol = 0.5;//4
let newAudio = null;

let MAIN_Mute = 1;//ミュートなら0
let BGM_Mute = 1;//ミュートなら0
let SE_Mute = 1;//ミュートなら0
let CV_Mute = 1;//ミュートなら0

let temp_hit = 0;
let temp_blow = 0;
let rank_num = 0;       //ランキング入賞用変数

//ミュート処理（画像　音声0に）
if (localStorage.getItem('MAIN_Mute') !== null) {
    MAIN_Mute = Number(localStorage.getItem('MAIN_Mute'));
}
if (localStorage.getItem('BGM_Mute') !== null) {
    BGM_Mute = Number(localStorage.getItem('BGM_Mute'));
}
if (localStorage.getItem('SE_Mute') !== null) {
    SE_Mute = Number(localStorage.getItem('SE_Mute'));
}
if (localStorage.getItem('CV_Mute') !== null) {
    CV_Mute = Number(localStorage.getItem('CV_Mute'));
}

if (localStorage.getItem('MAIN_vol') !== null) {
    MAIN_vol = parseFloat(localStorage.getItem('MAIN_vol'));
    document.getElementById("mainSoundSize").innerHTML = MAIN_vol * 10;
    document.getElementsByName("Main_Sound")[0].value = MAIN_vol * 10;
}
if (localStorage.getItem('BGM_vol') !== null) {
    BGM_vol = parseFloat(localStorage.getItem('BGM_vol'));
    document.getElementById("BGMSoundSize").innerHTML = BGM_vol * 10;
    document.getElementsByName("BGM_Sound")[0].value = BGM_vol * 10;
}
if (localStorage.getItem('SE_vol') !== null) {
    SE_vol = parseFloat(localStorage.getItem('SE_vol'));
    document.getElementById("SESoundSize").innerHTML = SE_vol * 10;
    document.getElementsByName("SE_Sound")[0].value = SE_vol * 10;
}
if (localStorage.getItem('CV_vol') !== null) {
    CV_vol = parseFloat(localStorage.getItem('CV_vol'));
    document.getElementById("CVSoundSize").innerHTML = CV_vol * 10;
    document.getElementsByName("CV_Sound")[0].value = CV_vol * 10;
}

document.getElementById("selectSE").volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
document.getElementById("colorPinSE").volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
document.getElementById("hitPinSE").volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
document.getElementById("blowPinSE").volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
document.getElementById("hitBlowDisplaySE").volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
document.getElementById("normalBGM").volume = MAIN_vol * BGM_vol * MAIN_Mute * BGM_Mute;
document.getElementById("clearSE").volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
document.getElementById("gameOverSE").volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
document.getElementById("WCblow0CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
document.getElementById("WCblow1CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
document.getElementById("WCblow2CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
document.getElementById("WCblow3CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
document.getElementById("WCblow4CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
document.getElementById("WChit0CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
document.getElementById("WChit1CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
document.getElementById("WChit2CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
document.getElementById("WChit3CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
document.getElementById("WChit4CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;

document.getElementById("WCnewrecoad").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
document.getElementById("WCrankin").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
document.getElementById("WCclear").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;


let isBGMStarted = false;

// ページが読み込まれた後、どこかのキーを押すかどこかをクリックしたらBGMを再生する
document.addEventListener("keydown", startBGM);
document.addEventListener("click", startBGM);

function startBGM() {
    if (!isBGMStarted) {
        Audio_elem[5].play();
        isBGMStarted = true;
        if (MAIN_Mute == 0) {
            document.getElementById('Mute1').setAttribute('src', "img/Mute.png");
        }
        if (BGM_Mute == 0) {
            document.getElementById("Mute2").setAttribute('src', "img/Mute.png");
        }
        if (SE_Mute == 0) {
            document.getElementById("Mute3").setAttribute('src', "img/Mute.png");
        }
        if (CV_Mute == 0) {
            document.getElementById("Mute4").setAttribute('src', "img/Mute.png");
        }
    }
}

function lowerBgmVolume() {
    document.getElementById("normalBGM").volume = MAIN_vol * BGM_vol * MAIN_Mute * BGM_Mute / 2;
}

// SEの再生終了時に音量を元に戻す
function restoreBgmVolume() {
    document.getElementById("normalBGM").volume = MAIN_vol * BGM_vol * MAIN_Mute * BGM_Mute;
}

//他のSEが再生されたらBGMの音量を下げる
Audio_elem[4].addEventListener("play", lowerBgmVolume);
Audio_elem[6].addEventListener("play", lowerBgmVolume);

//他のSEが再生終了したらBGMの音量を元に戻す
Audio_elem[4].addEventListener("ended", restoreBgmVolume);
Audio_elem[6].addEventListener("ended", restoreBgmVolume);

// 音声を再生する関数
function playAudio(elem) {
    elem.play();
}

//音量更新
function VolumeUpdate() {
    document.getElementById("selectSE").volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
    document.getElementById("colorPinSE").volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
    document.getElementById("hitPinSE").volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
    document.getElementById("blowPinSE").volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
    document.getElementById("hitBlowDisplaySE").volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
    document.getElementById("normalBGM").volume = MAIN_vol * BGM_vol * MAIN_Mute * BGM_Mute;
    document.getElementById("clearSE").volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
    document.getElementById("gameOverSE").volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;


    document.getElementById("WCblow0CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
    document.getElementById("WCblow1CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
    document.getElementById("WCblow2CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
    document.getElementById("WCblow3CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
    document.getElementById("WCblow4CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
    document.getElementById("WChit0CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
    document.getElementById("WChit1CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
    document.getElementById("WChit2CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
    document.getElementById("WChit3CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
    document.getElementById("WChit4CV").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;

    document.getElementById("WCnewrecoad").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
    document.getElementById("WCrankin").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
    document.getElementById("WCclear").volume = MAIN_vol * CV_vol * MAIN_Mute * CV_Mute;
}

//音量を調整する関数
function ChangeVolume(value1, value2) {//oninputに
    if (value2 == 1) {
        MAIN_vol = value1 / 10;
        localStorage.removeItem('MAIN_vol');
        localStorage.setItem('MAIN_vol', MAIN_vol);

        VolumeUpdate();

        document.getElementById("mainSoundSize").innerHTML = value1;

    } else if (value2 == 2) {
        BGM_vol = value1 / 10;
        localStorage.removeItem('BGM_vol');
        localStorage.setItem('BGM_vol', BGM_vol);

        VolumeUpdate();

        document.getElementById("BGMSoundSize").innerHTML = value1;

    } else if (value2 == 3) {
        SE_vol = value1 / 10;
        localStorage.removeItem('SE_vol');
        localStorage.setItem('SE_vol', SE_vol);

        VolumeUpdate();

        document.getElementById("SESoundSize").innerHTML = value1;

    } else if (value2 == 4) {
        CV_vol = value1 / 10;
        localStorage.removeItem('CV_vol');
        localStorage.setItem('CV_vol', CV_vol);

        VolumeUpdate();

        document.getElementById("CVSoundSize").innerHTML = value1;
    }
}

//Mute変更
function MuteOrNot(value) {
    if (value == 1) {
        if (MAIN_Mute == 1) {
            MAIN_Mute = 0;
            localStorage.removeItem('MAIN_Mute');
            localStorage.setItem('MAIN_Mute', MAIN_Mute);
            document.getElementById('Mute' + value).setAttribute('src', 'img/Mute.png');
        } else {
            MAIN_Mute = 1;
            localStorage.removeItem('MAIN_Mute');
            localStorage.setItem('MAIN_Mute', MAIN_Mute);
            document.getElementById('Mute' + value).setAttribute('src', 'img/Speaker.png');
        }
    } else if (value == 2) {
        if (BGM_Mute == 1) {
            BGM_Mute = 0;
            localStorage.removeItem('BGM_Mute');
            localStorage.setItem('BGM_Mute', BGM_Mute);
            document.getElementById('Mute' + value).setAttribute('src', 'img/Mute.png');
        } else {
            BGM_Mute = 1;
            localStorage.removeItem('BGM_Mute');
            localStorage.setItem('BGM_Mute', BGM_Mute);
            document.getElementById('Mute' + value).setAttribute('src', 'img/Speaker.png');
        }
    } else if (value == 3) {
        if (SE_Mute == 1) {
            SE_Mute = 0;
            localStorage.removeItem('SE_Mute');
            localStorage.setItem('SE_Mute', SE_Mute);
            document.getElementById('Mute' + value).setAttribute('src', 'img/Mute.png');
        } else {
            SE_Mute = 1;
            localStorage.removeItem('SE_Mute');
            localStorage.setItem('SE_Mute', SE_Mute);
            document.getElementById('Mute' + value).setAttribute('src', 'img/Speaker.png');
        }
    } else if (value == 4) {
        if (CV_Mute == 1) {
            CV_Mute = 0;
            localStorage.removeItem('CV_Mute');
            localStorage.setItem('CV_Mute', CV_Mute);
            document.getElementById('Mute' + value).setAttribute('src', 'img/Mute.png');
        } else {
            CV_Mute = 1;
            localStorage.removeItem('CV_Mute');
            localStorage.setItem('CV_Mute', CV_Mute);
            document.getElementById('Mute' + value).setAttribute('src', 'img/Speaker.png');
        }
    }
    VolumeUpdate();
}


//変数用意
let ans_ary = [-1, -1, -1, -1];             //解答配列
let predict_ans_ary = [-1, -1, -1, -1];     //予想解答用配列
let predict_cnt = 0;                        //予想解答回数のカウント,カウントの数と同じ位置の予想解答しか操作できないようにする(0から)
let cnt = 0;                                //ランダム解答作成時のカウント用
let hit = 0;                                //ヒット数
let blow = 0;                               //ブロー数
let flg = 0;                                //正解フラグ。失敗の時は0にする
let quest_N = 1, quest_M = 1;               //解答予想のID用の変数。'quest' + quest_N + '-' + quest_M, Checkにピックアップする時はquestM = 5
let pick_color = -1;                        //ピックアップされている色の番号を格納。非ゲーム時は-1に
let can_check_flg = -1;                     //1の時キーボードでチェックまで移動可能にし、チェックボタンを押せるようにする。ゲーム外は-1,ゲーム中で未選択の選択ボタンがありチェックできないときは0
//checkできる(1),checkできない(0),game外(-1)
let posit_act_menu = 0;                     //アクティブなメニューの番号を表示。
//0:ゲーム画面（アクティブ無）, 1:トップメニュー, 2:スコア, 3:設定, 4:ヘルプ1, 5:ヘルプ2, 6:ヘルプ3, 7:ヘルプ4, 8:ヘルプ5,
let topMenu_num = 0;                        // トップメニューの選択番号（上から順に1,2,3...,トップメニューじゃないときは０）
let score_cursor = 0;                       //１はスコアメニュー１、２はスコアメニュー２
let count_score = 0;                        //クリア時の記録回数
let time_score = 0;                         //クリア時の記録時間
let level_dif = 0;                          //クリア時の難易度(被りなしが1,被りアリが2)
let game_start_time = new Date();           //スタート時点の時間

let change_key;
let change_flg = 0;

let N_1 = 1;
let N_2 = 1;    //scoreのid用

let ary_easy = [];
let ary_hard = [];      //ランキング用の二次元配列easyは被りなし,hardは被りアリ

for (let i = 0; i < 3; i++) {
    ary_easy[i] = [null, null];
    ary_hard[i] = [null, null];
}

//キーボード初期設定
let W_key = 'W';
let S_key = 'S';
let A_key = 'A';
let D_key = 'D';
let E_key = 'E';
let Q_key = 'Q';

function toFullWidth(str) {
    return str.replace(/[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g, function (char) {
        return String.fromCharCode(char.charCodeAt(0) + 0xFEE0);
    });
}

//キー設定プリセット key <- ex) 'preset:W' ; value <- ex) X; ( W A S D E Q )
//キーボード記憶設定
//キーボード設定の文字変更
if (localStorage.getItem('preset:W') != null) {
    W_key = localStorage.getItem('preset:W').toUpperCase();
    document.getElementById("cursorUpOp").innerHTML = toFullWidth(W_key);
}
if (localStorage.getItem('preset:S') != null) {
    S_key = localStorage.getItem('preset:S').toUpperCase();
    document.getElementById("cursorDownOp").innerHTML = toFullWidth(S_key);
}
if (localStorage.getItem('preset:A') != null) {
    A_key = localStorage.getItem('preset:A').toUpperCase();
    document.getElementById("cursorLeftOp").innerHTML = toFullWidth(A_key);
}
if (localStorage.getItem('preset:D') != null) {
    D_key = localStorage.getItem('preset:D').toUpperCase();
    document.getElementById("cursorRightOp").innerHTML = toFullWidth(D_key);
}
if (localStorage.getItem('preset:E') != null) {
    E_key = localStorage.getItem('preset:E').toUpperCase();
    document.getElementById("checkKeyOp").innerHTML = toFullWidth(E_key);
}
if (localStorage.getItem('preset:Q') != null) {
    Q_key = localStorage.getItem('preset:Q').toUpperCase();
    document.getElementById("menuKeyOp").innerHTML = toFullWidth(Q_key);
}


// 無効化中かどうかを表すフラグ
let disabled = false;

// イベントリスナーを追加する関数
function addEventListeners() {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", handleClick);
    // 他のイベントリスナーを追加する場合はここに追記
}

// イベントリスナーを削除する関数
function removeEventListeners() {
    document.removeEventListener("keydown", handleKeyPress);
    document.removeEventListener("click", handleClick);
    // 他のイベントリスナーを削除する場合はここに追記
}

// キーボード操作のイベントハンドラー
function handleKeyPress(event) {
    if (disabled) {
        event.preventDefault(); // イベントを無視する
    }
}

// クリックイベントのイベントハンドラー
function handleClick(event) {
    if (disabled) {
        event.preventDefault(); // イベントを無視する
    }
}

// 一定時間の無効化を実行する関数
function disableInputsForTime(duration) {
    disabled = true;
    addEventListeners();

    setTimeout(() => {
        disabled = false;
        removeEventListeners();
    }, duration);
}


function ToTime(milliSeconds) {
    let seconds, minutes, time;
    seconds = Math.floor(milliSeconds / 100) / 10;
    minutes = Math.floor(seconds / 60);
    seconds %= 60;

    // toFixed()メソッドを使用して小数点以下第一位まで表示させる
    seconds = seconds.toFixed(1);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    time = minutes + ":" + seconds;
    return time;
}


// ローカルストレージに記録があったら最初からゲーム画面
//ストレージを確認し、スコアボードに記入andローカルストレージに記録があればゲーム画面から始める。
let re_game_flg = 0;
for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).charAt(0) == 'd') {
        re_game_flg = 1;
        break;
    }
}
if (re_game_flg == 0) {
    document.getElementById('helpMenu1').classList.add('ActiveMenu');         //メニューアクティブ化
    posit_act_menu = 4;
}
// スコア/ランキングメニューの更新メソッド（ローカルストレージ参照）
function updateScore() {
    let score_ary = [0, 0, 0];
    let x = 2;

    while (localStorage.getItem('dscore:' + x) != null) {
        score_ary[0] = Number(localStorage.getItem('dscore:' + x));
        score_ary[1] = Number(localStorage.getItem('cscore:' + x));
        score_ary[2] = Number(localStorage.getItem('tscore:' + x));

        let elem = document.createElement("p");
        if (score_ary[0] == 1) {
            if (N_1 == 1) {
                document.getElementById('score1').removeChild(document.getElementById('score1').querySelector("p"));
            }else{
                elem.classList.add('ScoreBar');
            }
            elem.setAttribute('id', 'score' + score_ary[0] + '-' + N_1);
            elem.innerHTML = N_1 + "回目<br>" + ToTime(score_ary[2]) + "<br>" + score_ary[1] + "<br>" + ToTime(score_ary[2] / score_ary[1]);
            document.getElementById('score1').appendChild(elem);
            N_1++;
        } else {
            if (N_2 == 1) {
                document.getElementById('score2').removeChild(document.getElementById('score2').querySelector("p"));
            }else{
                elem.classList.add('ScoreBar');
            }
            elem.setAttribute('id', 'score' + score_ary[0] + '-' + N_2);
            elem.innerHTML = N_2 + "回目<br>" + ToTime(score_ary[2]) + "<br>" + score_ary[1] + "<br>" + ToTime(score_ary[2] / score_ary[1]);
            document.getElementById('score2').appendChild(elem);
            N_2++;
        }

        //ランキング
        if (score_ary[0] == 1) {
            //easy
            for (let i = 0; i < 3; i++) {
                if (ary_easy[i][0] == null || ary_easy[i][0] > score_ary[1] || (ary_easy[i][0] == score_ary[1] && ary_easy[i][1] > score_ary[2])) {
                    for (let j = 2; j > i; j--) {
                        ary_easy[j][0] = ary_easy[j - 1][0];
                        ary_easy[j][1] = ary_easy[j - 1][1];
                    }
                    ary_easy[i][0] = score_ary[1];
                    ary_easy[i][1] = score_ary[2];

                    break;
                }
            }
        } else {
            //hard
            for (let i = 0; i < 3; i++) {
                if (ary_hard[i][0] == null || ary_hard[i][0] > score_ary[1] || (ary_hard[i][0] == score_ary[1] && ary_hard[i][1] > score_ary[2])) {
                    for (let j = 2; j > i; j--) {
                        ary_hard[j][0] = ary_hard[j - 1][0];
                        ary_hard[j][1] = ary_hard[j - 1][1];
                    }
                    ary_hard[i][0] = score_ary[1];
                    ary_hard[i][1] = score_ary[2];
                    break;
                }
            }
        }
        x++;
    }
}

function updateRanking() {
    for (let i = 1; i <= 3; i++) {
        if (ary_easy[i - 1][0] == null) {
            document.getElementById('numberScore1-' + i).innerHTML = '-';
            document.getElementById('timeScore1-' + i).innerHTML = '--:--.-';
        } else {
            document.getElementById('numberScore1-' + i).innerHTML = ary_easy[i - 1][0];
            document.getElementById('timeScore1-' + i).innerHTML = ToTime(ary_easy[i - 1][1]);
        }
        if (ary_hard[i - 1][0] == null) {
            document.getElementById('numberScore2-' + i).innerHTML = '-';
            document.getElementById('timeScore2-' + i).innerHTML = '--:--.-';
        } else {
            document.getElementById('numberScore2-' + i).innerHTML = ary_hard[i - 1][0];
            document.getElementById('timeScore2-' + i).innerHTML = ToTime(ary_hard[i - 1][1]);
        }
    }
}

updateScore();
updateRanking();


function ResizeHelp() { //helpTextのサイズを合わせる
    help_height = document.getElementById('helpText5').clientHeight; //一番大きいhelpText5の高さを取得
    for (let i = 1; i < 5; i++) { //それ以外のhelpTextの高さを合わせる
        document.getElementById('helpText' + i).style.height = help_height + 'px';
    }
}
ResizeHelp();
window.addEventListener("resize", ResizeHelp); //ウィンドウの横幅が変わったとき、再実行


function sleep(waitTime) {                   //スリープ
    let startTime = new Date();
    while (new Date() - startTime < waitTime);
}

//始める前・色、選択肢、Checkボタンを無効にしておく。
for (let i = 1; i < 9; i++) {                                   //選択肢ボタン非アクティブ化
    for (let j = 1; j < 5; j++) {
        document.getElementById('quest' + i + '-' + j).disabled = true;
    }
}

for (let i = 1; i < 7; i++) {                                   //色ボタン非アクティブ化
    document.getElementById('colorSample' + i).disabled = true;
}



//ゲームスタート時の解答作成
let makeAns = function () {
    if (document.getElementById('level').innerHTML == '難易度：被りなし(C)') {
        level_dif = 1;
        let ary = [0, 1, 2, 3, 4, 5];                           //被りなし確認用配列
        let rand_num = function () {
            while (1) {                                         //ans_aryに入る数値の決定
                let num = Math.floor(Math.random() * 6) + 1;    //1~6の間ランダム
                if (ary[num] != -1) {
                    ary[num] = -1;
                    return num;
                }
            }
        }
        for (cnt = 0; cnt < 4; cnt++) {
            ans_ary[cnt] = rand_num();
        }

    } else if (document.getElementById('level').innerHTML == '難易度：被りあり(C)') {
        level_dif = 2;
        for (let cnt = 0; cnt < 4; cnt++) {
            ans_ary[cnt] = Math.floor(Math.random() * 6) + 1;
        }
    }
}

//正解表示
let ansOutput = function () {
    for (let i = 0; i < 4; i++) {
        let elem = document.getElementById('ansPin' + (i + 1));

        if (ans_ary[i] == 1) {
            elem.classList.add('Blue');
        } else if (ans_ary[i] == 2) {
            elem.classList.add('Red');
        } else if (ans_ary[i] == 3) {
            elem.classList.add('Green');
        } else if (ans_ary[i] == 4) {
            elem.classList.add('Yellow');
        } else if (ans_ary[i] == 5) {
            elem.classList.add('Magenta');
        } else if (ans_ary[i] == 6) {
            elem.classList.add('White');
        }
    }
}

//画面と中身の初期化
let init = function () {
    document.getElementById('overBoardDisplay').classList.add('Dummy');//スコア表示を消去
    document.getElementById('overBoardDisplay').classList.remove(...document.getElementById('overBoardDisplay').classList);

    for (let i = 0; i < 4; i++) {           //予想解答を初期化
        predict_ans_ary[i] = -1;
    }
    predict_cnt = 0;                        //予想解答回数のカウントを0に戻す

    can_check_flg = 0;                      //can_check_flgをゲーム中の0に

    //画面の初期化/答え隠蔽
    for (let i = 1; i < 9; i++) {           //予想解答/hint初期化
        for (let j = 1; j < 5; j++) {
            document.getElementById('quest' + i + '-' + j).classList.add('Dummy');
            document.getElementById('quest' + i + '-' + j).classList.remove(...document.getElementById('quest' + i + '-' + j).classList);
            document.getElementById('hint' + i + '-' + j).setAttribute('src', 'img/Hint_Hole.png');
        }
    }
    for (let i = 1; i < 5; i++) {           //答え隠蔽
        document.getElementById('ansPin' + i).classList.add('Dummy');
        document.getElementById('ansPin' + i).classList.remove(...document.getElementById('ansPin' + i).classList);
    }

    let flg_Q = 1;
    let intervalQ = setInterval(function () {
        if (flg_Q != 5) {
            document.getElementById('ansPin' + flg_Q).classList.add('Question');
        }
        flg_Q++;
        if (flg_Q != 2) {
            newAudio = new Audio('audio/Color_Pin_SE.mp3');
            newAudio.volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
            newAudio.play();
        }
        if (flg_Q == 6) {
            clearInterval(intervalQ); // 全ての画像変更が終了したらインターバルをクリア
        }
    }, 200); // 0.2秒ごとに画像を変更（200ミリ秒）

    let flg_C = 0;
    let intervalC = setInterval(function () {
        if (flg_C == 0) {
            document.getElementById('ansLid').classList.remove('OpenLid'); //ゲートclose
            flg_C = 1;
        }
        if (flg_C == 1) {
            clearInterval(intervalC); // 全ての画像変更が終了したらインターバルをクリア
        }
    }, 1000); // 1秒ごとに画像を変更（1000ミリ秒

    let flg_Rem = 0;
    let intervalRem = setInterval(function () {
        if (flg_Rem == 0) {
            for (let i = 1; i < 5; i++) {           //答え隠蔽
                document.getElementById('ansPin' + i).classList.remove(...document.getElementById('ansPin' + i).classList);
            }
            flg_Rem = 1;
        }
        if (flg_Rem == 1) {
            clearInterval(intervalRem); // 全ての画像変更が終了したらインターバルをクリア
        }
    }, 2000); // 0.2秒ごとに画像を変更（200ミリ秒）



    //1番の解答欄と色ボタンをアクティブ化
    for (let i = 1; i < 5; i++) {
        document.getElementById('quest1-' + i).disabled = false;
    }
    for (let i = 1; i < 7; i++) {
        document.getElementById('colorSample' + i).disabled = false;
    }
    //document.getElementById('check').disabled = false;          //Checkボタンアクティブ化

    //初期位置解答欄ピックアップ
    document.getElementById('questGroup1').classList.add('Select');

    //初期位置解答ピックアップ
    document.getElementById('quest1-1').classList.add('Select');
    quest_M = 1;
    quest_N = 1;                                    //questのidを初期値の1-1に戻す

    //初期位置の色ピックアップ
    pick_color = 1;
    document.getElementById('colorSample' + pick_color).classList.add('Select');

    //スタート時間記録
    game_start_time = new Date();
}

//ヒント作成
let hintMake = function () {
    hit = 0;
    blow = 0;       //初期化
    let check_ans = [-1, -1, -1, -1];               //解答チェック用配列
    for (let i = 0; i < 4; i++) {                   //copy
        check_ans[i] = ans_ary[i];
    }

    //hit探索
    for (let i = 0; i < 4; i++) {
        if (predict_ans_ary[i] == check_ans[i]) {
            predict_ans_ary[i] = -1;
            check_ans[i] = -1;
            hit++;
        }
    }

    //blow探索
    for (let i = 0; i < 4; i++) {
        if (predict_ans_ary[i] == -1) {
            continue;
        }
        for (let j = 0; j < 4; j++) {
            if (check_ans[j] == -1) {
                continue;
            }
            if (predict_ans_ary[i] == check_ans[j]) {
                predict_ans_ary[i] = -1;
                check_ans[j] = -1;
                blow++;
            }
        }
    }
}

//ヒント表示
let hintOutput = function () {
    let i = 1;                                  //hintのidの番号
    let waitTimeCnt = hit + blow;
    let temp_cnt = predict_cnt + 1;
    temp_hit = hit;
    temp_blow = blow;
    let temp_predict = predict_cnt;

    let interval = setInterval(function () {

        //hit表示
        if (hit > 0) {
            document.getElementById('hint' + temp_cnt + '-' + i).setAttribute('src', 'img/Hit.png');
            i++;
            hit--;
            newAudio = new Audio('audio/Hit_SE.mp3');
            newAudio.volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
            newAudio.play();

        } else if (blow > 0) {
            //blow表示
            document.getElementById('hint' + temp_cnt + '-' + i).setAttribute('src', 'img/Blow.png');
            i++;
            blow--;

            newAudio = new Audio('audio/Blow_SE.mp3');
            newAudio.volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
            newAudio.play();

        } else if (i <= 4) {
            //外れ表示
            document.getElementById('hint' + temp_cnt + '-' + i).setAttribute('src', 'img/Hint_Hole.png');
            i++;
        } else {
            i++;
        }
        
        if (i == 5) {
            document.getElementById('overBoardDisplay').classList.add('ActiveMenu');
            if (temp_hit == 4 && rank_num == 0) {
                document.getElementById("clearSE").play();
                document.getElementById('overBoardDisplay').classList.add('Win');
                document.getElementById('overBoardDisplay').innerHTML = temp_hit + 'ヒット！<br>時間:' + ToTime(time_score) + "<br>回数:" + count_score + "<br>平均時間:" + ToTime(time_score / count_score);
            } else if (temp_hit == 4 && rank_num != 0) {// ランキング入ったときに通知
                document.getElementById("clearSE").play();
                document.getElementById('overBoardDisplay').classList.add('Win');
                document.getElementById('overBoardDisplay').innerHTML = temp_hit + 'ヒット！<br>時間:' + ToTime(time_score) + "<br>回数:" + count_score + "<br>平均時間:" + ToTime(time_score / count_score) + "<br>" + (rank_num == 1 ? "New Record!" : "Rank in!");
            } else if (temp_predict == 7) {// Lose
                document.getElementById("gameOverSE").play();
                document.getElementById('overBoardDisplay').innerHTML = temp_hit + 'ヒット！' + temp_blow + 'ブロー！' + "<br>ゲームオーバー";
                gameOverFunc();
            } else {
                document.getElementById('overBoardDisplay').innerHTML = temp_hit + 'ヒット！' + temp_blow + 'ブロー！';
                document.getElementById("hitBlowDisplaySE").play();
                document.getElementById('WChit' + temp_hit + 'CV').play();      //hitBlow音声
            }
        }

        document.getElementById('clearSE').addEventListener('ended', () => {
            document.getElementById('WChit' + temp_hit + 'CV').play();
        });

        document.getElementById('gameOverSE').addEventListener('ended', () => {
            document.getElementById('WChit' + temp_hit + 'CV').play();
        });

        document.getElementById('WChit' + temp_hit + 'CV').addEventListener('ended', () => {    //hitBlow音声
            if (temp_hit != 4) {
                setTimeout(() => {
                    document.getElementById('WCblow' + temp_blow + 'CV').play();
                }, 100);
            } else if (rank_num == 1) {
                setTimeout(() => {
                    document.getElementById('WCnewrecoad').play();
                }, 100);
            } else if (rank_num == 2 || rank_num == 3) {
                setTimeout(() => {
                    document.getElementById('WCrankin').play();
                }, 100);
            } else {
                setTimeout(() => {
                    document.getElementById('WCclear').play();
                }, 100);
            }
        });

        if ((i == 15 && temp_hit != 4) && (i == 15 && temp_predict != 7)) {
            document.getElementById('overBoardDisplay').classList.remove('ActiveMenu');

            clearInterval(interval); // 全ての画像変更が終了したらインターバルをクリア
        } else if (i == 15) {
            clearInterval(interval); // 全ての画像変更が終了したらインターバルをクリア
        }
    }, 200); // 0.2秒ごとに画像を変更（200ミリ秒）

    disableInputsForTime(3000); // ()秒間無効化
}

//色決定したら次の選択ボタンにピックアップ移す仕組み
//全色挿入したらCheckボタンピックアップする
let moveNext = function () {
    document.getElementById('quest' + quest_N + '-' + quest_M).classList.remove('Select');
    let inColorNum = quest_M % 4;
    while (quest_M - 1 != inColorNum && predict_ans_ary[inColorNum] != -1) {
        inColorNum = (inColorNum + 1) % 4;
    }
    if (predict_ans_ary[inColorNum] == -1) {
        quest_M = inColorNum + 1;
        document.getElementById('quest' + quest_N + '-' + quest_M).classList.add('Select');
    } else {
        can_check_flg = 1;
        document.getElementById('check').classList.add('Select');
        quest_M = 5;
    }
}

//ゲームオーバー処理
function gameOverFunc() {
    document.getElementById('overBoardDisplay').classList.add('Lose');
}

//諦める
function GiveUpFunc() {
    document.getElementById('check').innerHTML = 'Start'
    document.getElementById('startGiveUp').innerHTML = 'ゲームスタート(X)';

    //回答欄ピックアップの取り消し
    document.getElementById('questGroup' + (predict_cnt + 1)).classList.remove('Select');

    //回答ピックアップの取り消し
    document.getElementById('quest' + (predict_cnt + 1) + '-' + quest_M).classList.remove('Select');//ピックアップ削除

    //色ピックアップの取り消し
    document.getElementById('colorSample' + pick_color).classList.remove('Select');
    pick_color = -1;

    //正解表示
    ansOutput();

    for (let i = 0; i < 4; i++) {                           //予想解答を初期化
        predict_ans_ary[i] = -1;
    }

    //現ボタン非アクティブ化
    for (let i = 1; i < 5; i++) {                           //選択肢ボタン非アクティブ化
        document.getElementById('quest' + quest_N + '-' + i).disabled = true;
    }
    for (let i = 1; i < 7; i++) {                           //色ボタン非アクティブ化
        document.getElementById('colorSample' + i).disabled = true;
    }

    can_check_flg = -1;

    document.getElementById('ansLid').classList.add('OpenLid'); //ゲートオープン

    document.getElementById("giveUpAnnounce").classList.remove('ActiveMenu');

    change_flg = 0;

    document.getElementById('topMenu').classList.remove('ActiveMenu');    //メニュー非アクティブ化
    posit_act_menu = 0;
}

//諦めない
function NotGiveUpFunc() {
    document.getElementById("giveUpAnnounce").classList.remove('ActiveMenu');
    change_flg = 0;
}

//諦める確認
function giveUpCheck() {
    document.getElementById("giveUpAnnounce").classList.add('ActiveMenu');
    change_flg = 3;
}


//スタート/答え合わせ時のヒント(解答欄の移動/予想解答削除も)/正解/失敗(8回以上のミス)挙動　(書いてないときの挙動は未実装)
let checkAnsMakeHint = function () {

    if (document.getElementById('check').innerHTML == 'Check') {

        flg = 1;                                                //正解フラグ。失敗の時は0にする
        for (let i = 0; i < 4; i++) {                               //正解か失敗かの確認
            if (ans_ary[i] != predict_ans_ary[i]) {
                flg = 0;
                break;
            }
        }


        //ヒント/正解/失敗(8回以上のミス)の分岐
        if (flg == 0 && predict_cnt == 7) {                         //予想失敗/終了動作

            //ヒント作成
            hintMake();

            //ヒント表示
            hintOutput();

            //正解表示
            ansOutput();

            document.getElementById('ansLid').classList.add('OpenLid'); //ゲートオープン

            //回答欄ピックアップの取り消し
            document.getElementById('questGroup8').classList.remove('Select');

            if (quest_M != 5) {
                //回答ピックアップの取り消し
                document.getElementById('quest8-' + quest_M).classList.remove('Select');//ピックアップ削除
            } else {
                document.getElementById('check').classList.remove('Select');//ピックアップ削除
            }

            //色ピックアップの取り消し
            document.getElementById('colorSample' + pick_color).classList.remove('Select');
            pick_color = -1;

            for (let i = 0; i < 4; i++) {                           //予想解答を初期化
                predict_ans_ary[i] = -1;
            }

            //現ボタン非アクティブ化
            for (let i = 1; i < 5; i++) {                           //選択肢ボタン非アクティブ化
                document.getElementById('quest' + quest_N + '-' + i).disabled = true;
            }
            for (let i = 1; i < 7; i++) {                           //色ボタン非アクティブ化
                document.getElementById('colorSample' + i).disabled = true;
            }

            //Checkボタンをスタートボタンに変更
            document.getElementById('check').innerHTML = 'Start'

            //諦めるボタンをスタートボタンに変更
            document.getElementById('startGiveUp').innerHTML = 'ゲームスタート(X)';

            can_check_flg = -1;


        } else if (flg == 0) {                                      //予想失敗/ヒント作成
            //ヒント作成
            hintMake();

            //ヒント表示
            hintOutput();

            //回答欄ピックアップの取り消し
            document.getElementById('questGroup' + (predict_cnt + 1)).classList.remove('Select');

            if (quest_M != 5) {
                //解答ピックアップの取り消し
                document.getElementById('quest' + (predict_cnt + 1) + '-' + quest_M).classList.remove('Select');//ピックアップ削除
            } else {
                document.getElementById('check').classList.remove('Select');//ピックアップ削除
            }

            //列の変更
            predict_cnt++;

            for (let i = 0; i < 4; i++) {                           //予想解答を初期化
                predict_ans_ary[i] = -1;
            }

            //次ボタンアクティブ化/現ボタン非アクティブ化
            for (let i = 1; i < 5; i++) {
                document.getElementById('quest' + predict_cnt + '-' + i).disabled = true;
                document.getElementById('quest' + (predict_cnt + 1) + '-' + i).disabled = false;
            }

            //回答欄ピックアップ
            document.getElementById('questGroup' + (predict_cnt + 1)).classList.add('Select');

            //初期位置解答ピックアップ
            document.getElementById('quest' + (predict_cnt + 1) + '-1').classList.add('Select');
            quest_N = predict_cnt + 1;
            quest_M = 1;

            can_check_flg = 0;

        } else if (flg == 1) {                                      //予想成功/終了動作

            //ローカルストレージに記録入れる
            time_score = new Date() - game_start_time;
            count_score = predict_cnt + 1;
            localStorage.setItem('dscore:' + (N_1 + N_2), level_dif);
            localStorage.setItem('cscore:' + (N_1 + N_2), count_score);
            localStorage.setItem('tscore:' + (N_1 + N_2), time_score);
            // key設定level_dif, time_score, count_score <- '(d(rlevel),c(count),t(time))score:' + (N_1 + N_2);
            //スコア画面更新
            let elem = document.createElement("p");
            if (level_dif == 1) {
                if (N_1 == 1) {
                    document.getElementById('score1').removeChild(document.getElementById('score1').querySelector("p"));
                }else{
                    elem.classList.add('ScoreBar');
                }
                elem.setAttribute('id', 'score' + level_dif + '-' + N_1);
                elem.innerHTML = N_1 + "回目<br>" + ToTime(time_score) + "<br>" + count_score + "<br>" + ToTime(time_score / count_score);
                document.getElementById('score1').appendChild(elem);
                N_1++;
            } else {
                if (N_2 == 1) {
                    document.getElementById('score2').removeChild(document.getElementById('score2').querySelector("p"));
                }else{
                    elem.classList.add('ScoreBar');
                }
                elem.setAttribute('id', 'score' + level_dif + '-' + N_2);
                elem.innerHTML = N_2 + "回目<br>" + ToTime(time_score) + "<br>" + count_score + "<br>" + ToTime(time_score / count_score);
                document.getElementById('score2').appendChild(elem);
                N_2++;
            }

            //ランキング
            rank_num = 0;
            if (level_dif == 1) {
                //easy
                for (let i = 0; i < 3; i++) {
                    if (ary_easy[i][0] == null || ary_easy[i][0] > count_score || (ary_easy[i][0] == count_score && ary_easy[i][1] > time_score)) {
                        for (let j = 2; j > i; j--) {
                            ary_easy[j][0] = ary_easy[j - 1][0];
                            ary_easy[j][1] = ary_easy[j - 1][1];
                        }
                        ary_easy[i][0] = count_score;
                        ary_easy[i][1] = time_score;
                        rank_num = i + 1;
                        break;
                    }
                }
            } else {
                //hard
                for (let i = 0; i < 3; i++) {
                    if (ary_hard[i][0] == null || ary_hard[i][0] > count_score || (ary_hard[i][0] == count_score && ary_hard[i][1] > time_score)) {
                        for (let j = 2; j > i; j--) {
                            ary_hard[j][0] = ary_hard[j - 1][0];
                            ary_hard[j][1] = ary_hard[j - 1][1];
                        }
                        ary_hard[i][0] = count_score;
                        ary_hard[i][1] = time_score;
                        rank_num = i + 1;
                        break;
                    }
                }
            }

            updateRanking();

            //完答ヒント表示
            //ヒント作成
            hintMake();

            //ヒント表示
            hintOutput();

            //正解表示
            ansOutput();

            document.getElementById('ansLid').classList.add('OpenLid'); //ゲートオープン

            //回答欄ピックアップの取り消し
            document.getElementById('questGroup' + (predict_cnt + 1)).classList.remove('Select');

            if (quest_M != 5) {
                //解答ピックアップの取り消し
                document.getElementById('quest' + (predict_cnt + 1) + '-' + quest_M).classList.remove('Select');//ピックアップ削除
            } else {
                document.getElementById('check').classList.remove('Select');//ピックアップ削除
            }

            //色ピックアップの取り消し
            document.getElementById('colorSample' + pick_color).classList.remove('Select');
            pick_color = -1;

            for (let i = 0; i < 4; i++) {                           //予想解答を初期化
                predict_ans_ary[i] = -1;
            }

            //現ボタン非アクティブ化
            for (let i = 1; i < 5; i++) {                           //選択肢ボタン非アクティブ化
                document.getElementById('quest' + quest_N + '-' + i).disabled = true;
            }
            for (let i = 1; i < 7; i++) {                           //色ボタン非アクティブ化
                document.getElementById('colorSample' + i).disabled = true;
            }

            //Checkボタンをスタートボタンに変更
            document.getElementById('check').innerHTML = 'Start'

            //諦めるボタンをスタートボタンに変更
            document.getElementById('startGiveUp').innerHTML = 'ゲームスタート(X)';

            can_check_flg = -1;

        }
    }
}


//トップメニューを表示するときのピックアップと初期設定
function FirstSettingAndPickUpForTopMenu() {
    topMenu_num = 1;
    document.getElementById('score').classList.add('Select');
}

//トップメニューから離れるときのピックアップ削除と終了設定
function EndSettingAndPickUpForTopMenu() {
    if (topMenu_num == 1) {
        document.getElementById('score').classList.remove('Select');
    } else if (topMenu_num == 2) {
        document.getElementById('option').classList.remove('Select');
    } else if (topMenu_num == 3) {
        document.getElementById('help').classList.remove('Select');
    } else if (topMenu_num == 4) {
        document.getElementById('level').classList.remove('Select');
    } else if (topMenu_num == 5) {
        document.getElementById('startGiveUp').classList.remove('Select');
    } else if (topMenu_num == 6) {
        document.getElementById('close').classList.remove('Select');
    }
    topMenu_num = 0;
}

//トップメニューを上移動する動作
function UpMoveForTopMenu() {
    if (topMenu_num == 1) {
        document.getElementById('score').classList.remove('Select');
    } else if (topMenu_num == 2) {
        document.getElementById('option').classList.remove('Select');
    } else if (topMenu_num == 3) {
        document.getElementById('help').classList.remove('Select');
    } else if (topMenu_num == 4) {
        document.getElementById('level').classList.remove('Select');
    } else if (topMenu_num == 5) {
        document.getElementById('startGiveUp').classList.remove('Select');
    } else if (topMenu_num == 6) {
        document.getElementById('close').classList.remove('Select');
    }
    topMenu_num -= 1;
    if (topMenu_num == 0) {
        topMenu_num = 6;
    }
    if (topMenu_num == 1) {
        document.getElementById('score').classList.add('Select');
    } else if (topMenu_num == 2) {
        document.getElementById('option').classList.add('Select');
    } else if (topMenu_num == 3) {
        document.getElementById('help').classList.add('Select');
    } else if (topMenu_num == 4) {
        document.getElementById('level').classList.add('Select');
    } else if (topMenu_num == 5) {
        document.getElementById('startGiveUp').classList.add('Select');
    } else if (topMenu_num == 6) {
        document.getElementById('close').classList.add('Select');
    }
}

//トップメニューを下移動する動作
function DownMoveForTopMenu() {
    if (topMenu_num == 1) {
        document.getElementById('score').classList.remove('Select');
    } else if (topMenu_num == 2) {
        document.getElementById('option').classList.remove('Select');
    } else if (topMenu_num == 3) {
        document.getElementById('help').classList.remove('Select');
    } else if (topMenu_num == 4) {
        document.getElementById('level').classList.remove('Select');
    } else if (topMenu_num == 5) {
        document.getElementById('startGiveUp').classList.remove('Select');
    } else if (topMenu_num == 6) {
        document.getElementById('close').classList.remove('Select');
    }
    topMenu_num += 1;
    if (topMenu_num == 7) {
        topMenu_num = 1;
    }
    if (topMenu_num == 1) {
        document.getElementById('score').classList.add('Select');
    } else if (topMenu_num == 2) {
        document.getElementById('option').classList.add('Select');
    } else if (topMenu_num == 3) {
        document.getElementById('help').classList.add('Select');
    } else if (topMenu_num == 4) {
        document.getElementById('level').classList.add('Select');
    } else if (topMenu_num == 5) {
        document.getElementById('startGiveUp').classList.add('Select');
    } else if (topMenu_num == 6) {
        document.getElementById('close').classList.add('Select');
    }
}

//答え合わせ時のヒント(解答欄の移動/予想解答削除も)/正解/失敗(8回以上のミス)挙動　(書いてないときの挙動は未実装)
function CheckFunc() {//クリック
    if (can_check_flg == 1) {     //全色決定するまでCheckできない仕組み
        checkAnsMakeHint();
    } else if (can_check_flg == -1) {   //ゲームスタート
        makeAns();
        init();
        document.getElementById('check').innerHTML = 'Check';
        document.getElementById('startGiveUp').innerHTML = '諦める(X)';
    }
}

//トップメニュー
function FirstSettingAndPickUpForTopMenu() {
    topMenu_num = 1;
    document.getElementById('score').classList.add('Select');
}

//ピン取り外し動作
function PullOutPin() {
    if (predict_ans_ary[quest_M - 1] != -1) {
        if (predict_ans_ary[quest_M - 1] == 1) {
            let pullOutFlg = 0;
            let temp_N = quest_N;
            let temp_M = quest_M;
            let pullOutInterval = setInterval(function () {
                if (pullOutFlg == 0) {
                    document.getElementById('pullOut' + temp_N + '-' + temp_M).classList.add('Blue');
                }
                if (pullOutFlg == 1) {
                    document.getElementById('pullOut' + temp_N + '-' + temp_M).classList.remove(...document.getElementById('pullOut' + temp_N + '-' + temp_M).classList);
                    clearInterval(pullOutInterval); // 全ての画像変更が終了したらインターバルをクリア
                }
                pullOutFlg = 1;
            }, 200);
        } else if (predict_ans_ary[quest_M - 1] == 2) {
            let pullOutFlg = 0;
            let temp_N = quest_N;
            let temp_M = quest_M;
            let pullOutInterval = setInterval(function () {
                if (pullOutFlg == 0) {
                    document.getElementById('pullOut' + temp_N + '-' + temp_M).classList.add('Red');
                }
                if (pullOutFlg == 1) {
                    document.getElementById('pullOut' + temp_N + '-' + temp_M).classList.remove(...document.getElementById('pullOut' + temp_N + '-' + temp_M).classList);
                    clearInterval(pullOutInterval); // 全ての画像変更が終了したらインターバルをクリア
                }
                pullOutFlg = 1;
            }, 200);
        } else if (predict_ans_ary[quest_M - 1] == 3) {
            let pullOutFlg = 0;
            let temp_N = quest_N;
            let temp_M = quest_M;
            let pullOutInterval = setInterval(function () {
                if (pullOutFlg == 0) {
                    document.getElementById('pullOut' + temp_N + '-' + temp_M).classList.add('Green');
                }
                if (pullOutFlg == 1) {
                    document.getElementById('pullOut' + temp_N + '-' + temp_M).classList.remove(...document.getElementById('pullOut' + temp_N + '-' + temp_M).classList);
                    clearInterval(pullOutInterval); // 全ての画像変更が終了したらインターバルをクリア
                }
                pullOutFlg = 1;
            }, 200);
        } else if (predict_ans_ary[quest_M - 1] == 4) {
            let pullOutFlg = 0;
            let temp_N = quest_N;
            let temp_M = quest_M;
            let pullOutInterval = setInterval(function () {
                if (pullOutFlg == 0) {
                    document.getElementById('pullOut' + temp_N + '-' + temp_M).classList.add('Yellow');
                }
                if (pullOutFlg == 1) {
                    document.getElementById('pullOut' + temp_N + '-' + temp_M).classList.remove(...document.getElementById('pullOut' + temp_N + '-' + temp_M).classList);
                    clearInterval(pullOutInterval); // 全ての画像変更が終了したらインターバルをクリア
                }
                pullOutFlg = 1;
            }, 200);
        } else if (predict_ans_ary[quest_M - 1] == 5) {
            let pullOutFlg = 0;
            let temp_N = quest_N;
            let temp_M = quest_M;
            let pullOutInterval = setInterval(function () {
                if (pullOutFlg == 0) {
                    document.getElementById('pullOut' + temp_N + '-' + temp_M).classList.add('Magenta');
                }
                if (pullOutFlg == 1) {
                    document.getElementById('pullOut' + temp_N + '-' + temp_M).classList.remove(...document.getElementById('pullOut' + temp_N + '-' + temp_M).classList);
                    clearInterval(pullOutInterval); // 全ての画像変更が終了したらインターバルをクリア
                }
                pullOutFlg = 1;
            }, 200);
        } else if (predict_ans_ary[quest_M - 1] == 6) {
            let pullOutFlg = 0;
            let temp_N = quest_N;
            let temp_M = quest_M;
            let pullOutInterval = setInterval(function () {
                if (pullOutFlg == 0) {
                    document.getElementById('pullOut' + temp_N + '-' + temp_M).classList.add('White');
                }
                if (pullOutFlg == 1) {
                    document.getElementById('pullOut' + temp_N + '-' + temp_M).classList.remove(...document.getElementById('pullOut' + temp_N + '-' + temp_M).classList);
                    clearInterval(pullOutInterval); // 全ての画像変更が終了したらインターバルをクリア
                }
                pullOutFlg = 1;
            }, 200);
        }
        sleep(200);
    }
}

document.addEventListener("click", function () {
    document.getElementById('overBoardDisplay').classList.add('Dummy');//スコア表示を消去
    document.getElementById('overBoardDisplay').classList.remove(...document.getElementById('overBoardDisplay').classList);
    // ここにイベントの処理を追加することができます
});


//選択肢のボタンクリック時のイベント
function QuestClick(value1, value2) {
    if (value1 == (predict_cnt + 1)) {

        if (quest_M != 5) {
            //回答ピックアップの取り消し
            document.getElementById('quest' + quest_N + '-' + quest_M).classList.remove('Select');
        } else {
            document.getElementById('check').classList.remove('Select');
        }

        quest_N = value1;
        quest_M = value2;

        //ピックアップする
        document.getElementById('quest' + value1 + '-' + value2).classList.add('Select');
        document.getElementById("selectSE").play();
    }
}

let color_ary = [' ', 'Blue', 'Red', 'Green', 'Yellow', 'Magenta', 'White'];

//サンプルカラー抜く時の消去処理
function SampleDelete(value) {
    document.getElementById('colorSample' + value).classList.add('Dummy');
    document.getElementById('colorSample' + value).classList.remove(...document.getElementById('colorSample' + value).classList);
    document.getElementById('colorSample' + value).classList.add('Select');
}

//サンプルカラーピン付ける時の処理
function SampleAdd(value) {
    let color_flg = 0;
    let intervalColor = setInterval(function () {
        if (color_flg == 0) {
            color_flg = 1;
        }
        if (color_flg == 1) {
            document.getElementById('colorSample' + value).classList.add(color_ary[value]);
            clearInterval(intervalColor); // 全ての画像変更が終了したらインターバルをクリア
        }
    }, 400);

    // 600ミリ秒後にplaySEAfterDelay関数を実行する
    setTimeout(() => {
        newAudio = new Audio('audio/Color_Pin_SE.mp3');
        newAudio.volume = MAIN_vol * SE_vol * MAIN_Mute * SE_Mute;
        newAudio.play();
    }, 800);
}

// ()ミリ秒後に再生する関数
function playSEAfterDelay() {
    document.getElementById("colorPinSE").play();
}


//色クリック時のイベント
function ColorClick(value) {
    if (quest_M != 5) {
        let elem = document.getElementById('quest' + quest_N + '-' + quest_M);
        if (value == 1) {
            PullOutPin();

            elem.classList.add('Dummy');
            elem.classList.remove(...elem.classList);
            let intervalSwap = setInterval(function () {
                elem.classList.add('Blue');
                clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
            }, 10);

            predict_ans_ary[quest_M - 1] = 1;

            document.getElementById('colorSample' + pick_color).classList.remove('Select');     //元の位置の色ピックアップ削除
            pick_color = 1;

            SampleDelete(pick_color);
            SampleAdd(pick_color);

        } else if (value == 2) {
            PullOutPin();

            elem.classList.add('Dummy');
            elem.classList.remove(...elem.classList);
            let intervalSwap = setInterval(function () {
                elem.classList.add('Red');
                clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
            }, 10);

            predict_ans_ary[quest_M - 1] = 2;

            document.getElementById('colorSample' + pick_color).classList.remove('Select');     //元の位置の色ピックアップ削除
            pick_color = 2;

            SampleDelete(pick_color);
            SampleAdd(pick_color);

        } else if (value == 3) {
            PullOutPin();

            elem.classList.add('Dummy');
            elem.classList.remove(...elem.classList);
            let intervalSwap = setInterval(function () {
                elem.classList.add('Green');
                clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
            }, 10);

            predict_ans_ary[quest_M - 1] = 3;

            document.getElementById('colorSample' + pick_color).classList.remove('Select');     //元の位置の色ピックアップ削除
            pick_color = 3;

            SampleDelete(pick_color);
            SampleAdd(pick_color);

        } else if (value == 4) {
            PullOutPin();

            elem.classList.add('Dummy');
            elem.classList.remove(...elem.classList);
            let intervalSwap = setInterval(function () {
                elem.classList.add('Yellow');
                clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
            }, 10);


            predict_ans_ary[quest_M - 1] = 4;

            document.getElementById('colorSample' + pick_color).classList.remove('Select');     //元の位置の色ピックアップ削除
            pick_color = 4;


            SampleDelete(pick_color);
            SampleAdd(pick_color);

        } else if (value == 5) {
            PullOutPin();

            elem.classList.add('Dummy');
            elem.classList.remove(...elem.classList);
            let intervalSwap = setInterval(function () {
                elem.classList.add('Magenta');
                clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
            }, 10);

            predict_ans_ary[quest_M - 1] = 5;

            document.getElementById('colorSample' + pick_color).classList.remove('Select');     //元の位置の色ピックアップ削除
            pick_color = 5;

            SampleDelete(pick_color);
            SampleAdd(pick_color);

        } else if (value == 6) {
            PullOutPin();

            elem.classList.add('Dummy');
            elem.classList.remove(...elem.classList);
            let intervalSwap = setInterval(function () {
                elem.classList.add('White');
                clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
            }, 10);

            predict_ans_ary[quest_M - 1] = 6;

            document.getElementById('colorSample' + pick_color).classList.remove('Select');     //元の位置の色ピックアップ削除
            pick_color = 6;

            SampleDelete(pick_color);
            SampleAdd(pick_color);
        }
        // 400ミリ秒後にplaySEAfterDelay関数を実行する
        setTimeout(playSEAfterDelay, 400);
        moveNext();
    }
}

//クリックイベント（メニュー部分）
//ゲーム画面のメニューボタン
function MenuClick() {
    if (change_flg == 0) {
        if (posit_act_menu == 0) {
            document.getElementById('topMenu').classList.add('ActiveMenu');             //メニューアクティブ化
            posit_act_menu = 1;
            FirstSettingAndPickUpForTopMenu();
        } else if (posit_act_menu == 1) {
            document.getElementById('topMenu').classList.remove('ActiveMenu');          //メニュー非アクティブ化
            posit_act_menu = 0;
            EndSettingAndPickUpForTopMenu();
        } else if (posit_act_menu == 2) {
            document.getElementById('scoreMenu' + score_cursor).classList.remove('ActiveMenu');          //メニュー非アクティブ化
            posit_act_menu = 1;
            document.getElementById('topMenu').classList.add('ActiveMenu');             //メニューアクティブ化
            FirstSettingAndPickUpForTopMenu();
        } else if (posit_act_menu == 3) {
            document.getElementById('optionMenu').classList.remove('ActiveMenu');          //メニュー非アクティブ化
            posit_act_menu = 1;
            document.getElementById('topMenu').classList.add('ActiveMenu');             //メニューアクティブ化
            FirstSettingAndPickUpForTopMenu();
        } else if (posit_act_menu >= 4 && posit_act_menu <= 8) {
            document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.remove('ActiveMenu');          //メニュー非アクティブ化
            posit_act_menu = 1;
            document.getElementById('topMenu').classList.add('ActiveMenu');             //メニューアクティブ化
            FirstSettingAndPickUpForTopMenu();
        }
    }
}

//トップメニューのスコアボタン
function ScoreMenuClick() {
    score_cursor = 1;
    document.getElementById('topMenu').classList.remove('ActiveMenu');    //メニュー非アクティブ化
    document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
    posit_act_menu = 2;
    EndSettingAndPickUpForTopMenu();
}

// スコアメニューのボタン1
function ScoreMenuClick1() {
    document.getElementById('scoreMenu' + score_cursor).classList.remove('ActiveMenu');         //メニュー非アクティブ化
    score_cursor = 1;
    document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
    document.getElementById("selectSE").play();
}

// スコアメニューのボタン2
function ScoreMenuClick2() {
    document.getElementById('scoreMenu' + score_cursor).classList.remove('ActiveMenu');         //メニュー非アクティブ化
    score_cursor = 2;
    document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
    document.getElementById("selectSE").play();
}

// スコアメニューのボタン←
function ScoreMenuClickLeft() {
    document.getElementById('scoreMenu' + score_cursor).classList.remove('ActiveMenu');         //メニュー非アクティブ化
    if (score_cursor == 1) {
        score_cursor = 2;
        document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
    } else {
        score_cursor = 1;
        document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
    }
    document.getElementById("selectSE").play();
}

// スコアメニューのボタン→
function ScoreMenuClickRight() {
    document.getElementById('scoreMenu' + score_cursor).classList.remove('ActiveMenu');         //メニュー非アクティブ化
    if (score_cursor == 1) {
        score_cursor = 2;
        document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
    } else {
        score_cursor = 1;
        document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
    }
    document.getElementById("selectSE").play();
}

//トップメニューの設定ボタン
function OptionMenuClick() {
    document.getElementById('topMenu').classList.remove('ActiveMenu');    //メニュー非アクティブ化
    document.getElementById('optionMenu').classList.add('ActiveMenu');         //メニューアクティブ化
    posit_act_menu = 3;
    EndSettingAndPickUpForTopMenu();
}

//トップメニューのヘルプボタン
function HelpMenuClick() {
    document.getElementById('topMenu').classList.remove('ActiveMenu');    //メニュー非アクティブ化
    document.getElementById('helpMenu1').classList.add('ActiveMenu');         //メニューアクティブ化
    posit_act_menu = 4;
    EndSettingAndPickUpForTopMenu();
}

//ヘルプメニューのボタン1
function HelpMenuClick1() {
    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.remove('ActiveMenu');          //メニュー非アクティブ化
    posit_act_menu = 4;
    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.add('ActiveMenu');             //メニューアクティブ化
    document.getElementById("selectSE").play();
}

//ヘルプメニューのボタン2
function HelpMenuClick2() {
    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.remove('ActiveMenu');          //メニュー非アクティブ化
    posit_act_menu = 5;
    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.add('ActiveMenu');             //メニューアクティブ化
    document.getElementById("selectSE").play();
}

//ヘルプメニューのボタン3
function HelpMenuClick3() {
    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.remove('ActiveMenu');          //メニュー非アクティブ化
    posit_act_menu = 6;
    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.add('ActiveMenu');             //メニューアクティブ化
    document.getElementById("selectSE").play();
}

//ヘルプメニューのボタン4
function HelpMenuClick4() {
    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.remove('ActiveMenu');          //メニュー非アクティブ化
    posit_act_menu = 7;
    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.add('ActiveMenu');             //メニューアクティブ化
    document.getElementById("selectSE").play();
}

//ヘルプメニューのボタン5
function HelpMenuClick5() {
    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.remove('ActiveMenu');          //メニュー非アクティブ化
    posit_act_menu = 8;
    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.add('ActiveMenu');             //メニューアクティブ化
    document.getElementById("selectSE").play();
}

//ヘルプメニューのボタン←
function HelpMenuClickLeft() {
    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.remove('ActiveMenu');          //メニュー非アクティブ化
    posit_act_menu -= 1;
    if (posit_act_menu == 3) {
        posit_act_menu = 8;
    }
    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.add('ActiveMenu');             //メニューアクティブ化
    document.getElementById("selectSE").play();
}

//ヘルプメニューのボタン→
function HelpMenuClickRight() {
    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.remove('ActiveMenu');          //メニュー非アクティブ化
    posit_act_menu += 1;
    if (posit_act_menu == 9) {
        posit_act_menu = 4;
    }
    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.add('ActiveMenu');             //メニューアクティブ化
    document.getElementById("selectSE").play();
}

//トップメニューの難易度ボタン
function LevelClick() {
    //難易度変更
    if (document.getElementById('level').innerHTML == '難易度：被りなし(C)') {
        document.getElementById('level').innerHTML = '難易度：被りあり(C)';
    } else {
        document.getElementById('level').innerHTML = '難易度：被りなし(C)';
    }
}

// トップメニューのスタート/諦めるボタン
function StartGiveUpClick() {
    //スタート/諦めるボタンのクリック時動作
    EndSettingAndPickUpForTopMenu();
    if (document.getElementById('startGiveUp').innerHTML == 'ゲームスタート(X)') {       //スタート動作
        makeAns();
        init();
        document.getElementById('check').innerHTML = 'Check';
        document.getElementById('startGiveUp').innerHTML = '諦める(X)';
        document.getElementById('topMenu').classList.remove('ActiveMenu');    //メニュー非アクティブ化
        posit_act_menu = 0;
    } else {                                                                    //諦める動作
        giveUpCheck();
    }
}

//キーボード入力の動作（WASD/Enter/Esc(メニュー表示)）
document.addEventListener('keypress', keypress_event);

function keypress_event(e) {

    if (change_flg == 0) {
        //メニュー操作
        if (e.key === Q_key.toLowerCase() || e.key === Q_key) {
            //Qキーが押された時の処理
            if (posit_act_menu == 0) {
                document.getElementById('topMenu').classList.add('ActiveMenu');             //メニューアクティブ化
                posit_act_menu = 1;
                FirstSettingAndPickUpForTopMenu();
            } else if (posit_act_menu == 1) {
                document.getElementById('topMenu').classList.remove('ActiveMenu');          //メニュー非アクティブ化
                posit_act_menu = 0;
                EndSettingAndPickUpForTopMenu();
            } else {
                if (posit_act_menu == 2) {
                    document.getElementById('scoreMenu' + score_cursor).classList.remove('ActiveMenu');    //メニュー非アクティブ化
                    document.getElementById('topMenu').classList.add('ActiveMenu');         //メニューアクティブ化
                    posit_act_menu = 1;
                    FirstSettingAndPickUpForTopMenu();
                } else if (posit_act_menu == 3) {
                    document.getElementById('optionMenu').classList.remove('ActiveMenu');   //メニュー非アクティブ化
                    document.getElementById('topMenu').classList.add('ActiveMenu');         //メニューアクティブ化
                    posit_act_menu = 1;
                    FirstSettingAndPickUpForTopMenu();
                } else if (posit_act_menu >= 4 && posit_act_menu <= 8) {
                    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.remove('ActiveMenu');     //メニュー非アクティブ化
                    document.getElementById('topMenu').classList.add('ActiveMenu');         //メニューアクティブ化
                    posit_act_menu = 1;
                    FirstSettingAndPickUpForTopMenu();
                }
            }
        } else if ((e.key === W_key.toLowerCase() || e.key === W_key) && posit_act_menu == 1) {// WSでメニュー縦移動（ピックアップはセレクト）
            UpMoveForTopMenu();
            document.getElementById("selectSE").play();
        } else if ((e.key === S_key.toLowerCase() || e.key === S_key) && posit_act_menu == 1) {
            DownMoveForTopMenu();
            document.getElementById("selectSE").play();
        } else if ((e.key === 'r' || e.key === 'R') && posit_act_menu == 1) {
            //Rキーが押された時の処理
            document.getElementById('topMenu').classList.remove('ActiveMenu');    //メニュー非アクティブ化
            score_cursor = 1;
            document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
            posit_act_menu = 2;
            EndSettingAndPickUpForTopMenu();
        } else if ((e.key === 'f' || e.key === 'F') && posit_act_menu == 1) {
            //Fキーが押された時の処理
            document.getElementById('topMenu').classList.remove('ActiveMenu');    //メニュー非アクティブ化
            document.getElementById('optionMenu').classList.add('ActiveMenu');         //メニューアクティブ化
            posit_act_menu = 3;
            EndSettingAndPickUpForTopMenu();
        } else if ((e.key === 'v' || e.key === 'V') && posit_act_menu == 1) {
            //Vキーが押された時の処理
            document.getElementById('topMenu').classList.remove('ActiveMenu');    //メニュー非アクティブ化
            document.getElementById('helpMenu1').classList.add('ActiveMenu');         //メニューアクティブ化
            posit_act_menu = 4;
            EndSettingAndPickUpForTopMenu();
        } else if ((e.key === D_key.toLowerCase() || e.key === D_key) && (posit_act_menu >= 4 && posit_act_menu <= 8)) {
            //Dキーが押された時の処理
            document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.remove('ActiveMenu');    //メニュー非アクティブ化
            posit_act_menu += 1;
            if (posit_act_menu == 9) {
                posit_act_menu = 4;
            }
            document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.add('ActiveMenu');         //メニューアクティブ化

            document.getElementById("selectSE").play();

        } else if ((e.key === D_key.toLowerCase() || e.key === D_key) && (posit_act_menu == 2)) {
            document.getElementById('scoreMenu' + score_cursor).classList.remove('ActiveMenu');         //メニュー非アクティブ化
            if (score_cursor == 1) {
                score_cursor = 2;
                document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
            } else {
                score_cursor = 1;
                document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
            }

            document.getElementById("selectSE").play();
        } else if ((e.key === A_key.toLowerCase() || e.key === A_key) && (posit_act_menu >= 4 && posit_act_menu <= 8)) {
            //Aキーが押された時の処理
            document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.remove('ActiveMenu');    //メニュー非アクティブ化
            posit_act_menu -= 1;
            if (posit_act_menu == 3) {
                posit_act_menu = 8;
            }
            document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.add('ActiveMenu');         //メニューアクティブ化
            document.getElementById("selectSE").play();
        } else if ((e.key === A_key.toLowerCase() || e.key === A_key) && (posit_act_menu == 2)) {
            document.getElementById('scoreMenu' + score_cursor).classList.remove('ActiveMenu');         //メニュー非アクティブ化
            if (score_cursor == 1) {
                score_cursor = 2;
                document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
            } else {
                score_cursor = 1;
                document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
            }
            document.getElementById("selectSE").play();
        } else if ((e.key === 'c' || e.key === 'C') && posit_act_menu == 1) {
            //Cキーが押された時の処理
            //難易度変更
            if (document.getElementById('level').innerHTML == '難易度：被りなし(C)') {
                document.getElementById('level').innerHTML = '難易度：被りあり(C)';
            } else {
                document.getElementById('level').innerHTML = '難易度：被りなし(C)';
            }
        } else if ((e.key === 'x' || e.key === 'X') && posit_act_menu == 1) {
            //Xキーが押された時の処理
            //スタート/諦める動作
            EndSettingAndPickUpForTopMenu();
            if (document.getElementById('startGiveUp').innerHTML == 'ゲームスタート(X)') {       //スタート動作
                makeAns();
                init();
                document.getElementById('check').innerHTML = 'Check';
                document.getElementById('startGiveUp').innerHTML = '諦める(X)';
                document.getElementById('topMenu').classList.remove('ActiveMenu');    //メニュー非アクティブ化
                posit_act_menu = 0;
            } else {                                                                    //諦める動作
                giveUpCheck();
            }
        }



        if (can_check_flg != -1 && posit_act_menu == 0) {    //Esc以外（ゲーム内限定キーボード）
            if (e.key === W_key.toLowerCase() || e.key === W_key) {
                //Wキーが押された時の処理
                if (quest_M == 5) {
                    document.getElementById('check').classList.remove('Select');
                } else {
                    document.getElementById('quest' + quest_N + '-' + quest_M).classList.remove('Select');
                }
                quest_M -= 1;
                if (quest_M == 0) {       //全色挿入したらquest idとCheckボタンにキーボード上で互換性をつける
                    if (can_check_flg == 1) {
                        quest_M = 5;
                    } else {
                        quest_M = 4;
                    }
                }
                if (quest_M == 5) {
                    document.getElementById('check').classList.add('Select');
                } else {
                    document.getElementById('quest' + quest_N + '-' + quest_M).classList.add('Select');
                }
                document.getElementById("selectSE").play();

            } else if (e.key === A_key.toLowerCase() || e.key === A_key) {
                //Aキーが押された時の処理
                document.getElementById('colorSample' + pick_color).classList.remove('Select');     //元の位置の色ピックアップ削除
                pick_color -= 1;
                if (pick_color == 0) {
                    pick_color = 6;
                }
                document.getElementById('colorSample' + pick_color).classList.add('Select');     //元の位置の色ピックアップ削除

                document.getElementById("selectSE").play();

            } else if (e.key === S_key.toLowerCase() || e.key === S_key) {
                //Sキーが押された時の処理
                if (quest_M == 5) {
                    document.getElementById('check').classList.remove('Select');
                } else {
                    document.getElementById('quest' + quest_N + '-' + quest_M).classList.remove('Select');
                }
                quest_M += 1;
                if (can_check_flg == 1 && quest_M == 6) {     //全色挿入したらquest idとCheckボタンにキーボード上で互換性をつける
                    quest_M = 1;
                } else if (can_check_flg == 0 && quest_M == 5) {
                    quest_M = 1;
                }
                if (quest_M == 5) {
                    document.getElementById('check').classList.add('Select');
                } else {
                    document.getElementById('quest' + quest_N + '-' + quest_M).classList.add('Select');
                }
                document.getElementById("selectSE").play();

            } else if (e.key === D_key.toLowerCase() || e.key === D_key) {
                //Dキーが押された時の処理
                document.getElementById('colorSample' + pick_color).classList.remove('Select');     //元の位置の色ピックアップ削除
                pick_color += 1;
                if (pick_color == 7) {
                    pick_color = 1;
                }
                document.getElementById('colorSample' + pick_color).classList.add('Select');     //元の位置の色ピックアップ削除

                document.getElementById("selectSE").play();

            } else if (/*e.key === 'Enter' || e.code === 'Space'*/ e.key === E_key.toLowerCase() || e.key === E_key) {
                //(Enter,Space)Eキーが押された時の処理
                if (quest_M != 5) {
                    //if (pick_color != predict_ans_ary[quest_M - 1]) {
                    let elem = document.getElementById('quest' + quest_N + '-' + quest_M);
                    if (pick_color == 1) {
                        PullOutPin();

                        elem.classList.add('Dummy');
                        elem.classList.remove(...elem.classList);
                        let intervalSwap = setInterval(function () {
                            elem.classList.add('Blue');
                            clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
                        }, 10);

                        predict_ans_ary[quest_M - 1] = 1;

                        SampleDelete(pick_color);
                        SampleAdd(pick_color);

                    } else if (pick_color == 2) {
                        PullOutPin();

                        elem.classList.add('Dummy');
                        elem.classList.remove(...elem.classList);
                        let intervalSwap = setInterval(function () {
                            elem.classList.add('Red');
                            clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
                        }, 10);


                        predict_ans_ary[quest_M - 1] = 2;

                        SampleDelete(pick_color);
                        SampleAdd(pick_color);

                    } else if (pick_color == 3) {
                        PullOutPin();

                        elem.classList.add('Dummy');
                        elem.classList.remove(...elem.classList);
                        let intervalSwap = setInterval(function () {
                            elem.classList.add('Green');
                            clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
                        }, 10);


                        predict_ans_ary[quest_M - 1] = 3;

                        SampleDelete(pick_color);
                        SampleAdd(pick_color);

                    } else if (pick_color == 4) {
                        PullOutPin();

                        elem.classList.add('Dummy');
                        elem.classList.remove(...elem.classList);
                        let intervalSwap = setInterval(function () {
                            elem.classList.add('Yellow');
                            clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
                        }, 10);


                        predict_ans_ary[quest_M - 1] = 4;

                        SampleDelete(pick_color);
                        SampleAdd(pick_color);

                    } else if (pick_color == 5) {
                        PullOutPin();

                        elem.classList.add('Dummy');
                        elem.classList.remove(...elem.classList);
                        let intervalSwap = setInterval(function () {
                            elem.classList.add('Magenta');
                            clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
                        }, 10);


                        predict_ans_ary[quest_M - 1] = 5;

                        SampleDelete(pick_color);
                        SampleAdd(pick_color);

                    } else if (pick_color == 6) {
                        PullOutPin();

                        elem.classList.add('Dummy');
                        elem.classList.remove(...elem.classList);
                        let intervalSwap = setInterval(function () {
                            elem.classList.add('White');
                            clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
                        }, 10);


                        predict_ans_ary[quest_M - 1] = 6;

                        SampleDelete(pick_color);
                        SampleAdd(pick_color);
                    }
                    //}
                    // 400ミリ秒後にplaySEAfterDelay関数を実行する
                    setTimeout(playSEAfterDelay, 400);
                    moveNext();
                } else {
                    checkAnsMakeHint();
                }
            } else if (e.key <= '6' && e.key >= '1') {      //数字キーで選択

                if (quest_M != 5 /*&& (e.key - '0') != predict_ans_ary[quest_M - 1]*/) {
                    //色の変更
                    //アニメーション
                    //解答配列の変更
                    let elem = document.getElementById('quest' + quest_N + '-' + quest_M);

                    if ((e.key - '0') == 1) {
                        PullOutPin();

                        elem.classList.add('Dummy');
                        elem.classList.remove(...elem.classList);

                        let intervalSwap = setInterval(function () {
                            elem.classList.add('Blue');
                            clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
                        }, 10);

                        predict_ans_ary[quest_M - 1] = 1;

                        SampleDelete((e.key - '0'));
                        SampleAdd((e.key - '0'));

                    } else if ((e.key - '0') == 2) {
                        PullOutPin();

                        elem.classList.add('Dummy');
                        elem.classList.remove(...elem.classList);

                        let intervalSwap = setInterval(function () {
                            elem.classList.add('Red');
                            clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
                        }, 10);


                        predict_ans_ary[quest_M - 1] = 2;
                        SampleDelete((e.key - '0'));
                        SampleAdd((e.key - '0'));

                    } else if ((e.key - '0') == 3) {
                        PullOutPin();

                        elem.classList.add('Dummy');
                        elem.classList.remove(...elem.classList);

                        let intervalSwap = setInterval(function () {
                            elem.classList.add('Green');
                            clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
                        }, 10);


                        predict_ans_ary[quest_M - 1] = 3;
                        SampleDelete((e.key - '0'));
                        SampleAdd((e.key - '0'));

                    } else if ((e.key - '0') == 4) {
                        PullOutPin();

                        elem.classList.add('Dummy');
                        elem.classList.remove(...elem.classList);

                        let intervalSwap = setInterval(function () {
                            elem.classList.add('Yellow');
                            clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
                        }, 10);


                        predict_ans_ary[quest_M - 1] = 4;
                        SampleDelete((e.key - '0'));
                        SampleAdd((e.key - '0'));

                    } else if ((e.key - '0') == 5) {
                        PullOutPin();

                        elem.classList.add('Dummy');
                        elem.classList.remove(...elem.classList);

                        let intervalSwap = setInterval(function () {
                            elem.classList.add('Magenta');
                            clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
                        }, 10);


                        predict_ans_ary[quest_M - 1] = 5;
                        SampleDelete((e.key - '0'));
                        SampleAdd((e.key - '0'));

                    } else if ((e.key - '0') == 6) {
                        PullOutPin();

                        elem.classList.add('Dummy');
                        elem.classList.remove(...elem.classList);

                        let intervalSwap = setInterval(function () {
                            elem.classList.add('White');
                            clearInterval(intervalSwap); // 全ての画像変更が終了したらインターバルをクリア
                        }, 10);


                        predict_ans_ary[quest_M - 1] = 6;
                        SampleDelete((e.key - '0'));
                        SampleAdd((e.key - '0'));
                    }
                    // 400ミリ秒後にplaySEAfterDelay関数を実行する
                    setTimeout(playSEAfterDelay, 400);
                }

                //行変更
                if (quest_M != 5) {
                    moveNext();
                }

                //色のピックアップ変更
                document.getElementById('colorSample' + pick_color).classList.remove('Select');     //元の位置の色ピックアップ削除
                pick_color = (e.key - '0');
                //SampleDelete()でピックアップ済み

            }
        } else if ((e.key === E_key.toLowerCase() || e.key === E_key) && posit_act_menu == 0) {   //ゲームスタート(ゲーム外＆アクティブメニュー無)
            //Eキーが押された時の処理
            makeAns();
            init();
            document.getElementById('check').innerHTML = 'Check';
            document.getElementById('startGiveUp').innerHTML = '諦める(X)';
        } else if ((e.key === E_key.toLowerCase() || e.key === E_key) && posit_act_menu == 1) {   //アクティブメニュー有＆メニューの決定ボタン
            if (topMenu_num == 1) {
                document.getElementById('topMenu').classList.remove('ActiveMenu');    //メニュー非アクティブ化
                score_cursor = 1;
                document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
                posit_act_menu = 2;
            } else if (topMenu_num == 2) {
                document.getElementById('topMenu').classList.remove('ActiveMenu');    //メニュー非アクティブ化
                document.getElementById('optionMenu').classList.add('ActiveMenu');         //メニューアクティブ化
                posit_act_menu = 3;
                EndSettingAndPickUpForTopMenu();
            } else if (topMenu_num == 3) {
                document.getElementById('topMenu').classList.remove('ActiveMenu');    //メニュー非アクティブ化
                document.getElementById('helpMenu1').classList.add('ActiveMenu');         //メニューアクティブ化
                posit_act_menu = 4;
                EndSettingAndPickUpForTopMenu();
            } else if (topMenu_num == 4) {
                //難易度変更
                if (document.getElementById('level').innerHTML == '難易度：被りなし(C)') {
                    document.getElementById('level').innerHTML = '難易度：被りあり(C)';
                } else {
                    document.getElementById('level').innerHTML = '難易度：被りなし(C)';
                }
            } else if (topMenu_num == 5) {
                //スタート/諦める動作
                EndSettingAndPickUpForTopMenu();
                if (document.getElementById('startGiveUp').innerHTML == 'ゲームスタート(X)') {       //スタート動作
                    makeAns();
                    init();
                    document.getElementById('check').innerHTML = 'Check';
                    document.getElementById('startGiveUp').innerHTML = '諦める(X)';
                    document.getElementById('topMenu').classList.remove('ActiveMenu');    //メニュー非アクティブ化
                    posit_act_menu = 0;
                } else {                                                                    //諦める動作
                    giveUpCheck();
                }
            } else if (topMenu_num == 6) {
                document.getElementById('topMenu').classList.remove('ActiveMenu');          //メニュー非アクティブ化
                posit_act_menu = 0;
                EndSettingAndPickUpForTopMenu();
            }
        }
    } else {
        if (('a' <= e.key && e.key <= 'z') || ('A' <= e.key && e.key <= 'Z')) {
            if (e.key != 'r' && e.key != 'f' && e.key != 'v' && e.key != 'c' && e.key != 'x' && e.key != 'R' && e.key != 'F' && e.key != 'V' && e.key != 'C' && e.key != 'X') {
                if (change_flg == 1) {
                    if (
                        W_key !== e.key &&
                        W_key.toLowerCase() !== e.key &&
                        A_key !== e.key &&
                        A_key.toLowerCase() !== e.key &&
                        S_key !== e.key &&
                        S_key.toLowerCase() !== e.key &&
                        D_key !== e.key &&
                        D_key.toLowerCase() !== e.key &&
                        E_key !== e.key &&
                        E_key.toLowerCase() !== e.key &&
                        Q_key !== e.key &&
                        Q_key.toLowerCase() !== e.key) {

                        if (change_key == 'preset:W') {
                            W_key = e.key.toUpperCase();
                        } else if (change_key == 'preset:S') {
                            S_key = e.key.toUpperCase();
                        } else if (change_key == 'preset:A') {
                            A_key = e.key.toUpperCase();
                        } else if (change_key == 'preset:D') {
                            D_key = e.key.toUpperCase();
                        } else if (change_key == 'preset:E') {
                            E_key = e.key.toUpperCase();
                        } else if (change_key == 'preset:Q') {
                            Q_key = e.key.toUpperCase();
                        }
                        change_flg = 0;
                        localStorage.setItem(change_key, e.key.toUpperCase());
                    }
                } else if (change_flg == 2) {
                    if (
                        W_key !== e.key &&
                        W_key.toLowerCase() !== e.key &&
                        A_key !== e.key &&
                        A_key.toLowerCase() !== e.key &&
                        S_key !== e.key &&
                        S_key.toLowerCase() !== e.key &&
                        D_key !== e.key &&
                        D_key.toLowerCase() !== e.key &&
                        E_key !== e.key &&
                        E_key.toLowerCase() !== e.key &&
                        Q_key !== e.key &&
                        Q_key.toLowerCase() !== e.key) {

                        localStorage.removeItem(change_key);
                        if (change_key == 'preset:W') {
                            W_key = e.key.toUpperCase();
                        } else if (change_key == 'preset:S') {
                            S_key = e.key.toUpperCase();
                        } else if (change_key == 'preset:A') {
                            A_key = e.key.toUpperCase();
                        } else if (change_key == 'preset:D') {
                            D_key = e.key.toUpperCase();
                        } else if (change_key == 'preset:E') {
                            E_key = e.key.toUpperCase();
                        } else if (change_key == 'preset:Q') {
                            Q_key = e.key.toUpperCase();
                        }
                        change_flg = 0;
                        localStorage.setItem(change_key, e.key.toUpperCase());
                    }
                }
            }
        }
        if (change_flg == 0) {
            //設定画面の変更
            if (change_key == 'preset:W') {
                document.getElementById("cursorUpOp").innerHTML = toFullWidth(e.key.toUpperCase());
                document.getElementById("cursorUpOp").classList.remove('Select');
            } else if (change_key == 'preset:S') {
                document.getElementById("cursorDownOp").innerHTML = toFullWidth(e.key.toUpperCase());
                document.getElementById("cursorDownOp").classList.remove('Select');
            } else if (change_key == 'preset:A') {
                document.getElementById("cursorLeftOp").innerHTML = toFullWidth(e.key.toUpperCase());
                document.getElementById("cursorLeftOp").classList.remove('Select');
            } else if (change_key == 'preset:D') {
                document.getElementById("cursorRightOp").innerHTML = toFullWidth(e.key.toUpperCase());
                document.getElementById("cursorRightOp").classList.remove('Select');
            } else if (change_key == 'preset:E') {
                document.getElementById("checkKeyOp").innerHTML = toFullWidth(e.key.toUpperCase());
                document.getElementById("checkKeyOp").classList.remove('Select');
            } else if (change_key == 'preset:Q') {
                document.getElementById("menuKeyOp").innerHTML = toFullWidth(e.key.toUpperCase());
                document.getElementById("menuKeyOp").classList.remove('Select');
            }
        }
    }
}

//キーボード入力の動作（↑←↓→)
document.addEventListener('keydown', keydown_event);

function keydown_event(e) {

    if (change_flg == 0) {
        if (can_check_flg != -1 && posit_act_menu == 0) {    //Esc以外（ゲーム内限定キーボード）
            switch (e.key) {
                case 'ArrowUp':
                    //↑キーが押された時の処理
                    if (quest_M == 5) {
                        document.getElementById('check').classList.remove('Select');
                    } else {
                        document.getElementById('quest' + quest_N + '-' + quest_M).classList.remove('Select');
                    }
                    quest_M -= 1;
                    if (quest_M == 0) {
                        if (can_check_flg == 1) {
                            quest_M = 5;
                        } else {
                            quest_M = 4;
                        }
                    }
                    if (quest_M == 5) {
                        document.getElementById('check').classList.add('Select');
                    } else {
                        document.getElementById('quest' + quest_N + '-' + quest_M).classList.add('Select');
                    }
                    document.getElementById("selectSE").play();
                    break;

                case 'ArrowDown':
                    //↓キーが押された時の処理
                    if (quest_M == 5) {
                        document.getElementById('check').classList.remove('Select');
                    } else {
                        document.getElementById('quest' + quest_N + '-' + quest_M).classList.remove('Select');
                    }
                    quest_M += 1;
                    if (can_check_flg == 1 && quest_M == 6) {
                        quest_M = 1;
                    } else if (can_check_flg == 0 && quest_M == 5) {
                        quest_M = 1;
                    }
                    if (quest_M == 5) {
                        document.getElementById('check').classList.add('Select');
                    } else {
                        document.getElementById('quest' + quest_N + '-' + quest_M).classList.add('Select');
                    }
                    document.getElementById("selectSE").play();
                    break;

                case 'ArrowLeft':
                    //←キーが押された時の処理
                    document.getElementById('colorSample' + pick_color).classList.remove('Select');     //元の位置の色ピックアップ削除
                    pick_color -= 1;
                    if (pick_color == 0) {
                        pick_color = 6;
                    }
                    document.getElementById('colorSample' + pick_color).classList.add('Select');     //元の位置の色ピックアップ削除
                    document.getElementById("selectSE").play();
                    break;

                case 'ArrowRight':
                    //→キーが押された時の処理
                    document.getElementById('colorSample' + pick_color).classList.remove('Select');     //元の位置の色ピックアップ削除
                    pick_color += 1;
                    if (pick_color == 7) {
                        pick_color = 1;
                    }
                    document.getElementById('colorSample' + pick_color).classList.add('Select');     //元の位置の色ピックアップ削除
                    document.getElementById("selectSE").play();
                    break;
            }
        } else if (posit_act_menu == 1) {
            switch (e.key) {
                case 'ArrowUp':
                    //↑キーが押された時の処理
                    UpMoveForTopMenu();
                    document.getElementById("selectSE").play();
                    break;

                case 'ArrowDown':
                    //↓キーが押された時の処理
                    DownMoveForTopMenu();
                    document.getElementById("selectSE").play();
                    break;
            }

        } else if (posit_act_menu >= 4 && posit_act_menu <= 8) {
            switch (e.key) {
                case 'ArrowRight':
                    //→キーが押された時の処理
                    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.remove('ActiveMenu');    //メニュー非アクティブ化
                    posit_act_menu += 1;
                    if (posit_act_menu == 9) {
                        posit_act_menu = 4;
                    }
                    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.add('ActiveMenu');         //メニューアクティブ化

                    document.getElementById("selectSE").play();

                    break;
                case 'ArrowLeft':
                    //←キーが押された時の処理
                    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.remove('ActiveMenu');    //メニュー非アクティブ化
                    posit_act_menu -= 1;
                    if (posit_act_menu == 3) {
                        posit_act_menu = 8;
                    }
                    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.add('ActiveMenu');         //メニューアクティブ化

                    document.getElementById("selectSE").play();

                    break;
            }
        } else if (posit_act_menu == 2) {
            switch (e.key) {
                case 'ArrowRight':
                    //→キーが押された時の処理
                    document.getElementById('scoreMenu' + score_cursor).classList.remove('ActiveMenu');         //メニュー非アクティブ化
                    if (score_cursor == 1) {
                        score_cursor = 2;
                        document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
                    } else {
                        score_cursor = 1;
                        document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
                    }

                    document.getElementById("selectSE").play();

                    break;
                case 'ArrowLeft':
                    //←キーが押された時の処理

                    document.getElementById('scoreMenu' + score_cursor).classList.remove('ActiveMenu');         //メニュー非アクティブ化
                    if (score_cursor == 1) {
                        score_cursor = 2;
                        document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
                    } else {
                        score_cursor = 1;
                        document.getElementById('scoreMenu' + score_cursor).classList.add('ActiveMenu');         //メニューアクティブ化
                    }

                    document.getElementById("selectSE").play();

                    break;
            }
        }

        if (/*e.key === 'Escape'*/e.key === 'Escape') {
            //Escキーが押された時の処理
            if (posit_act_menu == 0) {
                document.getElementById('topMenu').classList.add('ActiveMenu');             //メニューアクティブ化
                posit_act_menu = 1;

            } else if (posit_act_menu == 1) {
                document.getElementById('topMenu').classList.remove('ActiveMenu');          //メニュー非アクティブ化
                posit_act_menu = 0;

            } else {
                if (posit_act_menu == 2) {
                    document.getElementById('scoreMenu' + score_cursor).classList.remove('ActiveMenu');    //メニュー非アクティブ化
                    document.getElementById('topMenu').classList.add('ActiveMenu');         //メニューアクティブ化
                    posit_act_menu = 1;
                } else if (posit_act_menu == 3) {
                    document.getElementById('optionMenu').classList.remove('ActiveMenu');   //メニュー非アクティブ化
                    document.getElementById('topMenu').classList.add('ActiveMenu');         //メニューアクティブ化
                    posit_act_menu = 1;
                } else if (posit_act_menu >= 4 && posit_act_menu <= 8) {
                    document.getElementById('helpMenu' + (posit_act_menu - 3)).classList.remove('ActiveMenu');     //メニュー非アクティブ化
                    document.getElementById('topMenu').classList.add('ActiveMenu');         //メニューアクティブ化
                    posit_act_menu = 1;
                }
            }
        }
    }else if(change_flg == 1 || change_flg == 2){
        if (/*e.key === 'Escape'*/e.key === 'Escape')
        if (change_key == 'preset:W') {
            document.getElementById("cursorUpOp").classList.remove('Select');
        } else if (change_key == 'preset:S') {
            document.getElementById("cursorDownOp").classList.remove('Select');
        } else if (change_key == 'preset:A') {
            document.getElementById("cursorLeftOp").classList.remove('Select');
        } else if (change_key == 'preset:D') {
            document.getElementById("cursorRightOp").classList.remove('Select');
        } else if (change_key == 'preset:E') {
            document.getElementById("checkKeyOp").classList.remove('Select');
        } else if (change_key == 'preset:Q') {
            document.getElementById("menuKeyOp").classList.remove('Select');
        }
        change_flg = 0;
    }
}

//キー変更を出来るように（設定をストレージに保持）
//キー設定プリセット key <- ex) 'preset:W' ; value <- ex) X; ( W A S D E Q )
function KeyChangeW() {
    if(change_flg == 0){
    change_key = 'preset:W';
    change_flg = 1;
    if (localStorage.getItem(change_key) != null) {
        change_flg = 2;
    }
    document.getElementById("cursorUpOp").classList.add('Select');
}}
function KeyChangeS() {
    if(change_flg == 0){
    change_key = 'preset:S';
    change_flg = 1;
    if (localStorage.getItem(change_key) != null) {
        change_flg = 2;
    }
    document.getElementById("cursorDownOp").classList.add('Select');
}}
function KeyChangeA() {
    if(change_flg == 0){
    change_key = 'preset:A';
    change_flg = 1;
    if (localStorage.getItem(change_key) != null) {
        change_flg = 2;
    }
    document.getElementById("cursorLeftOp").classList.add('Select');
}}
function KeyChangeD() {
    if(change_flg == 0){
    change_key = 'preset:D';
    change_flg = 1;
    if (localStorage.getItem(change_key) != null) {
        change_flg = 2;
    }
    document.getElementById("cursorRightOp").classList.add('Select');
}}
function KeyChangeE() {
    if(change_flg == 0){
    change_key = 'preset:E';
    change_flg = 1;
    if (localStorage.getItem(change_key) != null) {
        change_flg = 2;
    }
    document.getElementById("checkKeyOp").classList.add('Select');
}}
function KeyChangeQ() {
    if(change_flg == 0){
    change_key = 'preset:Q';
    change_flg = 1;
    if (localStorage.getItem(change_key) != null) {
        change_flg = 2;
    }
    document.getElementById("menuKeyOp").classList.add('Select');
}}

function KeyInitialCheck() {
    if(change_flg == 0){
    // change_flgを利用し、操作制限を付ける
    // ページ遷移

    document.getElementById('optionInitializeAnnounce').classList.add('ActiveMenu');
    change_flg = 3;
    }
}

// キー初期化でストレージ内もキー削除
function KeyInitialize() {//yes

    localStorage.removeItem('preset:W');
    W_key = 'W';

    localStorage.removeItem('preset:S');
    S_key = 'S';

    localStorage.removeItem('preset:A');
    A_key = 'A';

    localStorage.removeItem('preset:D');
    D_key = 'D';

    localStorage.removeItem('preset:E');
    E_key = 'E';

    localStorage.removeItem('preset:Q');
    Q_key = 'Q';

    document.getElementById("cursorUpOp").innerHTML = toFullWidth(W_key);
    document.getElementById("cursorDownOp").innerHTML = toFullWidth(S_key);
    document.getElementById("cursorLeftOp").innerHTML = toFullWidth(A_key);
    document.getElementById("cursorRightOp").innerHTML = toFullWidth(D_key);
    document.getElementById("checkKeyOp").innerHTML = toFullWidth(E_key);
    document.getElementById("menuKeyOp").innerHTML = toFullWidth(Q_key);

    // ページ遷移
    change_flg = 0;
    document.getElementById('optionInitializeAnnounce').classList.remove('ActiveMenu');
}

function NotKeyInitialize() {//no
    change_flg = 0;
    document.getElementById('optionInitializeAnnounce').classList.remove('ActiveMenu');
}


// スコアのランキング
function ScoreInitialCheck() {
    if(change_flg == 0){
    // change_flgを利用し、操作制限を付ける, change_flg = 3以上
    document.getElementById('scoreInitializeAnnounce').classList.add('ActiveMenu');
    change_flg = 3;
    }
}

function ScoreInitialize() {//yes
    //スコアの消去
    let i = 0;
    while (localStorage.key(i) != null) {
        if (localStorage.key(i).charAt(0) != 'd' && localStorage.key(i).charAt(0) != 's' && localStorage.key(i).charAt(0) != 't') {
            i++;
        } else {
            localStorage.removeItem(localStorage.key(i));
        }
    }
    // スコア・ランキング表記の消去
    window.location.reload();
}

function NotScoreInitialize() {//no
    change_flg = 0;
    document.getElementById('scoreInitializeAnnounce').classList.remove('ActiveMenu');
}

function menuOver(value) {
    if (topMenu_num == 1) {
        document.getElementById('score').classList.remove('Select');
    } else if (topMenu_num == 2) {
        document.getElementById('option').classList.remove('Select');
    } else if (topMenu_num == 3) {
        document.getElementById('help').classList.remove('Select');
    } else if (topMenu_num == 4) {
        document.getElementById('level').classList.remove('Select');
    } else if (topMenu_num == 5) {
        document.getElementById('startGiveUp').classList.remove('Select');
    } else if (topMenu_num == 6) {
        document.getElementById('close').classList.remove('Select');
    }

    topMenu_num = value;

    if (topMenu_num == 1) {
        document.getElementById('score').classList.add('Select');
    } else if (topMenu_num == 2) {
        document.getElementById('option').classList.add('Select');
    } else if (topMenu_num == 3) {
        document.getElementById('help').classList.add('Select');
    } else if (topMenu_num == 4) {
        document.getElementById('level').classList.add('Select');
    } else if (topMenu_num == 5) {
        document.getElementById('startGiveUp').classList.add('Select');
    } else if (topMenu_num == 6) {
        document.getElementById('close').classList.add('Select');
    }

    document.getElementById("selectSE").play();
}
