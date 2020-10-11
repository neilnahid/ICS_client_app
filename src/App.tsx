import React from 'react';
import { render } from 'react-dom';
import { ipcRenderer } from 'electron'; 
import { GlobalStyle } from './styles/GlobalStyle';
import Greetings from './components/Greetings';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Greetings />
      <button type="button"
        onClick={() => {
          ipcRenderer.invoke('disconnect');
        }}
      >
        Disconnect
      </button>
      <button type="button"
        onClick={() => {
          ipcRenderer.invoke('reconnect');
        }}
      >
        Reconnect
      </button>
    </>
  );
};

render(<App />, mainElement);
