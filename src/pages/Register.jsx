import React from 'react'
import styles from './styles.modules.css'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className="container_register">
        <div className='container_inputs'>
            <span>Registrar pessoa</span>

            <label from='nome'>Nome:</label>
            <input
                type='text'
                name='nome'
                id='nome'
            />

            <button><Link to='/registerface'>Foto</Link></button>
        </div>
    </div>
  )
}

export default Register