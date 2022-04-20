import React from "react";
import linkedin from './Imgs/linkedin.png';
import github from './Imgs/github.png';
import style from './Footer.module.css'

export default function Footer(){
  return(
    <div className={style.footer}>
      <p className={style.title}>COPYRIGHT LUCAS MANDIROLA - 2022.</p>
      <a href="https://www.linkedin.com/in/lucasmandirola/" rel="noreferrer" target='_blank'><img alt='lkdn' src={linkedin} className={style.linkedin}/></a>
      <a href="https://github.com/lucasmandirola/PI-Pokemon" rel="noreferrer"  target='_blank'><img alt='github' src={github} className={style.github}/></a>
    </div>
  )
}