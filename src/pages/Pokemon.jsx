import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Pokemon = () => {

    const [pokemon, setPokemon] = useState()

    const {id} = useParams()
    
    const getPercentBar = () => {
        const percent = (stat * 100) / 150
        return `${percent}%`
    }

    useEffect (() => {
        const URL = `https://pokeapi.com/api/v2/pokemon/${id}/`
        axios.get(URL)
        .then((res) => setPokemon(res.data))
        .catch((err) => console.log(err))

    },[])



    return (
        <main>
            {/* Parte superior*/}
            <section>
                <section>
                    <div>
                        <img src={pokemon?.sprites.other["official_artwork"].front_default} alt="" />
                    </div>
                </section>
            </section>

            {/* body*/}
            <section>
                <h2>#{pokemon?.id}</h2>
                <h2>{pokemon?.name}</h2>
                <div>
                    <div>
                        <h5>weight</h5>
                        <h4>{pokemon?.weight}</h4>
                        <div>
                            <h5>height</h5>
                            <h4>{pokemon?.height}</h4>

                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h3>Type</h3>
                        <div>
                            {
                                pokemon?.types.map((type) => (
                                <div key={type.type.name}>
                                    <span>{type.type.name}</span>
                                </div>
                                    ))
                            }
                            
                            <div><span>{pokemon?.types[0].type.name}</span></div>
                            <dir><span>venenoso</span></dir>
                        </div>
                    </div>
                    <div>
                        <h3>Abilities</h3>
                        <div>
                            {
                                pokemon?.abilities.map((ability) => (
                                <div key={ability.ability.name}>
                                    <span>{ability.ability.name}</span>
                                </div>

                            ))}


                        </div>
                    </div>
                </div>

            {/* stats*/}
                <section className='pokemon__stats'>
                    <h2 className='pokemon__stats-title'>stats</h2>
                    <section className='pokemon__stats-info'>
                    {
                        pokemon?.stats.map(stat => (
                        <article className='pokemon__stats' key={stat.stat.name}>
                            <div className='pokemon__stat-header'>
                                <h4 className='pokemon__stat-name'>{stat.stat.name}</h4>
                                <h5 className='pokemon__stat-value'>{stat.base_stat}/255</h5>
                            </div>
                            <div className='pokemon__stat-bar'>
                                <div className='pokemon__stat-barGray'>
                                    <div className='pokemon__stat-barProgress' style={{width: getPercentBar(stat.base_stat)}}></div>
                                </div>
                            </div>
                        </article>
                        ))
                    }
                    </section>
                </section>
            </section>
        </main>
    )
}

export default Pokemon