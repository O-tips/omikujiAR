let modelLoaded = false;
let soundPlayed = false;
let randInt;

document.addEventListener("DOMContentLoaded", function () {
  randInt = getRandomInt(0, 4);
  console.log("Initial random model index: " + randInt);
  // 選択されたモデルを配置
  const targetContainer = document.querySelector("#target-container");
  const modelElement = document.createElement("a-gltf-model");
  modelElement.setAttribute("id", `model${randInt}`);
  modelElement.setAttribute("rotation", "0 -90 0");
  modelElement.setAttribute("position", "0 0 0");
  modelElement.setAttribute("scale", "0.3 0.3 0.3");
  modelElement.setAttribute("src", `#model${randInt}`);
  targetContainer.appendChild(modelElement);
});

const sceneEl = document.querySelector("a-scene");
sceneEl.addEventListener("arReady", (event) => {
  console.log("MindAR is ready");
});
sceneEl.addEventListener("targetFound", (event) => {
  console.log("Target found");
  modelLoaded = true;
  soundPlayed = false;
  updateModel();
});
sceneEl.addEventListener("targetLost", (event) => {
  console.log("Target lost");
  soundPlayed = true;
});

const muteButton = document.getElementById("muteButton");
const soundEffect = document.querySelector("#soundEffect");
soundEffect.muted = true;
muteButton.addEventListener("click", function () {
  if (soundEffect.muted) {
    soundEffect.muted = false;
    console.log("sound muted off");
    muteButton.textContent = "音声ミュート中";
  } else {
    soundEffect.muted = true;
    console.log("sound muted on");
    muteButton.textContent = "音声ミュート解除";
  }
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // 上限は除き、下限は含む
}

function updateModel() {
  if (modelLoaded) {
    console.log("Updating model");
    // 効果音
    if (!soundPlayed && !soundEffect.muted) {
      soundPlayed = true;
      soundEffect.play();
    }

    // フォトフレーム表示
    const photoFrameOverlay = document.getElementById("photo-frame-overlay");
    photoFrameOverlay.style.display = "block";
  }
}

const clickableArea = document.getElementById("clickable-area");
const fortuneDialog = document.getElementById("fortune-dialog");
const fortuneText = document.getElementById("fortune-text");
const fortuneDetails = document.getElementById("fortune-details");
const closeFortuneButton = document.getElementById("close-fortune");
const fortuneTexts = {
  0: "大吉",
  1: "中吉",
  2: "小吉",
  3: "凶",
};
const fortuneDescriptions = {
  0:
    "絶好調の予感！何をやってもうまくいきそう！\n" +
    "願望: あなたの願いが叶う日！思い切って行動してみて！\n" +
    "学問: 新しいことを学ぶのにぴったりの日。試験や発表もバッチリ成功するよ。\n" +
    "恋愛: 素敵な出会いや、関係深まるチャンス到来！積極的に行動してみて！\n" +
    "旅行: 楽しい冒険が待っているよ。計画を立てて出発しよう！\n" +
    "失物: 見つかりそう！ついでにへそくりも出てくるかも...。\n" +
    "ラッキー言語: Python  簡単で強力！今日は何でもできちゃう日。",
  1:
    "かなりいい1日！ちょっとした幸せがあちこちに隠れてるよ。見逃さないで！\n" +
    "願望: いい感じ！小さな願いが叶いやすい日。周りのサポートも期待できるよ。\n" +
    "学問: 努力が実を結ぶ日。地道に積み重ねてきたことが形になってくるよ。\n" +
    "恋愛: 気になる人との距離が縮まるかも。積極的になってみて！\n" +
    "旅行: 短い旅行やお出かけにはぴったりの日。良い思い出になるよ。\n" +
    "失物: ヒントが得られるかも。友達に聞いてみるといいかもね。\n" +
    "ラッキー言語: Java  安定感抜群の1日。大規模なことにもトライしてみて！",
  2:
    "ちょっといいことありそう！\n" +
    "願望: まずまず。自分の目標に向かって進むことで夢に近づけるかも。\n" +
    "学問: 平凡な1日だけど、その中にも学びのチャンスが。小さな発見を大切に！\n" +
    "恋愛: 関係を深める日。デートやおしゃべりで楽しい時間を過ごしてね。\n" +
    "旅行: 行きたい場所への道筋が見えてくる日。計画を練って実行に移そう。\n" +
    "失物: 見つからないかもしれないけど、他の大切なものに気づく日。\n" +
    "ラッキー言語: C++  パフォーマンスを意識して、サクサク動こう！",
  3:
    "ちょっと注意が必要な日。でも、ピンチはチャンス！乗り越えていこう\n" +
    "願望: 努力を続ければ必ず道は開けるよ。諦めないで！\n" +
    "学問: 今日はあえて苦手な分野にトライしてみよう！\n" +
    "恋愛: 恋愛面では波乱の予感。冷静に対応すれば大丈夫！\n" +
    "旅行: 旅行計画には注意が必要。急な変更やトラブルに備えて余裕を持とう。\n" +
    "失物: 今日は探し物運が悪い日。無理せず、また後で探してみよう。\n" +
    "ラッキー言語: Haskell  たまには型を守るのも大事。安全に過ごそう！",
};

clickableArea.addEventListener("click", function () {
  if (fortuneDialog && fortuneDetails) {
    fortuneText.textContent = fortuneTexts[randInt];
    fortuneDetails.textContent = fortuneDescriptions[randInt];
    fortuneDialog.showModal();
    console.log("Fortune dialog shown");
  } else {
    console.error("Fortune dialog or details element not found");
  }
});

if (closeFortuneButton) {
  closeFortuneButton.addEventListener("click", function () {
    fortuneDialog.close();
    console.log("Fortune dialog closed");
  });
} else {
  console.error("Close button not found");
}

//　スクリーンショット
var image = document.querySelector("#snap");
var take_photo_btn = document.querySelector("#take-photo");
var delete_photo_btn = document.querySelector("#delete-photo");
var download_photo_btn = document.querySelector("#download-photo");

//スナップショットボタン
take_photo_btn.addEventListener("click", function (e) {
  console.log("take_photo_btn clicked");
  e.preventDefault();
  var video = document.querySelector("video");
  var snap = takeSnapshot(video);

  //スナップショット表示.
  image.setAttribute("src", snap);
  image.classList.add("visible");

  // 削除ボタンと保存ボタン有効
  delete_photo_btn.classList.remove("disabled");
  download_photo_btn.classList.remove("disabled");

  // 保存ボタンにスナップショットを渡す
  download_photo_btn.href = snap;
});

//削除ボタン
delete_photo_btn.addEventListener("click", function (e) {
  e.preventDefault();

  // スナップショットを隠す
  image.setAttribute("src", "");
  image.classList.remove("visible");

  // 削除ボタンと保存ボタン無効
  delete_photo_btn.classList.add("disabled");
  download_photo_btn.classList.add("disabled");
});

//スナップショットを撮る
function takeSnapshot(video) {
  var resizedCanvas = document.createElement("canvas");
  var resizedContext = resizedCanvas.getContext("2d");
  var width = video.videoWidth;
  var height = video.videoHeight;
  var aScene = document
    .querySelector("a-scene")
    .components.screenshot.getCanvas("perspective");

  if (width && height) {
    //videoのサイズをキャンバスにセット
    resizedCanvas.width = width;
    resizedCanvas.height = height;
    //キャンバスにvideoをコピー
    resizedContext.drawImage(video, 0, 0, width, height);

    //カメラの画角でar側の縮小処理を変える
    if (width > height) {
      // 横長（PC)
      resizedContext.drawImage(aScene, 0, 0, width, height);
    } else {
      // 縦長（スマホ）
      resizedContext.drawImage(aScene, 0, 0, width, height);
      // var scale = height / width;
      // var scaledWidth = height * scale;
      // var marginLeft = (width - scaledWidth) / 2;
      // resizedContext.drawImage(aScene, marginLeft, 0, scaledWidth, height);
    }

    // photoFrame.pngの読み込みと描画
    resizedContext.drawImage(
      photoFrame,
      0,
      0,
      width,
      (width / photoFrame.width) * photoFrame.height
    );
    // header.pngの読み込みと描画
    resizedContext.drawImage(
      header,
      0,
      0,
      width,
      (width / header.width) * header.height
    );

    return resizedCanvas.toDataURL("image/png");
  }
}
