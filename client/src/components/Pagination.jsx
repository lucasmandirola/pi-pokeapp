import React from "react";
import style from './Pagination.module.css'



export default function Paginado({currentPage, setCurrentPage, pokesPerPage, allPokes, paginado}){
  
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(allPokes/pokesPerPage); i++){
    pageNumbers.push(i)
  }

  const max = allPokes/pokesPerPage

  function prevPage(){
    setCurrentPage(currentPage - 1)
  }

  function nextPage(){
    setCurrentPage(currentPage + 1)
  }

  return (
    <div className={style.container}>
      <button className={style.flechas} disabled={currentPage === 1 || currentPage < 1} onClick={prevPage}>{'<'}</button>
      {pageNumbers &&
      pageNumbers.map(number => (
        <button key={number} onClick={() => paginado(number)} className={currentPage === number ? style.pagActive : style.pagDesactive}>{number}</button>
      ))}
      {/* <button className={style.pagDesactive}>{currentPage}</button>
      <p className={style.text}> - </p>
      <button className={style.pagDesactive}>{pageNumbers.length}</button> */}
      <button className={style.flechas} disabled={currentPage === Math.ceil(max) || currentPage > Math.ceil(max)} onClick={nextPage}>{'>'}</button>
    </div>
  )
}