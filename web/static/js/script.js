console.log("HashPaa");

const userInput = document.getElementById("userInput");
const showHash = document.getElementById("showHash");
const algoInfo = document.getElementById("algoInfo");
const midHeading = document.getElementById("midHeading");

let algos_selected = undefined;
const active_color = "#FFFF00";
const inactive_color = "#fff";
let prev_box = undefined;
let length = 20;

function getSelectedAlgo(algo_name) {
  if (algo_name == "shake_128" || algo_name == "shake_256") {
    length = prompt("Set the digest length", 20);
    if (length == null) {
      length = 20;
    }
  }
  midHeading.innerHTML = algo_name;
  algos_selected = algo_name;
  const box = document.getElementById(String(algo_name));
  if (prev_box) {
    prev_box.style.backgroundColor = inactive_color;
  }
  box.style.backgroundColor = active_color;
  prev_box = box;
  getHash_fromServer();
}

function getHash_fromServer() {
  let word = String(userInput.value);
  let algo = algos_selected;
  let encoding = "utf-8";
  
  if (word.length > 0 && algo.length > 0) {
    $.ajax({
      url: "/get-hash",
      type: "POST",
      data: { algo: algo, word: word, encoding: encoding, length: length },
      success: (res) => {
        showHash.innerHTML = res;
        algoInfo.innerHTML = `The hash of ${word} generated using ${algo} algorithm is ${res}.`;
      },
      error: (err) => {
        showHash.innerHTML = err;
        console.log(err);
      },
    });
  } else {
    showHash.innerHTML = "";
  }
}

const defaultAlgo = document.getElementById("sha256");
defaultAlgo.click();

userInput.addEventListener("keyup", () => {
  getHash_fromServer();
});
