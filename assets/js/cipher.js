document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("inputText");
  const cipherKey = document.getElementById("cipherKey");
  const cipherMode = document.getElementById("cipherMode");
  const cipherBtn = document.getElementById("cipherBtn");
  const outputText = document.getElementById("outputText");

  cipherBtn.addEventListener("click", () => {
    const mode = cipherMode.value;
    const keyword = cipherKey.value.toUpperCase().replace(/[^A-Z]/g, '');
    const text = inputText.value.toUpperCase().replace(/[^A-Z]/g, '');
    const polybiusSquare = generatePolybiusSquare(keyword);

    if (mode === "encode") {
      outputText.value = encodePolybius(text, polybiusSquare);
    } else {
      outputText.value = decodePolybius(text, polybiusSquare);
    }
  });

  function generatePolybiusSquare(keyword = "") {
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // J omitted
    let key = "";
    for (let char of keyword + alphabet) {
      if (!key.includes(char) && char !== "J") key += char;
    }

    const square = [];
    for (let i = 0; i < 25; i++) {
      square.push(key[i]);
    }

    return square;
  }

  function encodePolybius(text, square) {
    let result = "";
    for (let char of text) {
      if (char === "J") char = "I";
      const index = square.indexOf(char);
      if (index !== -1) {
        const row = Math.floor(index / 5) + 1;
        const col = (index % 5) + 1;
        result += ${row}${col} ;
      }
    }
    return result.trim();
  }

  function decodePolybius(code, square) {
    let result = "";
    const pairs = code.match(/\d{2}/g);
    if (!pairs) return "";

    for (let pair of pairs) {
      const row = parseInt(pair[0]) - 1;
      const col = parseInt(pair[1]) - 1;
      const index = row * 5 + col;
      result += square[index] || "?";
    }

    return result;
  }
});
