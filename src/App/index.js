import React, { useState, useEffect } from 'react';
import {
  Button, Popover, PopoverHeader, PopoverBody
} from 'reactstrap';
import './App.scss';
import getQuestions from '../helpers/data/avatarData';

function App() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [singleQuestion, setSingleQuestion] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  // console.warn(allQuestions);

  const handleClick = () => {
    setShowAnswer(true);
    if (showAnswer) {
      setShowAnswer(false);
      setSingleQuestion(allQuestions[Math.floor(Math.random() * allQuestions.length)]);
    } else {
      setShowAnswer(true);
    }
    // showAnswer ? setShowAnswer(false) : setShowAnswer(true) --> this is ternary version
  };

  useEffect(() => {
    getQuestions()
      .then((questions) => {
        setAllQuestions(questions);
        // setAllQuestions(...questions);
        // console.warn(questions);
        setSingleQuestion(questions[Math.floor(Math.random() * questions.length)]);
      });
  }, []);

  return (
 <div className='App'>
    <h2>Q: {singleQuestion.question}</h2>
    <br/>
    <p><h3>{showAnswer && singleQuestion.correctAnswer}</h3></p>
    {showAnswer ? '' : <div>
      <Button id="Popover1" type="button">
        Possible Answers
      </Button>
      <Popover
        placement="left"
        isOpen={popoverOpen}
        target="Popover1"
        toggle={toggle}
        trigger="hover">
          <PopoverHeader>Possible Answers</PopoverHeader>
          <PopoverBody>
            <ul>
            {singleQuestion.possibleAnsers?.map((possAnsers, i) => <li key={i}>{possAnsers}</li>)}
            </ul>
          </PopoverBody>
        </Popover>
    </div>
    }
      <Button color="info" type="button" onClick={handleClick}>
        {showAnswer ? 'Get another Question' : 'Get Answer'}
      </Button>
  </div>
  );
}

export default App;
