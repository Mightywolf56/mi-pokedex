import React from 'react'
import { useDispatch } from 'react-redux'

const Header = () => {

    const dispatch = useDispatch()

    const handleClickLogOut = () => {
        dispatch(logOut())
    }

  return (
    <header>
        <div>
            <div>
                <img src="/Image/pokemon.png" alt="" />
            </div>
        </div>
        <dir>
            <div>
                <button onClick={handleClickLogOut}>Log out</button>
            </div>
        </dir>
    </header>
  )
}

export default Header