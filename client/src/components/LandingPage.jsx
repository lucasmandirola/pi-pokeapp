import React from 'react';
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css'

export default function LandingPage(){
    return (
        <div className={style.landing}>
            <h1 className={style.welcome}>Bienvenido a la PokeApp!</h1>
            <Link className={style.link} to='/home'>
                <button className={style.button}>Ingresar</button>
            </Link>
        </div>
    )
}