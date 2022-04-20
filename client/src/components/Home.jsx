import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, filterPokesByType, getTypes, filterByCreate, orderByName, orderByAttack, cleanDetail, cleanPoke } from "../redux/actions";
import {Link} from 'react-router-dom'
import Card from "./Card";
import Paginado from "./Pagination";
import SearchBar from "./SearchBar";
import style from './Home.module.css';
import icono from './Imgs/pokemon.png'
import loading from './Imgs/loadingpokebola2.gif';
import Footer from './Footer'

export default function Home(){
  const dispatch = useDispatch();

	const allPokes = useSelector((state) => state.pokemons); 
	const types = useSelector((state) => state.types);
	const load = useSelector((state) => state.isLoading) 
	const [orden, setOrden] = useState('')

	// Paginado
	const [currentPage, setCurrentPage] = useState(1);
	const pokesPerPage = 12
	const indexOfLastPoke = currentPage * pokesPerPage;
	const indexOfFirstPoke = indexOfLastPoke - pokesPerPage;
	const currentPokes = allPokes.slice(indexOfFirstPoke, indexOfLastPoke);
	function paginado(pageNumber){
		setCurrentPage(pageNumber)
	}

	useEffect(() => {
		dispatch(getPokemons())
		dispatch(getTypes())
		dispatch(cleanDetail())
	}, [dispatch]) 

	function handleClick(e){
		e.preventDefault()
		dispatch(cleanPoke())
		setCurrentPage(1)
		dispatch(getPokemons())
	}

	function handleFilterType(e){
		e.preventDefault()
		dispatch(filterPokesByType(e.target.value))
		setCurrentPage(1)
	}

	function handleFilterCreate(e){
		e.preventDefault()
		dispatch(filterByCreate(e.target.value))
		setCurrentPage(1)
	}

	function handleOrderByName(e){
		e.preventDefault()
		dispatch(orderByName(e.target.value))
		setCurrentPage(1)
		setOrden(`Ordenado ${e.target.value}`)
	}

	function handleOrderByAttack(e){
		e.preventDefault()
		dispatch(orderByAttack(e.target.value))
		setCurrentPage(1)
		setOrden(`Ordenado ${e.target.value}`)
	}

	return (
		<>
		<div className={style.father}>
			<div className={style.navbar}>
				<h1 className={style.title}><Link to='/'><img src={icono} alt='Icono' width='120px' height='40px'/></Link></h1>
				<Link className={style.link} to='/create'><button className={style.buttonCreate}>Crear Pokemon</button></Link>
				<button className={style.reCharge} onClick={ e => {handleClick(e)} }>Volver a cargar</button>
				<SearchBar />
			</div>
			<div className={style.container}>
				<div>
					<div className={style.divOrderAndFilter}>
						<select onChange={(e) => handleOrderByName(e)} className={style.orderAndFilter}>
							<option value= "all">Ordenar por Nombre</option>
							<option value="asc">A-Z</option>
							<option value="des">Z-A</option>
						</select>

						<select onChange={(e) => handleOrderByAttack(e)} className={style.orderAndFilter}>
							<option value= "all">Ordenar por Fuerza</option>
							<option value="asc">Más fuerte</option>
							<option value="des">Menos fuerte</option>
						</select>
					{/* </div> */}
					{/* <div className={style.filter}> */}
						<select onChange={(e) => handleFilterType(e)} className={style.orderAndFilter}>
							<option value='all'>Filtrar por Tipos</option>
							{types?.map((e) => (
								<option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>
							))}
						</select>

						<select onChange={(e) => handleFilterCreate(e)} className={style.orderAndFilter}>
							<option value= 'all'>Filtrar por Origen</option>
							<option value="api">Existentes</option>
							<option value="createdInDb">Creados</option>
						</select>
					</div>

					{/* <Paginado
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					pokesPerPage={pokesPerPage}
					allPokes={allPokes.length}
					paginado={paginado}
					/> */}

					{load ? null : 
					(<Paginado
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					pokesPerPage={pokesPerPage}
					allPokes={allPokes.length}
					paginado={paginado}
					/>)}
				</div>

				{load ? (
					<img className={style.loader} src={loading} alt='Cargando...' width='100px' height='130px'/>
					// <h1 className={style.charging}>Cargando...</h1>
				): !allPokes.length? 
				(<div><h1 className={style.notFound}>No se han encontrado pokemons</h1><img className={style.notFounGif} src={'https://c.tenor.com/pAob-LXVq30AAAAi/sleepy-pikachu.gif'} alt='Pokemon not found' width='498px' height='379px'/></div>) :
				// 'https://c.tenor.com/5r0DYyceZ8QAAAAi/pikachu-fire.gif'
				// (<h1 className={style.notFound}>No se han encontrado pokemons</h1>) :
					<div className={style.cards}>{
						currentPokes?.map(el=>{
							return(
									<Card key={el.id} id={el.id} name={el.name} types={el.types} image={el.image}/>
							)
						})
						}
					</div>
				}			

				{/* <div className={style.paginado}>
					<Paginado
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						pokesPerPage={pokesPerPage}
						allPokes={allPokes.length}
						paginado={paginado}
					/>
				</div> */}
			</div>
			
		</div>
		<Footer/>
		</>
	)
}