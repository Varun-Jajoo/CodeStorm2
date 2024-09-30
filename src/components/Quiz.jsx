import React, { useState } from 'react';
import Quizdata from "./Quizdata";
import "../css/quiz.css";

export default function Quiz({setquiz}) {
   const [ques, setQues] = useState(0);
   const [score, setScore] = useState(0);
   const [clickopt, setClickOpt] = useState(null);

   const nextQues = () => {
      if (clickopt === Quizdata[ques].correctAnswer) {
         setScore(score + 1);
      }

      if (ques < Quizdata.length - 1) {
         setQues(ques + 1);
         setClickOpt(null); 
      }
   };

   return (
      <div className='quizContainer'>
         <div className="ques">
            <span>{ques + 1}.</span><span>{Quizdata[ques].question}</span>
         </div>
         <div className="options">
            {Quizdata[ques].options.map((option, i) => {
               const optionStyle = {
                  backgroundColor: i + 1 === clickopt ? (clickopt === Quizdata[ques].correctAnswer ? 'green' : 'red') : '',
               };

               return (
                  <button
                     key={i}
                     style={optionStyle}
                     onClick={() => setClickOpt(i + 1)}
                     disabled={clickopt !== null} 
                  >
                     {option}
                  </button>
               );
            })}
         </div>
         <input type="button" onClick={nextQues} value="Next" />
         
         <div>Score: {score}</div>
      </div>
   );
}
