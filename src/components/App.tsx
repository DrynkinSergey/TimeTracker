import React, {useEffect, useState} from 'react';
const App = () =>{
    const [isTracked, setIsTracked] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [days, setDays] = useState(0)

    const [interval, setInt] = useState()
    const startTimer = () => {
        let int = setInterval(()=>setSeconds(  prev=> prev+1),1000);
        // @ts-ignore
        setInt(int);
        setIsTracked(true)
    }
    useEffect(()=>{
        if(seconds===60){
            setMinutes(prev => prev+1)
            setSeconds(0)
        }
        if(minutes === 60){
            setHours(prev => prev+1)
            setMinutes(0)
        }
        if(hours === 24){
            setDays(prev => prev+1)
            setSeconds(0)
        }
    },[seconds])


    const stop = ()=> {
        clearInterval(interval);
        setIsTracked(false)
    }

    return (
    <div className="App  bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="container mx-auto h-screen w-full">
           <h1 className='mx-auto text-4xl text-center py-5 text-white font-bold'>Timer Tracker</h1>
            <h2 className='text-5xl py-3 px-3'>{hours<10? `0${hours}`:hours}
                :{minutes<10? `0${minutes}`:minutes}
                :{seconds<10? `0${seconds}`:seconds}</h2>
            <button disabled={isTracked} onClick={startTimer} className='bg-lime-400 py-2 px-2 mx-2 rounded-md hover:text-white'>Go track!</button>
            <button onClick={stop} className='bg-lime-400 py-2 px-2 rounded-md hover:text-white'>Stop track!</button>
        </div>
    </div>
  );
}

export default App;
