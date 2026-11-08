import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { FoundFilmType } from "../types";

import '../style/foundfilm.css';
import { changeFormatDate } from '../utils/changeFormatDate';


function FoundFilm() {
  const { searchParam } = useParams();
  const [foundFilms, setFoundFilms] = useState<FoundFilmType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    setIsError('');
    setFoundFilms([]);

    if (!searchParam) {
      setIsLoading(false);
      return;
    }

    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchParam)}`)
    .then(response => {
      if (!response.ok) throw new Error('Error connection'); 
      return response.json();
    })
    .then((data: FoundFilmType[]) => {
      setFoundFilms(data);
    })
    .catch((error: unknown) => {
      if (error instanceof Error) setIsError(error.message);
      else setIsError('Unknown error')
    })
    .finally(() => setIsLoading(false));
  }, [searchParam]);

  if (isLoading) return <section className='top text-top'>Loading...</section>;
  if (isError) return <section className='top text-top'>{isError}</section>;
  if (foundFilms.length === 0) return <section className='top text-top'>Nothing found</section>;
  
  return (
    <section className="foundfilm">
      <div className="foundfilm-blocks">
        {foundFilms.map((film: FoundFilmType) => {
          return (
            <Link to={`/show/${film.show.id}`} className="foundfilm-blocks-block" key={film.show.id}>
              <img src={film.show.image ? film.show.image.medium : '/ShowFinder/img/stub.png'} alt="No photo" />
              <div className="foundfilm-blocks-block-text">
                <div className="foundfilm-blocks-block-text-up">
                  <h1 className="foundfilm-blocks-block-text-title">{film.show.name}</h1>
                  {film.show.rating.average != null && <p className="foundfilm-blocks-block-text-raiting"><span>&#9733;</span>{film.show.rating.average}</p>}
                  <p className="foundfilm-blocks-block-text-subtitle">{(film.show.summary || '').replace(/<.+?>/g, '')}</p>
                </div>
                <div className="foundfilm-blocks-block-text-down">
                  <p><span className="bold">Premiere:</span> {film.show.premiered && changeFormatDate(film.show.premiered)}</p>
                  {film.show.status === 'Ended' ? <p><span className="bold">Status:</span> {film.show.status}</p> : <p><span className="bold">Status:</span> {film.show.status} on {film.show.schedule.days.join(',')} at {film.show.schedule.time}</p>}
                </div>
              </div>
            </Link>
          )})}
        </div>
    </section>
  );
};

export { FoundFilm };