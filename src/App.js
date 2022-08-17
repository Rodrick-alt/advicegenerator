import './Styles/App.css';
import { useState } from 'react';
import diceImg from './images/icon-dice.svg';
import dividerDesktopImg from './images/pattern-divider-desktop.svg';

function App() {
  const [message, SetMessage] = useState([176, "Good things come to those who wait."]);

  window.onload = () => {
    request()
      .then(function (result) {
        SetMessage(old => result);
      })
      .catch(function () {
        console.log('error')
      })
  }

  function request() {
    let arr = [];
    // Ajax Promise with then() request
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.onload = function (event) {
        let obj1 = JSON.parse(event.target.response);
        arr = [obj1.slip.id, obj1.slip.advice];
        resolve(arr);
      }
      xhr.onerror = reject;
      xhr.open("GET", 'https://api.adviceslip.com/advice');
      xhr.send();
    })
  }

  return (
    <div id="Page-Wrapper">
      <div id='card'>
        <p id='title'>{`ADVICE #${message[0]}`}</p>
        <p id='message'>{`"${message[1]}"`}</p>
        <img id='divider' src={dividerDesktopImg} alt='' />
        <button onClick={() =>
          request()
            .then(function (result) {
              SetMessage(old => result);
            })
            .catch(function () {
              console.log('error')
            })
        }>
          <img src={diceImg} alt='' />
        </button>
      </div>
    </div>
  );
}

export default App;
