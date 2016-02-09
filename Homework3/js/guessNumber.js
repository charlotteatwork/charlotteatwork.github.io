function showRulePan() {
    document.getElementById("rulePanel").style.display = "block";
}

function hideRulePan() {
    document.getElementById("rulePanel").style.display = "none";
}

function init() {
    var numberInputPan = document.getElementsByClassName("numberInputPan")[0];
    var userInputNum = [];
    var inputIndex = 0;
    numberInputPan.onkeyup = function(e) {
        var target = e.srcElement;
        if (/\D/g.test(target.value)) {
            target.value = target.value.replace(/\d/g, '');
        } else {
            var hasSameNumber = false;
            for (var i = 0; i < inputIndex; i++) {
                if (userInputNum[i] == target.value) {
                    hasSameNumber = true;
                    break;
                }
            } // for

            if (hasSameNumber) {
                target.value = target.value.replace(/\D/g, '');
                alert("Do not input the same digit!");
            } else {
                var maxLength = parseInt(target.attributes["maxlength"].value, 10);
                var myLength = target.value.length;
                if (myLength >= maxLength) {
                    var next = target;
                    while (next = next.nextElementSibling) {
                        if (next == null)
                            break;
                        if (next.tagName.toLowerCase() == "input") {
                            next.focus();
                            userInputNum[inputIndex] = target.value;
                            inputIndex++;
                            break;
                        }
                    }
                } // if myLength >= maxLength
            } // if hasSameNumber
        } // if not a number
    };
}
window.onload = init;
