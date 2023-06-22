// import React from 'react';
// import "./Question.css";


// export default function Question() {
//   return (
//     <div>
//       <h1>4択テスト</h1>
//     </div>
//   );
// };

// ------------------------------以下でトライ中

//Question.tsx
import React from 'react';

export default function Question({ exArray, index, chooseOption, checkAnswer }) {
  return (
    <div>
      <h1>4択テスト</h1>
      <h2>{exArray[index].question}</h2>
      <div>
        {["option1", "option2", "option3", "option4"].map((option, i) => (
          <label key={i}>
            <input type="radio" name="option" value={exArray[index][option]} onChange={(e) => chooseOption(e.target.value)} />
            {exArray[index][option]}
          </label>
        ))}
      </div>
      <button onClick={checkAnswer}>解答</button>
    </div>
  );
};
