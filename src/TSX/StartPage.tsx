import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import '../style/startpage.css';

function StartPage() {
  const [startPage, setStartPage] = useState<any>(null); //поменять any на что-то другое

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows?page=0`)
    .then(response => {
      if (!response.ok) throw new Error('Ошибка подключения'); 
      return response.json();
    })
    .then(data => setStartPage(data))

    return;
  }, []);

  return (
    <section className='top'>
      <div className='top-blocks'>
        {startPage && startPage.map((film: any) => {
          return (
            <Link to={`show/${film.id}`} key={film.id} className='top-blocks-block'>
              <img className='top-blocks-block-img' src={film.image.medium} alt="" />
              <h2 className='top-blocks-block-text'>{film.name}</h2>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export {StartPage};