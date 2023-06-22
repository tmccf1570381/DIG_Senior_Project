// import React from 'react';
// import "./Answer.css";

// const Answer = () => {
//   return (
//     <div>
//         <h1>正解は</h1>
//            {}
//     </div>
//   )
// }

// export default Answer

// ------------------------------以下でトライ中

// Answer.tsx
import React from 'react';

const Answer = ({ exArray, index, chosen, nextQuestion }) => {
  const isCorrect = chosen === exArray[index].correctAnswer;

  return (
    <div>
      <h1>正解は{exArray[index].correctAnswer}でした！</h1>
      <p>{isCorrect ? "正解です！" : "不正解です。"}</p>
      <p>解説: {exArray[index].explanation}</p>
      <a href={exArray[index].link}>詳細リンク</a>
      <button onClick={nextQuestion}>次へ</button>
    </div>
  )
}

export default Answer;
