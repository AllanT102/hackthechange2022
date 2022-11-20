export function parseInfo(parseItem) {
    let parseString = parseItem.selector;
    let qs = [];
    let ans = [];
    [qs, ans] = split(parseString, qs, ans);
    let ansL = [];
    for (let i of ans) {
        ansL.push(i.length);
    }
    let responseObj = {
        questions : qs,
        answers : ans,
        answerLengths : ansL
    }
    
    return responseObj;
}

function split(selector, qs, ans) {
    //Original string
    let array = [];
    let str = selector;
    array = str.split("<span class=\"TermText notranslate lang-en\">");
    
    for (let i = 1; i < array.length; i++) {
        let newString = trimString(array[i]);
        
        if (i% 2  == 0){
            ans.push(newString);
        }
        else{
            qs.push(newString);
        }
    }
    return [qs, ans];
}

function trimString(editString) {
    let arrla = [];
    let arrra = [];
    for (let i = 0; i < editString.length; i++) {
        if (editString.charAt(i) === '<') {
            arrla.push(i);
        } else if (editString.charAt(i) === '>') {
            arrra.push(i);
        }
    }
    for (let i = arrla.length - 1; i >= 0; i--) {
        let lindex = arrla[i];
        let rindex = arrra[i];
        editString = editString.substring(0, lindex) + editString.substring(rindex + 1);
    }
    return editString;
}