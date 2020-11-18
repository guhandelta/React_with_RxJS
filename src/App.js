import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { of, interval, concat, Subject } from 'rxjs'
import { 
  takeWhile,
  takeUntil,
  scan,
  startWith,
  repeatWhen,
  share
 } from 'rxjs/operators'
import './App.css';

// Creating an observable | Using the `$` is quite like a convention to say that it is an observable
const observable$ = interval(1000); //interval()- emits an event as per the given milliseconds

function App() {
  const [ state, setState ] = useState();
  useEffect(()=>{
    // values emitted by the observable$ would be sent to the setState()
    observable$.subscribe(setState);
  }, []); // If teh dependency array is not provided, the observer will unsubscribe from the observable-
  //- and subscribe to a new one, on every re-render | [] => not syncing with anything
  return (
    <>
        <h3>Alarm Clock</h3>
        <div className="display">{state}</div>
    </>
  );
}

export default App;
