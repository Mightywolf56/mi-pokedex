import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from '../components/pokedex/PokemonCard'

const CopyPokedex = () => {

    const [pokemons, setPokemons] = useState([])
    const [pokemonsFilter, setPokemonsFilter] = useState([])
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
    
      const handleNextPage = () => {
        const nextPage = currentPage + 1
        if (nextPage > lastPage){
          setCurrentPage(1)
        }else {
          setCurrentPage(nextPage)
        }
      }
    
      const handlePreviousPage = () => {
        const newPage = currentPage - 1
        if (newPage < 1) {
          setCurrentPage(lastPage)
        } else {
          setCurrentPage(newPage)
        }
      }

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/${selectType ? `type/${selectType}/` : "pokemon/?limit=1279"}`
        axios.get(URL)
          .then((res) => {
            if (selectType) {
              const pokemonByType = res.data.pokemon.map(pokemon => {
                return {
                  name: pokemon.pokemon.name,
                  url: pokemon.pokemon.url
                }
              })
              setPokemons(pokemonByType)
            } else {
              setPokemons(res.data.results)
            }
          })
          .catch((err) => console.log(err))
      }, [selectType])
    
      useEffect(() => {
        const pokemonByName = pokemons.filter(pokemon => pokemon.name.includes(pokemonName.toLowerCase()))
        setPokemonsFilter(pokemonByName)
      }, [pokemonName, pokemons])
    
      useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/type/"
        axios.get(URL)
          .then((res) => setTypes(res.data.results))
          .catch((err) => console.log(err))
      }, [])
    
      useEffect(() => {
        setCurrentPage(1)
      }, [pokemons])

      const paginationLogic = () => {
        //cantidad de pokemon por pagina
        const pokemonsPerPage = 12;

        //pokemons que se van a mostrar en la pagina actual
        const sliceStart = (currentPage - 1) * pokemonsPerPage
        const sliceEnd = sliceStart + pokemonsPerPage
        const pokemonsInpage = pokemonsFilter.slice(sliceStart, sliceEnd)

        //ultima pagina
        const lastPage = Math.ceil(pokemonsFilter.length / pokemonsPerPage)

        //bloque actual
        const pagesPerBlock = 5
        const actualBlock = Math.ceil(currentPage / pagesPerBlock)

        //paginas que se van a mostrar en el bloque actual
        const pagesInBlock = []
        const minPage = (actualBlock * pagesPerBlock -pagesPerBlock) +1
        const maxPage = actualBlock * pagesPerBlock
        for(let i = minPage; i < maxPage; i++){
         if(i < lastPage){
            pagesInBlock.push(i)
         }
        }
        return {pagesInBlock, lastPage, pokemonsInpage}
      }

      const {pagesInBlock, lastPage, pokemonsInpage} = paginationLogic()



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

export default CopyPokedex