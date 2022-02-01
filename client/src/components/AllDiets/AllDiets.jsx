import React, { useEffect } from 'react'
import style from './AllDiets.module.css'
import {useDispatch, useSelector} from 'react-redux'
import { getDiets} from '../../actions/actions';
import Diet from '../Diet/Diet.jsx';
const AllDiets = () => { 
    //global state
    const stdiets = useSelector(state => state.diets); 
    //HOOKS 
     const dispatch = useDispatch();

     useEffect(()=> {  
         dispatch(getDiets())
     },[dispatch])    
    return(
        <div className={style.container}>
            <Diet key={"all"} name={"all"}/>
            {stdiets && stdiets.map((diet) => {
               return <Diet  key={diet.name} name={diet.name}/>
            } )}
        </div>
    ); 
}

export default AllDiets;