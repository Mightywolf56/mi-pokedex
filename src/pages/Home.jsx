import React from 'react'
import { useDispatch } from 'react-redux';
import { setNameTrainerGlobal } from '../store/slices/nameTrainer.slice';
import "./styles/Home.css"


const Home = () => {

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
    const nameTrainer = e.target.nameTrainer.value;
        dispatch(setNameTrainerGlobal(nameTrainer))
    
    }

  return (
    <main className='home__container'>
        <div className='home__container-img'>
            <img className='home__img' src="/Image/pokemon.png" alt="" />
        </div>
        <h2 className='home__title'>Hello trainer</h2>
        <p className='home__parra'>Give me your name to star</p>
        <form className='home__form-container' onSubmit={() => handleSubmit}>
            <input 
            required 
            id='nameTrainer' 
            type="text" 
            placeholder='your name...'/>
            <button className='home__btn-start'>Start</button>
        </form>
    </main>
  )
}

export default Home