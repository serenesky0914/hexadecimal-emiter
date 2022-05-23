let max_combinations = 2562890625;
let duplicates = [];
let illegal = [];
let dict = {}

function genHexadecimal() {
    // new 8 digit Hexadecimal generate
    const result = genRanHex(8);

    // Check to see if we have created every possible code. If we have, clear the duplicates array to allow duplicates to be made.
    if (duplicates.length === max_combinations) {
        duplicates = [];
    }

    // Checks to see if the generated code is either a duplicate or illegal. 
    // If it is not, displays the code and adds it to the duplicate array. Also updates the colors of the site.
    // If it is, runs the function again to generate a new code.
    if (duplicates.indexOf(result) === -1 && validate(result)) {
        duplicates.push(result);
        console.log('Generated code is: ' + result);
        document.getElementById('gen_hex_txt').innerText = result;
        // change bg color using hex data
        document.body.style.backgroundColor = '#' + result;
        document.getElementById('gen_hex_txt').style.backgroundColor = '#' + result;
    } else {
        return genHexadecimal();
    }

    // Logs the duplicate and illegal code array for tracking.
    console.log('Accumulated codes lists: ' + duplicates);
    console.log('Accumulated illegal codes: ' + illegal);
    console.log('--------->');
};

// generate random 8 digit Hexadecimal
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

// validation checking if genrated hex code is valid or if it contains illegal words or patterns.
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
