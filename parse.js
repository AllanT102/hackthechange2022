export function parseInfo(parseItem) {
    let parseString = parseItem.selector;
    let qs = [];
    let ans = [];

    let responseObj = {
        questions : qs,
        answers : ans,
    }


    return responseObj;
}

function split(selector, qs, ans) {
    //Original string
    let array = [];
    let str = selector;
    array = str.split("<span class=\"TermText notranslate lang-en\">");
    
    for (let i = 0; i < array.length; i++) {
        let newString = trimString(array[i]);
        
        if (i% 2  == 0){
            qs.push(alert(array[i].split("<  >".pop())));
        }
        else{
            ans.push(array[i]);
        }
      }
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
}
