import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import type { StartPageType } from '../types';

import '../style/startpage.css';

function StartPage() {
  const [filmArr, setFilmArr] = useState<StartPageType[]>();
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
        {filmArr && filmArr.slice(((pageId % 10 || 10) - 1) * 25, (pageId % 10 || 10) * 25).map((film: StartPageType) => {
          return (
            <Link to={`/show/${film.id}`} key={film.id} className='top-blocks-block'>
              <img className='top-blocks-block-img' src={film.image ? film.image.medium : '/ShowFinder/img/stub.png'} alt="" />
              <h2 className='top-blocks-block-text'>{film.name}</h2>
            </Link>
          )
        })}
      </div>
      <div className='top-pages'>
        <Link className='top-pages-page' to={pageId > 2 ? `/${pageId - 2}` : ''}>{pageId > 2 ? `${pageId - 2}` : ' '}</Link>
        <Link className='top-pages-page' to={pageId > 1 ? `/${pageId - 1}` : ''}>{pageId > 1 ? `${pageId - 1}` : ' '}</Link>
        <Link className='top-pages-page' to={`/${pageId}`}>{pageId}</Link>
        <Link className='top-pages-page' to={`/${pageId + 1}`}>{pageId + 1}</Link>
        <Link className='top-pages-page' to={`/${pageId + 2}`}>{pageId + 2}</Link>
      </div>
    </section>
  )
}

export {StartPage};