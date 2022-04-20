import { GET_POKEMONS, GET_NAMES, GET_DETAILS, GET_TYPES, CLEAN_DETAIL, POST_POKEMONS, FILTER_CREATION, DELETE_BY_ID, FILTER_TYPES, ORDER_BY_ATTACK, ORDER_BY_NAME, CLEAN_POKEMON, UPDATE_BY_ID } from "../actions";




const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  details: {},
	isLoading: true
}


function rootReducer (state = initialState, action){
	switch(action.type){

		case GET_POKEMONS:
			return {
				...state,
				pokemons: action.payload,
				allPokemons: action.payload,
				isLoading: false
			}

		case GET_TYPES:
			return{
				...state,
				types: action.payload
			}

		case FILTER_TYPES:
			const pokes = state.allPokemons

			const typesFilter = action.payload === 'all' 
			? pokes 
			: pokes.filter(p => p.types?.includes(action.payload))
			return {
				...state,
				pokemons: typesFilter
			}

		case FILTER_CREATION:
			const pokemonsOrigen = state.allPokemons;
      const createdFilter = action.payload === 'all' 
			? pokemonsOrigen
			: action.payload === "createdInDb" 
			? pokemonsOrigen.filter((e) => e.createdInDb) 
			: pokemonsOrigen.filter((e) => !e.createdInDb)
      return {
        ...state,
        pokemons: createdFilter,
      };
		
		case ORDER_BY_NAME:
			const sortedArr = action.payload === 'all'
			? state.pokemons 
			:	action.payload === 'asc'
			? state.pokemons.sort((a, b) => a.name.localeCompare(b.name)) 
			: state.pokemons.sort((a, b) => b.name.localeCompare(a.name))
			return {
				...state,
				pokemons: sortedArr
			}

		case ORDER_BY_ATTACK:
			const sort = action.payload === 'all'
			? state.pokemons 
			:	action.payload === 'des'
			? state.pokemons.sort((a, b) => a.attack - b.attack) 
			: state.pokemons.sort((a, b) => b.attack - a.attack)
			return {
				...state,
				pokemons: sort
			}

		case GET_NAMES:
			return {
				...state,
				pokemons: action.payload,
				isLoading: false
			}

		case POST_POKEMONS:
			return {
				...state,
			}
		
		case GET_DETAILS:
			return {
				...state,
				details: action.payload
			}
		
		case CLEAN_DETAIL:
      return {
      	...state,
      	details: {},
    };

		case DELETE_BY_ID:
			return {
				...state,
			}

		case CLEAN_POKEMON:
			return {
				...state,
				isLoading: true
			}

		case UPDATE_BY_ID:
			return {
				...state,
				details: action.payload,
				isLoading: true
			}

		default:
			return state
	}
}

export default rootReducer;