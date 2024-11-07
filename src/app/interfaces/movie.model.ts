export interface Movie {
  id: number;
  title: string;
  release_date: string; // Añadir la propiedad release_date
  poster_path: string | null; // Añadir la propiedad poster_path
  character?: string; // Si es necesario, puedes mantener esta propiedad
}

export interface ActorMovieResponse {
  cast: Movie[];
}
