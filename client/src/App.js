import { useState, useRef } from 'react';
import './App.css';
import Card from './Card';
import axios from 'axios';

function App() {
    const ref = useRef()
    const [cities, setCities] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null)

    const onSubmit = async () => {
        // console.log("submit hit")
        // console.log(cities.split(' '))
        // console.log({ cities })
        setIsLoading(true)
        try {
            const res = await axios.post('https://xiv-tech-backend-project.onrender.com/getWeather', {
                cities: ref.current.value.split(' ')
            })
            console.log(res.data.weather)
            setData(res.data.weather)
            ref.current.value = null;
            setIsLoading(false)
        } catch (err) {
            alert("something went wrong, Try again!")
            ref.current.value = null;
            setIsLoading(false)
        }

    }

    return (
        <div className='h-screen w-screen flex flex-col gap-4 bg-gray-700 items-center' >
            <div className='text-3xl font-medium mb-6 text-slate-300'>Weather App</div>
            <div className="flex flex-col items-center gap-3 w-2/5 h-max p-4 shadow-lg">
                <input ref={ref} type="text" className=' outline-none rounded-sm px-2 shadow shadow-gray-600' placeholder='Enter city names' />
                <button disabled={ref.current === '' ? true : false} onClick={onSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500">{isLoading ? 'Loading...' : 'Submit'}</button>
            </div>
            {
                data !== null ? (
                    <>
                        <div className='shadow-lg px-4 py-4 w-3/4'>
                            <div className='text-center text-xl font-medium mb-4'>Cities</div>
                            <div className='flex flex-wrap gap-4'>

                                {
                                    Object.keys(data).map((key, i) => <Card key={key} city={key} temp={data[key]} />)
                                }
                            </div>
                        </div>
                    </>
                ) : null
            }
        </div>
    );
}

export default App;
