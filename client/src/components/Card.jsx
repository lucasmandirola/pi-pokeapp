import React from 'react';
import { Link } from "react-router-dom";
import style from './Card.module.css' 

export default function Card({id, image, name, types}){
  return(
    <div>
      <Link to={'/details/' + id} className={style.link}>
        <div className={style.container}>
            <img className={style.img} src= {image} alt= 'img not found' width= '200px' height='250px'/>
            {/* <Link className={style.name} to={'/details/' + id}> */}
                <h3 className={style.name}>{name.toUpperCase()}</h3>
            {/* </Link> */}
            {types?.map((t) => (
          <span key={t} className={style.types}>
            {"    "}
            {t.toUpperCase()}
          </span>
        ))}
        </div>
      </Link>
    </div>         
  )
}