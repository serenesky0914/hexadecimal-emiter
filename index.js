let illegal = [];
let dict = {}

function genHexadecimal() {
    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    if (validate(genRanHex(8))) {
        console.log('Your generated code is: ' + genRanHex(8));
        document.getElementById('gen_hex_txt').innerHTML = genRanHex(8);
    } else {

    }

};

// Helper function to check if a hex code is valid or if it contains illegal words or patterns.
validate = (hex_code) => {
    let valid = false;
    // Check to see if the hex code has already been encountered and deemed as illegal.
    if (illegal.indexOf(hex_code) !== -1) {
        console.log('Code ' + hex_code + ' was generated, but it contains an illegal expression. A new code will be created:')
        return valid;
    }

    let repeating = true;
    let stepping_up = true;
    let stepping_down = true;
    // Check to see if the hex code repeats until the end of the code.
    for (let i = 2; i < hex_code.length - 1; i++) {
        if (hex_code[i] !== hex_code[i + 1]) {
            repeating = false;
        }
    }
    // Check to see if the hex code steps upward until the end of the code.
    for (let i = 2; i < hex_code.length - 1; i++) {
        if (Number(hex_code[i]) + 1 != Number(hex_code[i + 1])) {
            stepping_up = false;
        }
    }
    // Check to see if the hex code steps downward until the end of the code.
    for (let i = 2; i < hex_code.length - 1; i++) {
        if (Number(hex_code[i]) - 1 != Number(hex_code[i + 1])) {
            stepping_down = false;
        }
    }
    // If the hex code is not stepping up, stepping down, or repeating, then temporarily declare it valid.
    if (!stepping_up && !stepping_down && !repeating) {
        valid = true;
    }
    // The final validity check. 
    // If the hex code contains a word in the dictionary, declare the code invalid.
    for (let word in dict) {
        if (hex_code.includes(word)) {
            valid = false;
        }
    }
    // If the hex code is not valid, add the code to the illegal array, decrement the max number of combinations, and notify the user.
    if (valid === false) {
        illegal.push(hex_code);
        max_combinations -= 1;
        console.log('Code ' + hex_code + ' was generated, but it contains an illegal expression. A new code will be created:')
    }
    return valid;
}
