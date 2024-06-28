import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import  cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';


const TitleCards = ({title,category}) => {

    const cardsRef = useRef();
    const [apiData,setApiData] = useState([]);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjU3YjdkODk0YjQ2OGEwNjM1ZmFiNDQ5YzFkODkxMiIsIm5iZiI6MTcxOTE1MTU1My4wMzI4NTgsInN1YiI6IjY2NzgyYWUwZWM1NWJhNDc1ZGNlOWU0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WArdeMLjSJF2bsla7ZGQXc2VsN6PLZdl8I3oPceks_0'
      }
    };
    
    

    const handleWheel = (event) =>{
        event.preventDefault;
        cardsRef.current.scrollLeft +=event.deltaY;
    }

    useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));
        cardsRef.current.addEventListener('wheel',handleWheel)
    },[])



  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card,index)=>{
            return <Link to={`/player/${card.id}`} className='card' key={index}>
                <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=""/>
                <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
