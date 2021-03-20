// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  // To see the type of data returned, run in browser console:
  // fetch(`https://www.googleapis.com/books/v1/volumes?q=Harry Potter`).then(res=>res.json()).then(dat=>{console.log(dat)});
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
  