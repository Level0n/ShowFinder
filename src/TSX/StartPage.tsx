import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import '../style/startpage.css';

function StartPage() {
  const [filmArr, setFilmArr] = useState<any>(null); //поменять any на что-то другое
  const pageId = +(useParams<string>().pageId || '1');

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows?page=${Math.floor(pageId / 10)}`)
    .then(response => {
      if (!response.ok) throw new Error('Ошибка подключения'); 
      return response.json();
    })
    .then(data => {setFilmArr(data)})

    return;
  }, [pageId]);

  return (
    <section className='top'>
      <div className='top-blocks'>
        {filmArr && filmArr.slice((pageId % 10 - 1) * 25, pageId % 10 * 25).map((film: any) => {
          return (
            <Link to={`/show/${film.id}`} key={film.id} className='top-blocks-block'>
              <img className='top-blocks-block-img' src={film.image.medium} alt="" />
              <h2 className='top-blocks-block-text'>{film.name}</h2>
            </Link>
          )
        })}
      </div>
      <div>
        <Link to={'/1'}>1</Link>
        <Link to={'/2'}>2</Link>
      </div>
    </section>
  )
}

export {StartPage};