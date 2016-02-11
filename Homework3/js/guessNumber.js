// Computer random number
var computerNum = [];
computerNum[0] = Math.floor((Math.random() * 10) % 9) + 1;
var cptIndex = 1;

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

function showRulePan() {
    document.getElementById("rulePanel").style.display = "block";
}

function hideRulePan() {
    document.getElementById("rulePanel").style.display = "none";
}

function init() {
    // User input number
    var numberInputPan = document.getElementsByClassName("numberInputPan")[0];
    var userInputNum = [];
    var inputIndex = 0;
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

                // if user input 4 non-repeated digit, then auto compare
                console.log("Computer random number: " + computerNum.toString());
                console.log("User inputer number: " + userInputNum.toString());
            } // if hasSameNumber
        } // if not a number
    };
}
window.onload = init;
