import React, {useEffect, useState} from 'react';
const App = () =>{
    const [isTracked, setIsTracked] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [days, setDays] = useState(0)
    const [interval, setInt] = useState<NodeJS.Timer>()

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
            setHours(0)
        }
    },[seconds])
    const startTimer = () => {
        let int = setInterval(()=>setSeconds(  prev=> prev+1),1000);
        setInt(int);
        setIsTracked(true)

    }
    const pause = ()=> {
        clearInterval(interval);
        setIsTracked(false)
    }
    const stop = ()=> {
        clearInterval(interval);
        setSeconds(0);
        setHours(0);
        setMinutes(0);
        setIsTracked(false)


    }

    return (
    <div className="App grid  place-items-center  h-screen bg-gradient-to-r from-pink-300 to-blue-500">
        <div className='flex flex-col container'>
           <h1 className='mx-auto text-4xl text-center py-5 text-white font-bold'>Timer Tracker</h1>
            <h2 className={`text-5xl border-8  ${isTracked?'bg-gradient-to-r from-pink-500 to-blue-500': 'bg-gradient-to-r from-blue-500 to-pink-500'} w-1/6 py-10 my-10 mx-auto px-7 rounded-full`}>{hours<10? `0${hours}`:hours}
                :{minutes<10? `0${minutes}`:minutes}
                :{seconds<10? `0${seconds}`:seconds}</h2>
           <div className='flex justify-center gap-5'>
               <button disabled={isTracked} onClick={startTimer} className='bg-lime-400 py-2 px-2 rounded-md hover:text-white'>Go track!</button>
               <button onClick={pause} className='bg-sky-700 py-2 px-2 rounded-md hover:text-white'>Pause</button>
               <button onClick={stop} className='bg-red-400 py-2 px-2 rounded-md hover:text-white'>Stop track!</button>
           </div>
        </div>
    </div>
  );
}

export default App;
