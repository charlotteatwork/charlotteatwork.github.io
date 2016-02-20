// Computer random number
var computerNum = [];
var cptIndex = 1;
var userInputNum = [];
var inputIndex = 0;
var guessCount = 0;

function computerNumber() {
    // reset data
    computerNum = [];
    computerNum[0] = Math.floor((Math.random() * 10) % 9) + 1;
    cptIndex = 1;
    guessCount = 0;
    document.getElementById("congratsPanel").style.display = "none";

    do {
        var tempValue = Math.floor((Math.random() * 10) % 9) + 1;
        var isSameNum = false;
        for (var i = 0; i < computerNum.length; i++) {
            if (tempValue == computerNum[i]) {
                isSameNum = true;
                break;
            }
        }; // for

        if (!isSameNum) {
            computerNum[cptIndex] = tempValue;
            cptIndex++;
        }
    } while (cptIndex < 4);
}

function showRulePan() {
    document.getElementById("rulePanel").style.display = "block";
}

function hideRulePan() {
    document.getElementById("rulePanel").style.display = "none";
}

function guessNumber() {
    // User input number
    var numberInputPan = document.getElementsByClassName("numberInputPan")[0];
    numberInputPan.onkeyup = function(e) {
        var target = e.srcElement;
        if (/\D/g.test(target.value)) {
            target.value = target.value.replace(/\D/g, '');
        } else {
            var hasSameNumber = false;
            for (var i = 0; i < inputIndex; i++) {
                if (userInputNum[i] == target.value) {
                    hasSameNumber = true;
                    break;
                }
            } // for

            // console.log("has same number: " + hasSameNumber);
            if (hasSameNumber) {
                target.value = target.value.replace(/\d/g, '');
                // console.log("target.value: " + target.value);
                alert("Do not input the same digit!");
            } else {
                userInputNum[inputIndex] = target.value;
                inputIndex++;
                var maxLength = parseInt(target.attributes["maxlength"].value, 10);
                var myLength = target.value.length;
                if (myLength >= maxLength) {
                    var next = target;
                    while (next = next.nextElementSibling) {
                        if (next == null) {
                            break;
                        }

                        if (next.tagName.toLowerCase() == "input") {
                            next.focus();
                            break;
                        }
                    } // while
                } // if myLength >= maxLength

                if (inputIndex == 4) {
                    // if user input 4 non-repeated digit, then auto compare
                    displayGuessingResult();
                } // if already input 4 digit
            } // if hasSameNumber
        } // if not a number
    };
}

function displayGuessingResult() {
    //console.log("Computer random number: " + computerNum.toString());
    //console.log("User input number: " + userInputNum.toString());
    guessCount++;
    var countA = 0;
    var countB = 0;
    for (var k = 0; k < 4; k++) {
        if (userInputNum[k] == computerNum[k]) {
            countA++;
        }
    } // for
    //console.log("both the number AND the postion are CORRECT: " + countA);

    for (var l = 0; l < 4; l++) {
        for (var m = 0; m < 4; m++) {
            if (l != m && userInputNum[l] == computerNum[m]) {
                countB++;
                break;
            }
        }
    } // for
    //console.log("the correct number BUT in the WRONG spot: " + countB);

    // process page
    var guessTable = document.getElementById("guessTable");
    var guessTableLastIndex = guessTable.rows.length;
    //console.log("guessTable Last Index: " + guessTableLastIndex);
    var row = guessTable.insertRow(guessTableLastIndex);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = userInputNum.toString();
    cell2.innerHTML = " <----- 第 " + guessCount + " 次猜測結果 ----->";
    cell3.innerHTML = countA + "A" + countB + "B";

    if (countA == 4) {
        document.getElementById("answerDiv").innerHTML = "電腦數字是：" + computerNum.toString();
        document.getElementById("congratsPanel").style.display = "block";
    } else
        cleanUserInput();
}

function cleanUserInput() {
    for (var k = 0; k < 4; k++) {
        document.getElementById("num" + k).value = "";
    } // for
    userInputNum = [];
    inputIndex = 0;
    document.getElementById("num0").focus();
}

function playAgain() {
    cleanUserInput();
    var guessTable = document.getElementById("guessTable");
    //console.log(guessTable.rows.length);
    for (var i = guessTable.rows.length; 0 < i; i--) {
        guessTable.deleteRow(i - 1);
    }

    computerNumber();
}

function init() {
    computerNumber();
    guessNumber();
}
window.onload = init;
