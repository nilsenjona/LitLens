export const buildCoverUrl = (cover_i, size = 'M') => {
  if (!cover_i) return null;
  return `https://covers.openlibrary.org/b/id/${cover_i}-${size}.jpg`;
};
