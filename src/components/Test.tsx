// これは表示テスト用です
// import React from 'react';
// import Question from "./Test/Question.tsx";
// import Answer from "./Test/Answer.tsx";
// import Result from "./Test/Result.tsx";

// export default function Test() {

// //解答結果を保存。lengthで問題の進捗と正解率を管理。
// const answerHistory = [];

// const exArray = [{question:"パンはパンでも食べられないパンは何？",option1:"フライパン",option2:"カビたパン",option3:"美味しいパン",option4:"ぱんぱん",correctAnswer:"フライパン",category:"git",difficulty:"優しい",link:"asdf",explanation:"カビたパンも確かに食べられないけどそこをちぎって無くせば大丈夫。"}
// ,{question:"トマトを逆さまに読むと？",option1:"トマト",option2:"カビたパン",option3:"美味しいパン",option4:"ぱんぱん",correctAnswer:"フライパン",category:"git",difficulty:"優しい",link:"asdf",explanation:"これは2だよ"}
// ,{question:"トラックがコーナーで落とした物は何?",option1:"スピード",option2:"カビたパン",option3:"美味しいパン",option4:"ぱんぱん",correctAnswer:"フライパン",category:"git",difficulty:"優しい",link:"asdf",explanation:"これは3だよ"}]
  
// return (
//     <div>
//       {false
//       ? <Question />
//       : <Answer />
//       // : <Result />
//       }
//     </div>
//   );
// };

// ------------------------------以下でトライ中
// Test.tsx
import React, { useState } from 'react';
import Question from "./Test/Question.tsx";
import Answer from "./Test/Answer.tsx";
import Result from "./Test/Result.tsx";

const exArray = [
  {question:"パンはパンでも食べられないパンは何？",option1:"フライパン",option2:"カビたパン",option3:"美味しいパン",option4:"ぱんぱん",correctAnswer:"フライパン",category:"git",difficulty:"優しい",link:"asdf",explanation:"カビたパンも確かに食べられないけどそこをちぎって無くせば大丈夫。"},
  {question:"トマトを逆さまに読むと？",option1:"トマト",option2:"とまと",option3:"たけやまともこ",option4:"もとまと",correctAnswer:"トマト",category:"git",difficulty:"優しい",link:"asdf",explanation:"新聞紙もそうだよね"},
  {question:"トラックがコーナーで落とした物は何?",option1:"スピード",option2:"荷物",option3:"マフラー",option4:"ドライバー",correctAnswer:"スピード",category:"git",difficulty:"優しい",link:"asdf",explanation:"落としてないんですか？落としてくださいよ"}
];

export default function Test() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState("");
  const [page, setPage] = useState("Question");

  const chooseOption = (option) => {
    setChosen(option);
  }

  const nextQuestion = () => {
    setChosen("");
    if (index < exArray.length - 1) {
      setIndex(index + 1);
      setPage("Question");
    } else {
      setPage("Result");
    }
  }

  const checkAnswer = () => {
    if (chosen === exArray[index].correctAnswer) {
      setScore(score + 1);
    }
    setPage("Answer");
  }

  return (
    <div>
      {page === "Question" && <Question exArray={exArray} index={index} chooseOption={chooseOption} checkAnswer={checkAnswer} />}
      {page === "Answer" && <Answer exArray={exArray} index={index} chosen={chosen} nextQuestion={nextQuestion} />}
      {page === "Result" && <Result score={score} />}
    </div>
  );
};
