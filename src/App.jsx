import {useState} from 'react';
import './App.css'
import axios from 'axios';
import logo from './assets/International_Pokémon_logo.svg.png'

const App = () => {

  const [result, setResult] = useState('')
  const [item, setItem] = useState({
    name: '',
    species: '',
    img: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    weight: '',
    height: '',
    type: ''
  })

  const fetchResult = () => {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${result}`).
        then((res) => {
          setItem({
            name: res.data.name.toUpperCase(),
            species: `SPECIES: ${res.data.species.name.toUpperCase()}`,
            img: res.data.sprites.front_default,
            hp: `HP: ${res.data.stats[0].base_stat}`,
            attack: `ATTACK: ${res.data.stats[1].base_stat}`,
            defense: `DEFENSE: ${res.data.stats[2].base_stat}`,
            speed: `SPEED: ${res.data.stats[5].base_stat}`,
            weight: `WEIGHT: ${res.data.weight}`,
            height: `HEIGHT: ${res.data.height}`,
            type: `TYPE: ${res.data.types[0].type.name.toUpperCase()}`
          })
          console.log(res)
      }).catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen  gap-6 bg-slate-50'>
      <img className='w-40' src={logo} alt="logo" />
        <div className="flex gap-2">
          <input onChange={(e) => {
            setResult(e.target.value.toLowerCase())
          }} className="border-2 placeholder:text-slate-400 block border-slate-300 rounded-md py-2 px-5 shadow-sm focus:outline-none sm:text-sm" placeholder="Type here..." type="text" name="search"/>
          <button onClick={fetchResult} className='rounded-md bg-sky-400 px-3 py-1 text-stone-50'>Search</button>
        </div>
      <div className='flex flex-col items-center bg-zinc-100 py-7 px-10'>
          <h1 className='ont-medium siz text-2xl'>{item.name}</h1>
          <img className='w-36' src={item.img}/>
          <div>
            <p className='text-sm'>{!item.species ? 'Type your pokemon 👀' : item.species}</p>
            <p className='text-sm'>{item.hp}</p>
            <p className='text-sm'>{item.attack}</p>
            <p className='text-sm'>{item.defense}</p>
            <p className='text-sm'>{item.speed}</p>
            <p className='text-sm'>{item.height}</p>
            <p className='text-sm'>{item.weight}</p>
            <p className='text-sm'>{item.type}</p>
          </div>
      </div>
    </div>
  );
};

export default App;