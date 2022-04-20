import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName, cleanPoke } from "../redux/actions";
import style from './SearchBar.module.css';

export default function SearchBar(){
  	const dispatch = useDispatch()
	const [name, setName] = useState('')

	function handleInputChange(e){
		e.preventDefault()
		setName(e.target.value)
	}

	// function handleSubmit(e){
	// 	e.preventDefault()
	// 	if(name){
	// 	dispatch(getName(name.toLowerCase()))
	// 	setName('')
	// 	}

	// }

	function handleClick(e){
		e.preventDefault()
		dispatch(cleanPoke())
		dispatch(getName(name.toLowerCase()))
		setName('')
	}

	return (
		<div className={style.divBar}>
			<input className={style.input} type='text' placeholder="Buscar por nombre..." value={name} onChange={(e) => handleInputChange(e)}/>
			<button className={style.button} type='button' onClick={handleClick}>Buscar</button>
		</div>
	)
}