import axios from 'axios';
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_NAMES = "GET_NAMES";
export const GET_DETAILS = "GET_DETAILS";
export const GET_TYPES = "GET_TYPES";
export const POST_POKEMONS = "POST_POKEMONS";
export const FILTER_TYPES = "FILTER_TYPES";
export const FILTER_CREATION = "FILTER_CREATION";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const CLEAN_DETAIL = "CLEAN_DETAIL"
export const CLEAN_POKEMON = 'CLEAN_POKEMON'
export const DELETE_BY_ID = 'DELETE_BY_ID';
export const UPDATE_BY_ID = 'UPDATE_BY_ID'
const URLBack = 'http://localhost:3001'




export function getPokemons() {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${URLBack}/pokemons`);
      return dispatch({
        type: GET_POKEMONS,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getTypes(){
  return async function(dispatch){
    try {
      const json = await axios.get(`${URLBack}/types`);
      return dispatch({
        type: GET_TYPES,
        payload: json.data
      })
    }
    catch(err) {
      console.log(err)
    }
  }
}

export function filterPokesByType(payload){
  return {
    type: FILTER_TYPES,
    payload
  }
}

export function filterByCreate(payload){
  return {
    type: FILTER_CREATION,
    payload
  }
}

export function orderByName(payload){
  return {
    type: ORDER_BY_NAME,
    payload
  }
}

export function orderByAttack(payload){
  return {
    type: ORDER_BY_ATTACK,
    payload
  }
}

export function getName(name){
  return async function (dispatch){
    try {
      var json = await axios.get(`${URLBack}/pokemons?name=${name}`)
      return dispatch ({
        type: GET_NAMES,
        payload: json.data
      })
    }
    catch(err){
      console.log(err)
    }
  }
}

export function postPokemon(payload){
  return async function(dispatch){
    const json = await axios.post(`${URLBack}/pokemons`, payload)
    return json 
  }
}

export function getDetail(id){
    return async function(dispatch){
      try{
        const json = await axios.get(`${URLBack}/pokemons/${id}`)
        return dispatch({
          type: GET_DETAILS,
          payload: json.data
        })
      }
      catch(err){
        console.log(err)
      }
    }
}

export function cleanDetail() {
  return {
    type: CLEAN_DETAIL,
    payload: {},
  };
}

export function cleanPoke(){
  return{
    type: CLEAN_POKEMON,
    payload: {}
  }
}

export function deleteById (id) {
  return async function (dispatch){
    try {
      const json = await axios.delete(`${URLBack}/delete/${id}`)
      return dispatch({
        type: DELETE_BY_ID,
        payload: json.data
      })
    }catch(err) {
      console.log(err)
    }
  }
}

export function update(id, payload){
  return async function (dispatch){
    try{
      const json = await axios.put(`${URLBack}/update/${id}`, payload)
      return dispatch({
        type: UPDATE_BY_ID,
        payload: json.data
      })
    }
    catch(err){
      console.log(err)
    }
  }
}