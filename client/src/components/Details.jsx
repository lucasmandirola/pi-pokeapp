import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cleanDetail, getDetail, cleanPoke, deleteById } from "../redux/actions";
import style from './Details.module.css';
import loading from './Imgs/loadingpokebola2.gif'



export default function Details(props){
  const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()
	// const detail = useSelector((state) => state.details)

  useEffect(() => {
		dispatch(cleanDetail)
		dispatch(getDetail(id))
	}, [id, dispatch])

	const poke = useSelector((state) => state.details)
	// console.log(poke.name)

	function handleClick(e){
		dispatch(cleanDetail())
		dispatch(cleanPoke())
		navigate('/home')
		// console.log(detail)
	}

	function handleDelete(){
		dispatch(cleanPoke())
		if(poke.createdInDb){ 
			const sure = window.confirm('Estas seguro de eliminar este pokemon?');
			if(sure) {
				dispatch(deleteById(id))
				alert('Pokemon eliminado correctamente')
				navigate('/home')
			}
		}
		else alert('No se puede eliminar un pokemon original')
	}

	function handleUpdate(){
		if(poke.createdInDb){
			navigate(`/update/${id}`)
		}
		else{
			alert('No se puede modificar un pokemon original')
		}
	}

	return(
		<div className={style.details}>
			{/* <Link to='/home' className={style.buttondiv}> */}
				<button onClick={() => handleClick()} className={style.button}>Volver</button>
			{/* </Link> */}
			
			<div className={style.pokeDetail}>
			{poke.name ? (
        <div>
          <div><h1 className={style.name}>{poke.name}</h1> </div>
        	<div >
          	<img className={style.image} src={poke.image} alt={poke.name} width='200px' height='250px' />
          	<div >
          		<h3 className={style.types}>Tipos: {poke.types?.map((e)=>(
          		  <span key={e}> 👉{e}</span>
          		))}
							</h3>
							<div className={style.stats}>
								<label>ID: </label> <span className={style.idNumber}>{poke.id.length > 4 ? poke.id.slice(0,5)+'...' : poke.id}</span><br/>
								<div className={style.leftStats}>
									<div>
           					<label>Vida: </label> <span className={style.statsNumber}>{poke.hp}</span><br/>
          					<label>Fuerza: </label> <span className={style.statsNumber}>{poke.attack}</span><br/>
          					<label>Defensa: </label> <span className={style.statsNumber}>{poke.defense}</span><br/>
									</div>
								</div>
								<div className={style.rightStats}>
          				<label>Velocidad: </label><span className={style.statsNumber}>{poke.speed}</span><br/>
          				<label>Altura: </label><span className={style.statsNumber}>{poke.height}</span><br/>
          				<label>Peso: </label><span className={style.statsNumber}>{poke.weight}</span>
								</div>
          		</div>
						</div>
        	</div> 
					<div className={style.buttonContains}>
						<button onClick={() => handleDelete()} className={style.deleteButton}>Eliminar</	button>
								
						<button className={style.deleteButton} onClick={() => handleUpdate()}	>Modificar</button>
					</div>
					
        </div>) : (<img className={style.loader} src={loading} alt='Cargando...' width='100px' height='130px'/>)
      }
			</div>
		</div>
	)
}