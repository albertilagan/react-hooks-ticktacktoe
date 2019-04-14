import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = ({ value, onClick }) => {
  return (
    <button className='square' onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ complete, setWinner, setComplete }) => {
  const [init, setInit] = useState(false);
  const [values, setValues] = useState(Array(9).fill(''));
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
      if (values.indexOf('') < 0) {
        setInit(false);
        setComplete(true);
        return;
      }
      setCurrentUser(currentUser === 'X' ? 'O' : 'X');
    }
  }, [values]);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function checkBoard() {
    const checks = [
      [values[0], values[1], values[2]].filter(onlyUnique),
      [values[3], values[4], values[5]].filter(onlyUnique),
      [values[6], values[7], values[8]].filter(onlyUnique),
      [values[0], values[3], values[6]].filter(onlyUnique),
      [values[1], values[4], values[7]].filter(onlyUnique),
      [values[6], values[7], values[8]].filter(onlyUnique),
      [values[0], values[4], values[8]].filter(onlyUnique),
      [values[2], values[4], values[6]].filter(onlyUnique)
    ].filter(val => val.length === 1 && val.indexOf('') < 0);
    return checks.length > 0;
  }

  function reset() {
    setValues(Array(9).fill(''));
    setCurrentUser('X');
    setComplete(false);
  }

  function renderSquare(i) {
    const value = values[i];
    return (
      <Square
        value={value}
        onClick={() => {
          if (init && !value) {
            const newValues = values.slice();
            newValues[i] = currentUser;
            setValues(newValues);
          }
        }}
      />
    );
  }

  return (
    <div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
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
