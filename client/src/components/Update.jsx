import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { update, getTypes, getPokemons, cleanPoke, getDetail } from "../redux/actions";
import style from './Create.module.css';

export default function Update(){
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const allPokes = useSelector((state) => state.allPokemons)
  const types = useSelector((state) => state.types)
  const uuid = id

  useEffect(() => {
    dispatch(getTypes())
		dispatch(getDetail(id))
    dispatch(getPokemons())
	}, [id, dispatch])

  const poke = useSelector((state) => state.details)
  const [input, setInput] = useState({
    name: poke.name,
    image: poke.image,
    hp: poke.hp,
    attack: poke.attack,
    defense: poke.defense,
    speed: poke.speed,
    height: poke.height,
    weight: poke.weight,
    types: poke.types
  })

  function validate(input){
		let errors = {}

		if(!input.name || input.name.length > 12 || ! /^[a-z]+$/.test(input.name)) errors.name = 'El campo "nombre" es obligatorio, solo debe contener letras y debe tener menos de 12 caracteres'
		if(input.hp > 200 || input.hp < 0) errors.hp = 'El campo "vida" es obligatorio y debe tener en 0 y 200 puntos'
		if(input.attack > 200 || input.attack < 0) errors.attack = 'El campo "fuerza" es obligatorio y debe tener en 0 y 200 puntos'
		if(input.defense > 200 || input.defense < 0) errors.defense = 'El campo "defensa" es obligatorio y debe tener en 0 y 200 puntos'
		if(input.speed > 200 || input.speed < 0) errors.speed = 'El campo "velocidad" es obligatorio y debe tener en 0 y 200 puntos'
		if(input.height > 200 || input.height < 0) errors.height = 'El campo "altura" es obligatorio y debe tener en 0 y 200 puntos'
		if(input.weight > 200 || input.weight < 0) errors.weight = 'El campo "peso" es obligatorio y debe tener en 0 y 200 puntos'
		if(input.types.length === 0) errors.types = 'El campo "tipos" es obligatorio y pueden ser máximo 2'
		return errors
	}

  function handleChange(e){
		setErrors(validate({
			...input,
			[e.target.name]: e.target.value.toLowerCase()
		}))
		setInput({
			...input,
			[e.target.name] : e.target.value.toLowerCase()
		})
	}

  function handleSelect(e){
		setErrors(validate({
			...input,
			types: e.target.value.toLowerCase()
		}))
		if(e.target.value === input.types[0] && input.types.length < 2) alert('No se puede seleccionar el mismo tipo 2 veces')
		else if (input.types.length < 2) {
			setInput({
				...input,
				types: [...input.types, e.target.value]
			})
      console.log(input.types)
		}
		else{
			alert('El campo "tipos" puede ser máximo 2')
		}
    // alert('El campo "tipos" no es modificable')
	}

  function handleBack() {
		dispatch(cleanPoke())
    navigate(`/details/${id}`)
	}

  function handleSubmit(e){
		e.preventDefault()
    const sure = window.confirm('Estas seguro de modificar este pokemon?');
    if(sure){
		  dispatch(cleanPoke())
			setErrors({})
			dispatch(update(uuid, input))
			alert('Felicitaciones! Tu pokemon se actualizó correctamente')
			setInput({
				name: '',
				image: '',
				hp: 0,
				attack: 0,
				defense: 0,
				speed: 0,
				height: 0,
				weight: 0,
				types: []
			})
			navigate(`/details/${id}`)
      // navigate(`/home`)
  }
	}

	function handleDelete(el){
		setErrors(validate({
			...input,
			types: input.types.filter((e) => e !== el)
		}))
		setInput({
			...input,
			types: input.types.filter(t => t !== el)
		})

	}

  return (
    <div className={style.create}>
      <button onClick={() => handleBack()} className={style.buttonHome}>Volver</button>
			<div className={style.containerFather}>
      <h1 className={style.title}>Actualiza tu Pokemon!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={style.container}>
          <div className={style.name}>
						<label className={style.label}>*Nombre: </label>
						<input type='text' className={style.inputName} value={input.name} name='name' onChange={(e) => handleChange(e)}/>
						<p>{errors.name}</p>
					</div>
					{/* <div className={style.leftStats}>
        		<div className={style.hp}>
							<label className={style.label}>Vida: </label>
							<input className={style.inputNumber} type='number' value={input.hp} name='hp' onChange={(e) => handleChange(e)}/>
							<p>{errors.hp}</p>
						</div>

        		<div  className={style.attack}>
							<label className={style.label}>Fuerza: </label>
							<input className={style.inputNumber} type='number' value={input.attack} name='attack' onChange={(e) => handleChange(e)}/>
							<p>{errors.attack}</p>
						</div>

        		<div className={style.defense}>
							<label className={style.label}>Defensa: </label>
							<input className={style.inputNumber} type='number' value={input.defense} name='defense' onChange={(e) => handleChange(e)}/>
							<p>{errors.defense}</p>
						</div>
					</div>
					<div className={style.rightStats}>
        		<div className={style.speed}>
							<label className={style.label}>Velocidad: </label>
							<input className={style.inputNumber} type='number' value={input.speed} name='speed' onChange={(e) => handleChange(e)}/>
							<p>{errors.speed}</p>
						</div>

        		<div className={style.height}>
							<label className={style.label}>Altura: </label>
							<input className={style.inputNumber} type='number' value={input.height} name='height' onChange={(e) => handleChange(e)}/>
							<p>{errors.height}</p>
						</div>

        		<div className={style.weight}>
							<label className={style.label}>Peso: </label>
							<input className={style.inputNumber} type='number' value={input.weight} name='weight' onChange={(e) => handleChange(e)}/>
							<p>{errors.weight}</p>
						</div>
					</div> */}

<div className={style.stats}>
        		<div className={style.hp}>
							<label className={style.label}>Vida: </label>
							<input className={style.inputNumber} type='number' value={input.hp} name='hp' onChange={(e) => handleChange(e)}/>
							<input type='range' value={input.hp} name='hp' onChange={(e) => handleChange(e)} min='0' max='200' step='1' className={style.fields}></input>
							<p>{errors.hp}</p>
						</div>

        		<div  className={style.attack}>
							<label className={style.label}>Fuerza: </label>
							<input className={style.inputNumber} type='number' value={input.attack} name='attack' onChange={(e) => handleChange(e)}/>
							<input type='range' value={input.attack} name='attack' onChange={(e) => handleChange(e)} min='0' max='200' step='1' className={style.fields}></input>
							<p>{errors.attack}</p>
						</div>

        		<div className={style.defense}>
							<label className={style.label}>Defensa: </label>
							<input className={style.inputNumber} type='number' value={input.defense} name='defense' onChange={(e) => handleChange(e)}/>
							<input type='range' value={input.defense} name='defense' onChange={(e) => handleChange(e)} min='0' max='200' step='1' className={style.fields}></input>
							<p>{errors.defense}</p>
						</div>
					{/* </div> */}
					{/* <div className={style.rightStats}> */}
        		<div className={style.speed}>
							<label className={style.label}>Velocidad: </label>
							<input className={style.inputNumber} type='number' value={input.speed} name='speed' onChange={(e) => handleChange(e)}/>
							<input type='range' value={input.speed} name='speed' onChange={(e) => handleChange(e)} min='0' max='200' step='1' className={style.fields}></input>
							<p>{errors.speed}</p>
						</div>

        		<div className={style.height}>
							<label className={style.label}>Altura: </label>
							<input className={style.inputNumber} type='number' value={input.height} name='height' onChange={(e) => handleChange(e)}/>
							<input type='range' value={input.height} name='height' onChange={(e) => handleChange(e)} min='0' max='200' step='1' className={style.fields}></input>
							<p>{errors.height}</p>
						</div>

        		<div className={style.weight}>
							<label className={style.label}>Peso: </label>
							<input className={style.inputNumber} type='number' value={input.weight} name='weight' onChange={(e) => handleChange(e)}/>
							<input type='range' value={input.weight} name='weight' onChange={(e) => handleChange(e)} min='0' max='200' step='1' className={style.fields}></input>
							<p>{errors.weight}</p>
						</div>
					</div>
					<div className={style.image}>
						<label className={style.labelIMG}>URL de la imagen: </label>
						<input type='url' className={style.inputImage} value={input.image} name='image' onChange={(e) => handleChange(e)}/>
					</div>

					<div className={style.types}><label className={style.label}>Tipos: </label>
						<select className={style.selectTypes} onChange={(e) => handleSelect(e)} value='disabled'>
							{types?.map((e) => (
								<option key={e} value={e}>{e}</option>
							))}
						</select>
						<p>{errors.types}</p>
					</div>
					<div className={style.typeSelected}>
					{input.types.map((e) => (
						<div key={e}>
							<label className={style.labelTypes}>👉{e.charAt(0).toUpperCase() + e.slice(1)}</label><button className={style.typeButton} onClick={() => handleDelete(e)}>x</button>
						</div>
					))}
					</div>
					<button type='submit' disabled={errors.name || input.name === '' || errors.hp || errors.attack || errors.defense || errors.speed || errors.height || errors.weight || errors.types? true : false} className={style.buttonCreate}>Modificar pokemon</button>
      	</div>
      </form>
			</div>

    </div>
    )



}