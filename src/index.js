const nPairs = {
  "13": "天醫", "68": "天醫", "49": "天醫", "27": "天醫",
  "14": "生氣", "67": "生氣", "39": "生氣", "28": "生氣",
  "19": "延年", "78": "延年", "34": "延年", "26": "延年",
  "12": "絕命", "69": "絕命", "48": "絕命", "37": "絕命",
  "16": "六煞", "47": "六煞", "38": "六煞", "29": "六煞",
  "17": "禍害", "89": "禍害", "46": "禍害", "23": "禍害",
  "18": "五鬼", "79": "五鬼", "36": "五鬼", "24": "五鬼",
};

const inputField = document.getElementById("inputData");
const submitButton = document.getElementById("submitData");
inputField.addEventListener("change", main);
submitButton.addEventListener("click", main);

function main() {
  const numberStr0 = checkStringFormat(inputField.value);
  const numberStr1 = transferAlphabet(numberStr0);
  const numberStr2 = processFives(numberStr1);
  const numberStr3 = processZeros(numberStr2);
  const numberStr4 = calculateNumbers(numberStr3);
  console.log(`${numberStr1} (Step 1: 字母轉換)`);
  console.log(`${numberStr2} (Step 2: 數字5處理)`);
  console.log(`${numberStr3} (Step 3: 數字0處理)`);
  console.log(`Step 4: 進行計算\n------\n${numberStr4}`);
  document.getElementById("resultData").innerText = numberStr4;
}

function checkStringFormat(input) {
  if (typeof(input) != "string" || input.length == 0) return "";
  return input.trim();
}

function transferAlphabet(inputStr) {
  for (let i = 0; i < inputStr.length; i++) {
    if (isNaN(Number(inputStr[i]))) {
      const e = (inputStr.toLowerCase().charCodeAt(i) - 96).toString();
      const first = inputStr.slice(0, i), end = inputStr.slice(i + 1);
      inputStr = first + e + end;
      if (Number(e) > 9) i++;
    }
  }
  return inputStr;
}

function processFives(numberStr) {
  for (let i = 0; i < numberStr.length; i++) {
    if (numberStr[i] == "5") {
      if (i == 0) {
        if (numberStr[i+1] == "5")
          numberStr = numberStr.replaceAt(i, "0");
        else
          numberStr = numberStr.replaceAt(i, numberStr[i+1]);
      }
      else if (i == numberStr.length - 1) {
        if (numberStr[i+1] == "5")
          numberStr = numberStr.replaceAt(i, "0");
        else
          numberStr = numberStr.replaceAt(i, numberStr[i-1]);
      }
      else numberStr = numberStr.slice(0, i) + numberStr.slice(i+1);
    }
  }
  return numberStr;
}

function processZeros(numberStr) {
  for (let i = 0; i < numberStr.length; i++) {
    if (numberStr[i] == "0") {
      if (i == 0)
        numberStr = numberStr.replaceAt(i, numberStr[i+1]);
      else if (i == numberStr.length - 1)
        numberStr = numberStr.replaceAt(i, numberStr[i-1]);
      else {
        let insert;
        if (numberStr[i-1] != "0" && numberStr[i+1] != "0") {
          insert = numberStr[i-1] + " " + numberStr[i+1];
        } else {
          if (numberStr[i-1] == "0") insert = numberStr[i+1];
          if (numberStr[i+1] == "0") insert = numberStr[i-1];
        }
        numberStr = numberStr.slice(0, i) + insert + numberStr.slice(i+1);
      }
    }
  }
  return numberStr;
}

function calculateNumbers(numberStr) {
  let value = "", sequence = "", previous = "";
  for (let i = 0; i < numberStr.length - 1; i++) {
    if (numberStr[i] == " " || numberStr[i+1] == " ") continue;
    const key = numberStr.slice(i, i+2), keyRev = key[1]+key[0];
    if (key[0] == key[1]) {
      if (previous) value += "(" + previous + ")";
      else value += "伏位";
    }
    else {
      previous = (nPairs[key] || nPairs[keyRev]);
      value += previous;
    }
    sequence += key;

    if (i < numberStr.length - 2)
      sequence += "|", value += "|";
  }

  return sequence + "\n" + value;
}

String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}