export type StartPageType = {
  id: string;
  image?: {
    medium: string;
  };
  name: string;
}

export type ShowPageType = {
  image?: {
    original: string;
  };
  name: string;
  rating: {
    average: string;
  };
  genres: string[];
  summary: string;
  premiered: string;
  status: string;
  schedule: {
    days: string[];
    time: string;
  }
  ended: string;
}

export type FoundFilmType = {
  show: {
    id: string;
    name: string;
    image?: {
      medium: string;
    }
    rating: {
      average: string;
    }
    summary?: string;
    premiered: string;
    status: string;
    schedule: {
      days: string[];
      time: string;
    }
  }
}