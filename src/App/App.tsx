import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DogsSearchByBreed } from '../components/DogsSearchByBreed/DogsSearchByBreed';


const App:React.FC = () =>{
  return (
    <>     
      <header className="App-header">
        <h5>Mira las fotos de tus perros favoritos...!!!</h5>
      </header>
    
      <div className="App">
      <DogsSearchByBreed></DogsSearchByBreed>     
    </div>
    </>
  );
}

export default App;
