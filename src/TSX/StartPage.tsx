import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import type { StartPageType } from '../types';

import '../style/startpage.css';
import { ErrorPage } from './ErrorPage';

function StartPage() {
  const [filmArr, setFilmArr] = useState<StartPageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string>('');

  const id = useParams<string>().pageId;
  let pageId = 1;
  if (id) pageId = Number(id);

  useEffect(() => {
    if (!Number.isInteger(pageId) || pageId <= 0) return;

    setIsLoading(true);
    setIsError('');
    setFilmArr([]);

    fetch(`https://api.tvmaze.com/shows?page=${Math.floor((pageId - 1) / 10)}`)
    .then(response => {
      if (!response.ok) throw new Error('Error connection'); 
      return response.json();
    })
    .then((data: StartPageType[]) => {
      setFilmArr(data);
    })
    .catch((error: unknown) => {
      if (error instanceof Error) setIsError(error.message);
      else setIsError('Unknown error')
    })
    .finally(() => setIsLoading(false));
  }, [pageId]);

  if (!Number.isInteger(pageId) || pageId <= 0) return <ErrorPage />;

  if (isLoading) return <section className='top text-top'>Loading...</section>;
  if (isError) return <section className='top text-top'>{isError}</section>;
  if (filmArr.length === 0) return <section className='top text-top'>Nothing found</section>;

  return (
    <section className='top'>
      <div className='top-blocks'>
        {filmArr.slice(((pageId % 10 || 10) - 1) * 25, (pageId % 10 || 10) * 25).map((film: StartPageType) => {
          return (
            <Link to={`/show/${film.id}`} key={film.id} className='top-blocks-block'>
              <img className='top-blocks-block-img' src={film.image ? film.image.medium : '/ShowFinder/img/stub.png'} alt="" />
              <h2 className='top-blocks-block-text'>{film.name}</h2>
            </Link>
          )
        })}
      </div>
      <div className='top-pages'>
        {pageId > 2 ? <Link className='top-pages-page' to={`/${pageId - 2}`}>{`${pageId - 2}`}</Link> : <span className='top-pages-page'></span>}
        {pageId > 1 ? <Link className='top-pages-page' to={`/${pageId - 1}`}>{`${pageId - 1}`}</Link> : <span className='top-pages-page'></span>}
        <Link className='top-pages-page' to={`/${pageId}`}>{pageId}</Link>
        <Link className='top-pages-page' to={`/${pageId + 1}`}>{pageId + 1}</Link>
        <Link className='top-pages-page' to={`/${pageId + 2}`}>{pageId + 2}</Link>
      </div>
    </section>
  )
}

export {StartPage};