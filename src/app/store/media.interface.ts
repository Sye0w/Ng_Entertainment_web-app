export interface IMediaItem {
  title: string;
  thumbnail: {
    trending?: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: "Movie" | "TV Series";
  rating: "E" | "PG" | "18+";
  isBookmarked: boolean;
  isTrending: boolean;
}



