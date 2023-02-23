/*import { current } from '@reduxjs/toolkit'*/
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from '../components/Pokedex/PokemonCard'

const Pokedex = () => {

  const [pokemons, setPokemons] = useState([])
  const [pokemonsFilter, setPokemonsFilter] = useState("")
  const [types, setTypes] = useState([])
  const [selectType, setSelectType] = useState("")
  const [pokemonName, setPokemonName] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  
  const nameTrainer = useSelector(store => store.nameTrainer)
  
  const handleChangeSelect = (e) => {
    setSelectType(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value)
  }

  const paginationLogic = () => {
    //cantidad de pokemons por pagina
    const pokemonPerPage = 12;

    //pokemons que se van a mostrar en la pagina actual
    const sliceStart = (currentPage +1 ) * pokemonPerPage
    const sliceEnds = sliceStart + pokemonPerPage
    const pokemonInPage = pokemonsFilter.slice(sliceStart, sliceEnds)

    // ultima pagina
    const lastPage = Math.ceil(pokemonsFilter.lenght / pokemonPerPage)

    //bloque actual
    const pagesPerBlock = 5
    const actualBlock = Math.ceil( currentPage / pagesPerBLock)

    //paginas que se van a mostrar en el bloque actual
    const pagesInBlock = []
    const minPage = (actualBlock * pagesPerBlock - pagesPerBlock) +1
    const maxPage = actualBlock * pagesPerBlock
    for(let i = minPage; i < maxPage; i++){
      if(i < lastPage) {
        pagesInBlock.push(i)
      }
    }

      return {pagesInBlock, lastPage, pokemonInPage}
  }

  const {pagesInBlock, lastPage, pokemonInPage} = paginationLogic()
  
  const handlePreviousPage = () => {
    const newPage = currentPage - 1
    if(newPage < 1) {
      setCurrentPage(lastPage)
    }else {
      setCurrentPage(newPage)
    }
  }

  const handleNextPage = () => {
    const newPage = currentPage + 1
    if(newPage > lastPage){
      setCurrentPage(1)
    }else {
      setCurrentPage(newPage)
    }
  }


  useEffect (() => {
    const URL = `https://pokeapi.co/api/v2/${selectType ? `type/${selectType}/` : "pokemon/?limit=20"} `
    axios.get(URL)
    .then((res) => {
      if(selectType) {
        const pokemonByType = res.data.pokemon.map(pokemon => {
          return {
            name: pokemon.pokemon.name,
            url: pokemon.pokemon.url,

          }
        })
        setPokemons(pokemonByType)
      }else{
        setPokemons(res.data.results)
      }
    })
    .catch((err) => console.log(err))

  }, [selectType])

  useEffect(() => {
    const pokemonByName = pokemons.filter(pokemon => pokemon.name.includes(pokemonName.toLowerCase()))
      setPokemonsFilter(pokemonByName)
    
  }, [pokemonName, pokemons])
  

  useEffect (() => {
    const URL = "https://pokeapi.co/api/v2/type/"
    axios.get(URL)
    .then((res) => setTypes(res.data.result))
    .catch((err) => console.log(err))

  },[])

  useEffect(() => {
    setCurrentPage(1)
  }, [pokemons])

  return (
    <main style={{maxWidth: "1486px", margin: "20px auto"}}>
      <p>Welcome {nameTrainer}, here you can find your favorite Pokemon</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" id='pokemonName' placeholder='search your pokemon' />
          <button>Search</button>
        </div>
        <select onChange={handleChangeSelect}>
          <option value="">All</option>
          {
            types.map (type => <option key={type.url}>{type.name}</option> )
          }
        </select>
      </form>
      <section style={{display: flex, flexWrap: wrap, gap: "20px", justifyContent: center}}>
        {
          pokemonInPage.map(pokemon => <PokemonCard  key={pokemon.url} pokemonUrl={pokemon.url}/>)
        }
      </section>
      <section>
        <ul>
          <li onClick={handlePreviousPage}>{"<<"}</li>
          <li onClick={setCurrentPage(1)}>...</li>
        {
          pagesInBlock.map(page => <li onClick={() => setCurrentPage(page)} key={page}>{page}</li>)
        }
        <li onClick={() => setCurrentPage(lastPage)}>...</li>
        <li onClick={handleNextPage}>{">>"}</li>
        </ul>
      </section>
    </main>
  )
}

export default Pokedex