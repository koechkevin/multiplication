/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';

const array = (start, length, status=false) => {
  let output = status?['']:[];
  for (let i = start; i<start+length; i++) output[output.length] = i;
  return output;
};

const RowHead = ({ start, length }) => {
  const heads = array(start, length, true);
  return (
    <div className="table">
      {heads.map((e,i) => <div key={i} className="column">{e}</div>)}
    </div>
  );
};

const Row = ({ start, length, row, state, onChange, handleKeyUp }) => {
  const columns = array(start, length);
  return (
    <div className="table">
      <div className="column">{row}</div>
      {columns.map((e,i) => {
        const className = state[`${row}*${e}`] && state[`${row}*${e}`] !== (row * e).toString()?'red':!state[`${row}*${e}`]?'':'green';
        return (
          <input
            onChange={onChange}
            id={`${row}*${e}`}
            onKeyUp={handleKeyUp}
            className={className}
            name={`${row}*${e}`}
            value={state[`${row}*${e}`] || ''}
            key={i}
            type="text"
          />
        );
      })}
    </div>
  );
};

const Multiplication = () => {
  const initialState = {};
  const [start, setStart] = useState(1);
  const [length, setLength] = useState(5);
  const [startRow, setStartRow] = useState(1);
  const [rowLength, setRowLength] = useState(5);
  const [state, setState] = useState(initialState);
  const rows = array(startRow, rowLength);
  const onChange = (e) => setState({...state, [e.target.name]: e.target.value});
  const props = {start, length, state, onChange};
  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      const currentPosition = event.target.name.split('*');
      const next = `${parseInt(currentPosition[1], 10) === length?parseInt(currentPosition[0], 10)+1:currentPosition[0]}*${parseInt(currentPosition[1], 10) === length?startRow:parseInt(currentPosition[1], 10)+1}`;
      const nextInput = document.getElementById(next);
      if(nextInput)nextInput.focus();
    }
  };
  return(
    <div className="multiplication">
      <div style={{ textAlign: 'left'}}>
        <span>Rows </span>
        <input type="number" value={rowLength} min={4} max={20} onChange={(e)=>setRowLength(parseInt(e.target.value))} style={{ width: '40px'}} />
        <span>Columns </span>
        <input type="number" value={length} min={4} max={20} onChange={(e)=>setLength(parseInt(e.target.value))} style={{ width: '40px'}} />
      </div>
      <button onClick={() => setStartRow(startRow>1?startRow-1:1)} className="top" type="button">&#94;</button>
      <div className="flexible">
        <button onClick={() => setStart(start>1?start-1:1)} className="left" type="button">&lsaquo;</button>
        <div>
          <RowHead {...props} />
          {rows.map((e, i) => <Row {...props} handleKeyUp={handleKeyUp} key={e*i} row={e} />)}
        </div>
        <button onClick={() => setStart(start+1)} className="right" type="button">&rsaquo;</button>
      </div>
      <button onClick={() => setStartRow(startRow+1)} className="bottom" type="button">v</button>
    </div>
  );
};

export default Multiplication;
