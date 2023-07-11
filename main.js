document.querySelector(".control-buttons").onclick = function () {
  let yourName = prompt("What's Your Name ?");

  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()]; // equal to Array.from(Array(blocks.length).keys())

shuffle(orderRange);
// add order Css property to game block
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

// flip blocks function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  // collect all flip cards
  let allFlipedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allFlipedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFlipedBlocks[0], allFlipedBlocks[1]);
  }
}

// stop clicking function
function stopClicking() {
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    // remove class no-clicking to make users can click to other blocks
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// check matched block function
let triesElement = document.querySelector(".tries span");
function checkMatchedBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }

  if (parseInt(triesElement.innerHTML) === 10) {
    endGame();
    blocksContainer.classList.add("end");
  } else {
    let allMatched = blocks.every((block) =>
      block.classList.contains("has-match")
    );

    if (allMatched) {
      Succ();
      blocksContainer.classList.add("end");
    }
  }
}

// shuffle function
function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;

    // swap elements in array and return with new random array
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

function endGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(
    `Game Over.
     Reload To Play Again,
     Maximum Wrong Tries Is: ${triesElement.innerHTML}`
  );
  div.appendChild(divText);

  div.className = "popup";
  document.body.appendChild(div);
}

function Succ() {
  let div = document.createElement("div");
  let divText =
    document.createTextNode(`Good Job: Wrong Tries Is: ${triesElement.innerHTML}
  Reload To Play Again.`);
  div.appendChild(divText);

  div.className = "popup";
  document.body.appendChild(div);
}
