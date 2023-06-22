// import React from 'react';
// import "./Result.css";


// export default function Result() {
//   return (
//     <div>
//       <h1>こんんかいの正解率は</h1>
//     </div>
//   );
// };

// ------------------------------以下でトライ中

// Result.tsx
import React from 'react';

export default function Result({ score }) {
  return (
    <div>
      <h1>こんんかいの正解率は{Math.floor(score / 3 * 100)}%</h1>
      <button onClick={() => window.location.reload()}>Home</button>
    </div>
  );
};
