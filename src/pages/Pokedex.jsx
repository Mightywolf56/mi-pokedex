import React from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from '../components/pokedex/PokemonCard'
import usePokedex from '../hooks/usePokedex'
import "./styles/Pokedex.css"


const Pokedex = () => {




  const nameTrainer = useSelector(store => store.nameTrainer)

  const {
    handleSubmit,
    handleChangeSelect,
    types,
    pokemonsInpage,
    handlePreviousPage,
    handleNextPage,
    pagesInBlock,
  } = usePokedex()




  return (
    <main style={{ maxWidth: "1400px", margin: "20px auto" }}>
      <p className='welcome'>
        <span className='welcome__Text'>Welcome {nameTrainer}
        </span>
        <span className='welcome__P'>, here you can find information about your pokemon
        </span>
      </p>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form__inputandbtn'>
          <input className='input' type="text" id='pokemonName' placeholder='  search your pokemon' />
          <button className='btn' >Search</button>
        </div>
        <select className='All' onChange={handleChangeSelect}>
          <option value="">All Pokemons</option>
          {
            types.map(type => <option key={type.url}>{type.name}</option>)
          }
        </select>
      </form>
      <section className='pokedex__pd'>
        {
          pokemonsInpage.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
        }
      </section>
      <section className='list'>
        <ul className='unlist'>
          <ul className='before'>
            <li className='before__center' onClick={handlePreviousPage}>{"<<"}</li>
          </ul>
          <li onClick={() => setCurrentPage(1)}>...</li>
          {
            pagesInBlock.map(page => <li className='numbers' onClick={() => setCurrentPage(page)} key={page}>{page}</li>)
          }
          <li onClick={() => setCurrentPage(lastPage)}>...</li>
          <ul className='after'>
            <li className='after__center' onClick={handleNextPage}>{">>"}</li>
          </ul>
        </ul>
      </section>
    </main>
  )
}

export default Pokedex