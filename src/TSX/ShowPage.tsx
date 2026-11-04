import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { ShowPageType } from "../types";

import { changeFormatDate } from '../utils/changeFormatDate';
import '../style/showpage.css';

function ShowPage() {
  const { showId } = useParams();
  const [film, setFilm] = useState<ShowPageType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string>('');

  useEffect(() => {
    if (!showId) return;

    fetch(`https://api.tvmaze.com/shows/${encodeURIComponent(showId)}`)
    .then(response => {
      if (!response.ok) throw new Error('Error connection'); 
      return response.json();
    })
    .then((data: ShowPageType) => {
      setFilm(data);
    })
    .catch((error: {message: string}) => {
      setIsError(error.message);
    })
    .finally(() => setIsLoading(false));
  }, [showId]);

  if (isLoading) return <section className='top text-top'>Loading...</section>;
  if (isError) return <section className='top text-top'>{isError}</section>;

  return (
    film && (
      <section className="filmblock">
        <img className="filmblock-img" src={film.image ? film.image.original : '/ShowFinder/img/stub.png'} alt="" />
        <div className="filmblock-text">
          <div className="filmblock-text-up">
            <h1 className="filmblock-text-up-title">{film.name} ({film.premiered.slice(0, 4)})</h1>
            <p className="filmblock-text-up-rating"><span>&#9733;</span>{film.rating.average}</p>
            <p className="filmblock-text-up-genres"><span className="bold">Genres</span>: {film.genres.join(', ')}.</p>
            <p className="filmblock-text-up-summary">{film.summary.replace(/<.+?>/g, '')}</p>
          </div>
          <div className="filmblock-text-down">
            <p className="filmblock-text-down-premiere"><span className="bold">Premiere:</span> {changeFormatDate(film.premiered)}</p>
            <p className="filmblock-text-down-ended">{film.status === 'Ended' ? `Ended ${changeFormatDate(film.ended)}` : `Running on ${film.schedule.days.join(',')} at ${film.schedule.time}`}</p>
          </div>
        </div>
      </section>
    )
  )
}

export { ShowPage };