import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { changeFormatDate } from '../utils/changeFormatDate';
import '../style/showpage.css';

function ShowPage() {
  const { showId } = useParams();
  const [film, setFilm] = useState<any>(null); //Потом поменять

  useEffect(() => {
    if (!showId) return;

    fetch(`https://api.tvmaze.com/shows/${encodeURIComponent(showId)}`)
    .then(response => {
      if (!response.ok) throw new Error('Ошибка подключения'); 
      return response.json();
    })
    .then(data => {
      console.log(data);
      setFilm(data);
    });

    return;
  }, [showId])

  return (
    film && (
      <div className="filmblock">
        <img className="filmblock-img" src={film.image.original} alt="" />
        <div className="filmblock-text">
          <div className="filmblock-text-up">
            <h1 className="filmblock-text-up-title">{film.name} ({film.premiered.slice(0, 4)})</h1>
            <p className="filmblock-text-up-rating"><span>&#9733;</span>{film.rating.average}</p>
            <p className="filmblock-text-up-genres">Genres: {film.genres.join(', ')}.</p>
            <p className="filmblock-text-up-summary">{film.summary.replace(/<.+?>/g, '')}</p>
          </div>
          <div className="filmblock-text-down">
            <p className="filmblock-text-down-premiere">Premiere: {changeFormatDate(film.premiered)}</p>
            <p className="filmblock-text-down-ended">{film.status === 'Ended' ? `Ended ${changeFormatDate(film.ended)}` : `Running on ${film.schedule.days.join(',')} at ${film.schedule.time}`}</p>
          </div>
        </div>
      </div>
    )
  )
}

export { ShowPage };