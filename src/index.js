import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = ({ value, setValue }) => {
  return (
    <button className='square' onClick={setValue}>
      {value}
    </button>
  );
};

const Board = ({ complete, setWinner, setComplete }) => {
  const [init, setInit] = useState(false);
  const [value0, setValue0] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');
  const [value7, setValue7] = useState('');
  const [value8, setValue8] = useState('');
  const [currentUser, setCurrentUser] = useState('X');
  const status = `Next player: ${currentUser}`;

  useEffect(() => {
    if (!init && !complete) {
      setInit(true);
    }
  }, [init, complete]);

  useEffect(() => {
    if (init) {
      const hasWinner = checkBoard();
      if (hasWinner) {
        setInit(false);
        setComplete(true);
        setWinner(currentUser);
        return;
      }
      if (isComplete()) {
        setInit(false);
        setComplete(true);
        return;
      }
      setCurrentUser(currentUser === 'X' ? 'O' : 'X');
    }
  }, [value0, value1, value2, value3, value4, value5, value6, value7, value8]);

  function checkBoard() {
    const row =
      (value0 === value1 &&
        value1 === value2 &&
        [value0, value1, value2].indexOf('') < 0) ||
      (value3 === value4 &&
        value4 === value5 &&
        [value3, value4, value5].indexOf('') < 0) ||
      (value6 === value7 &&
        value7 === value8 &&
        [value6, value7, value8].indexOf('') < 0);
    const col =
      (value0 === value3 &&
        value3 === value6 &&
        [value0, value3, value6].indexOf('') < 0) ||
      (value1 === value4 &&
        value4 === value7 &&
        [value1, value4, value7].indexOf('') < 0) ||
      (value2 === value5 &&
        value5 === value8 &&
        [value2, value5, value8].indexOf('') < 0);
    const diag =
      (value1 === value4 &&
        value4 === value8 &&
        [value1, value4, value8].indexOf('') < 0) ||
      (value6 === value4 &&
        value4 === value2 &&
        [value6, value4, value2].indexOf('') < 0);
    return row || col || diag;
  }

  function isComplete() {
    return (
      value0 &&
      value1 &&
      value2 &&
      value3 &&
      value4 &&
      value5 &&
      value6 &&
      value7 &&
      value8
    );
  }

  function reset() {
    setValue0('');
    setValue1('');
    setValue2('');
    setValue3('');
    setValue4('');
    setValue5('');
    setValue6('');
    setValue7('');
    setValue8('');
    setWinner('');
    setCurrentUser('X');
    setComplete(false);
  }

  function renderSquare(value, setValue) {
    return (
      <Square
        value={value}
        setValue={() => init && !value && setValue(currentUser)}
      />
    );
  }

  return (
    <div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {renderSquare(value0, setValue0)}
        {renderSquare(value1, setValue1)}
        {renderSquare(value2, setValue2)}
      </div>
      <div className='board-row'>
        {renderSquare(value3, setValue3)}
        {renderSquare(value4, setValue4)}
        {renderSquare(value5, setValue5)}
      </div>
      <div className='board-row'>
        {renderSquare(value6, setValue6)}
        {renderSquare(value7, setValue7)}
        {renderSquare(value8, setValue8)}
      </div>
      {complete && (
        <div>
          <button onClick={reset}>RESET</button>
        </div>
      )}
    </div>
  );
};

const Game = () => {
  const [complete, setComplete] = useState(false);
  const [winner, setWinner] = useState('');
  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          complete={complete}
          setWinner={setWinner}
          setComplete={setComplete}
        />
      </div>
      <div className='game-info'>
        <div>
          {complete ? (winner ? `Winner: ${winner}` : 'No Winner') : ''}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Game />, document.getElementById('root'));
