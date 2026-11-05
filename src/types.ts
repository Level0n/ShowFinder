export type StartPageType = {
  id: number;
  image?: {
    medium: string;
  } | null;
  name: string;
}

export type ShowPageType = {
  image?: {
    original: string;
  } | null;
  name: string;
  rating: {
    average?: number | null;
  };
  genres: string[];
  summary?: string | null;
  premiered: string | null;
  status: string;
  schedule: {
    days: string[];
    time: string;
  }
  ended: string | null;
}

export type FoundFilmType = {
  show: {
    id: number;
    name: string;
    image?: {
      medium: string;
    } | null
    rating: {
      average?: number | null;
    }
    summary?: string | null;
    premiered: string | null;
    status: string;
    schedule: {
      days: string[];
      time: string;
    }
  }
}