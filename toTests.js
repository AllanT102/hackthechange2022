export function toMCTest(qaObject) {
    let qs = qaObject.questions;
    let ans = qaObject.answers;
    let ansL= qaObject.answerLengths;
    let lengthCorrections = 0.3;

    while (ans.length < 4) {
        ans.push("NoAnswer");
    }
    let testQs = [];
    for (let i = 0; i < qs.length; i++) {
        let possbileAns = [];
        for (let j = 0; j < qs.length; j++) {
            if (j !== i) {
                if (ansL[j] > ansL[i] * (1-lengthCorrections) && 
                ansL[j] < ansL[i] * (1+lengthCorrections)) {
                    possbileAns.push(j);
                }
            }
        }

        let answersIndex = [];
        answersIndex.push(i);
        while(possbileAns.length < 3) {
            let nextAns = Math.floor(Math.random() * ans.length);
            if (!answersIndex.includes(nextAns) && nextAns !== i) {
                possbileAns.push(nextAns);
            }
        }

        while(answersIndex.length <= 4) {
            let nextAns = Math.floor(Math.random() * possbileAns.length);
            if (!answersIndex.includes(possibleAns[nextAns])) {
                answersIndex.push(possbileAns[nextAns]);
            }
        }

        let correctAns = Math.floor(Math.random() * 4);
        let answers = [];
        let count = 1;
        for (let j = 0; j < 4; j++) {
            if (j === correctAns) {
                answers.push(ans[i]);
            } else {
                answers.push(ans[answersIndex[count]]);
                count++;
            }
        }

        let textObject = {
            qNum : i,
            question : qs[i],
            answers : answers,
            correctA : correctAns,
        }

        testQs.push(textObject);
    }
    return testQs;
}