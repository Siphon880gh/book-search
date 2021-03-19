Book Search
====
![Last Commit](https://img.shields.io/github/last-commit/Siphon880gh/book-search/master)
<a target="_blank" href="https://github.com/Siphon880gh" rel="nofollow"><img src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" alt="Github" data-canonical-src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" style="max-width:100%;"></a>
<a target="_blank" href="https://github.com/Siphon880gh" rel="nofollow"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="Github" data-canonical-src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" style="max-width:100%; height: 20px; border-radius:2.5px"></a>
<a target="_blank" href="https://www.linkedin.com/in/weng-fung/" rel="nofollow"><img src="https://camo.githubusercontent.com/0f56393c2fe76a2cd803ead7e5508f916eb5f1e62358226112e98f7e933301d7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c696e6b6564496e2d626c75653f7374796c653d666c6174266c6f676f3d6c696e6b6564696e266c6162656c436f6c6f723d626c7565" alt="Linked-In" data-canonical-src="https://img.shields.io/badge/LinkedIn-blue?style=flat&amp;logo=linkedin&amp;labelColor=blue" style="max-width:100%;"></a>
<a target="_blank" href="https://www.youtube.com/user/Siphon880yt/" rel="nofollow"><img src="https://camo.githubusercontent.com/0bf5ba8ac9f286f95b2a2e86aee46371e0ac03d38b64ee2b78b9b1490df38458/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f596f75747562652d7265643f7374796c653d666c6174266c6f676f3d796f7574756265266c6162656c436f6c6f723d726564" alt="Youtube" data-canonical-src="https://img.shields.io/badge/Youtube-red?style=flat&amp;logo=youtube&amp;labelColor=red" style="max-width:100%;"></a>  

Description
---
By Weng Fei Fung. Search books to see their detailed information and save them to your favorites if interested. 

Demo
---
https://book-search-wff.herokuapp.com/

Screenshot
---
Search Books
![Screenshot 1](./docs/pg1.gif)

Add to Favorites
![Screenshot 1](./docs/pg2.gif)


Table of Contents
---
- [Description](#description)
- [Demo](#demo)
- [Screenshot](#screenshot)
- [Upcoming](#upcoming)
- [Installation](#installation)
- [Tests](#tests)
- [Questions](#questions)

Upcoming
---
Future version will have book-to-film adaptations and links to rent or purchase the movie versions of the books on Google Play. See a preview of this feature at "Film Adaptations".

Installation
---
Install node modules at the root by running `npm run install`. You can seed a demo user and preview the upcoming feature of book to film adaptations with `npm run seed`. For logging in, that demo user's email address is test@test.com and password test. However, you can sign up for your own account.

Tests
---
You can test queries and mutations with default demo user "test" if you go into server's resolver.js and follow the "Testable" comment instructions which will block JWT authentication inside the graphQL playground. Make sure to switch to development mode with `npm run dev` or your preferred method because the graphQL playground does not show in production mode. You can visit graphQL playground, usually at http://localhost:3001/graphql. The queries and mutations you can run are from the tagged templates at client folder's queries.js and mutations.js. Switch back to production mode by running `npm run prod`. This app was converted from REST API to graphQL; You can checkout different points in the commits to see a test driven development approach.

Questions
---
- Where can I see more of your repositories?
	- Visit [Siphon880gh's Repositories](https://github.com/Siphon880gh)

- Where can I reach you?
	- You can reach me with additional questions at <a href='mailto:weffung@ucdavis.edu'>weffung@ucdavis.edu</a>.
	- Want to [hire me](http://wengindustry.com/)?