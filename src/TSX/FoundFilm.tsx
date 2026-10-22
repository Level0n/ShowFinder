import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import '../style/foundfilm.css';
import { changeFormatDate } from '../utils/changeFormatDate';


function FoundFilm() {
  const { searchParam } = useParams();
  const [foundFilms, setFoundFilms] = useState<any>(null);

  useEffect(() => {
    if (!searchParam) return;

    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchParam)}`)
    .then(response => {
      if (!response.ok) throw new Error('Ошибка подключения');
      return response.json();
    })
    .then(data => setFoundFilms(data));

    return;
  }, [searchParam]);

  return (
    <section className="foundfilm">
      <div className="foundfilm-blocks">
        {foundFilms && foundFilms.map((film: any) => {
          return (
            <Link to={`../show/${film.show.id}`} className="foundfilm-blocks-block" key={film.show.id}>
              <img src={film.show.image ? film.show.image.medium : '/ShowFinder/img/stub.png'} alt="No photo" />
              <div className="foundfilm-blocks-block-text">
                <div className="foundfilm-blocks-block-text-up">
                  <h1 className="foundfilm-blocks-block-text-title">{film.show.name}</h1>
                  {film.show.rating.average && <p className="foundfilm-blocks-block-text-raiting"><span>&#9733;</span>{film.show.rating.average}</p>}
                  <p className="foundfilm-blocks-block-text-subtitle">{(film.show.summary || '').replace(/<.+?>/g, '')}</p>
                </div>
                <div className="foundfilm-blocks-block-text-down">
                  <p><span className="bold">Premiere:</span> {changeFormatDate(film.show.premiered)}</p>
                  {film.show.status === 'Ended' ? <p><span className="bold">Status:</span> Ended</p> : <p><span className="bold">Status:</span> Running on {film.show.schedule.days.join(',')} at {film.show.schedule.time}</p>}
                </div>
              </div>
            </Link>
          )})}
        </div>
    </section>
  );
};

export { FoundFilm };