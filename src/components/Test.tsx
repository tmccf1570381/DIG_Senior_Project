// これは表示テスト用です
import React from 'react';
import Question from "./Test/Question.tsx";
import Answer from "./Test/Answer.tsx";
import Result from "./Test/Result.tsx";

export default function Test() {

//解答結果を保存。lengthで問題の進捗と正解率を管理。
const answerHistory = [];

const exArray = [{question:"パンはパンでも食べられないパンは何？",option1:"フライパン",option2:"カビたパン",option3:"美味しいパン",option4:"ぱんぱん",correctAnswer:"フライパン",category:"git",difficulty:"優しい",link:"asdf",explanation:"カビたパンも確かに食べられないけどそこをちぎって無くせば大丈夫。"}
,{question:"トマトを逆さまに読むと？",option1:"トマト",option2:"カビたパン",option3:"美味しいパン",option4:"ぱんぱん",correctAnswer:"フライパン",category:"git",difficulty:"優しい",link:"asdf",explanation:"これは2だよ"}
,{question:"トラックがコーナーで落とした物は何?",option1:"スピード",option2:"カビたパン",option3:"美味しいパン",option4:"ぱんぱん",correctAnswer:"フライパン",category:"git",difficulty:"優しい",link:"asdf",explanation:"これは3だよ"}]
  
return (
    <div>
      {false
      ? <Question />
      : <Answer />
      // : <Result />
      }
    </div>
  );
};
