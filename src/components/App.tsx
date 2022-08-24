import React, {useEffect, useState} from 'react';
const App:React.FC = () =>{
    const [isTracked, setIsTracked] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [days, setDays] = useState(0)
    const [interval, setInt] = useState<NodeJS.Timer>()
    const [time, setTime] = useState(0)

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
    useEffect(()=>{
        if (localStorage.getItem('timeSpendTracker'))  {
            setTime(JSON.parse(window.localStorage.getItem('timeSpendTracker') as string))
        }
    },[])
    useEffect(()=>{
        window.localStorage.setItem('timeSpendTracker', JSON.stringify(time));

    },[time])
    useEffect(()=>{
        return()=>{
            window.localStorage.setItem('timeSpendTracker', JSON.stringify(time));
        }

    },[time])
    const startTimer = () => {
        let int = setInterval(()=>setSeconds(  prev=> prev+1),1000);
        setInt(int);
        setIsTracked(true)

    }
    const pause = ()=> {
        clearInterval(interval);
        setIsTracked(false)
    }
    const Time = ()=>{
        const  day = Math.floor(time / ( 60 * 60 * 24)),
            hour = Math.floor((time / (60 * 60) % 24)),
            minute = Math.floor((time / ( 60) % 60)),
            second = Math.floor((time) % 60);
        return(
            <section className='flex flex-col text-center text-white text-3xl'>
              <h1> Total spend time:</h1>
                <h2 className='underline'> {day<10? `0${day}`:day} : {hour<10? `0${hour}`:hour} : {minute<10? `0${minute}`:minute} : {second<10? `0${second}`:second} </h2>
            </section>
        )
    }
    const stop = ()=> {
        clearInterval(interval);
        setSeconds(0);
        setHours(0);
        setMinutes(0);
        setIsTracked(false)
        setTime (( prevState)  => prevState +=seconds + minutes*60 + hours*60*60)
    }

    return (
    <div className="App grid font-mono shadow-2xl place-items-center h-screen bg-gradient-to-b from-[#00a2ff] to-yellow-400">
        <div className='flex flex-col container'>
           <h1 className='drop-shadow-xl mx-auto text-4xl text-center py-5 text-white font-bold'>Timer Tracker</h1>
            <Time/>
            <h2 className='text-5xl border-8 text-center bg-gradient-to-b from-amber-400  py-10 my-10 mx-auto px-7 rounded-full'>
               <span className=''>
                    {hours<10? ` 0${hours} `:` ${hours} `}
                   :{minutes<10? ` 0${minutes} `: minutes}
                   :{seconds<10? ` 0${seconds} `:` ${seconds} ` }
               </span>
            </h2>
           <div className='flex justify-center gap-5'>
               <button disabled={isTracked} onClick={startTimer} className='drop-shadow-xl shadow-2xl  bg-lime-400 py-2 px-2 rounded-md hover:text-white'>Go track!</button>
               <button onClick={pause} className='drop-shadow-xl shadow-2xl bg-sky-700 py-2 px-2 rounded-md hover:text-white'>Pause</button>
               <button onClick={stop} className='drop-shadow-xl shadow-2xl bg-red-400 py-2 px-2 rounded-md hover:text-white'>Stop track!</button>
           </div>
        </div>
    </div>
  );
}

export default App;
