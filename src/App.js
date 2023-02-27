import React from 'react';
import './index.scss';

function App() {

  const [numbers, setNumbers] = React.useState([1,2,3]);

  const addNumbers = () => {
    const newnumber = Math.round(Math.random() * 100);
    setNumbers([ newnumber, ...numbers]);
  }

  return (
    <div className="App">
      <button onClick={addNumbers}>Новое число</button>
      <ul>
        {
          numbers.map((num) => (
            <li>{num}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
