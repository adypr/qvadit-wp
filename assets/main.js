import { generateKeys } from './content.js';


let state = {
  postsData: [],
  apiUrl: 'http://localhost/qvadit/wp-json/wp/v2/posts',
  queryParams: '?per_page=10',
  fetchHeaders: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': 'x-wp-total'
    }
  }
}

async function getTotalPages() {
  const response = await fetch(`${state.apiUrl}${state.queryParams}`, state.fetchHeaders);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const totalPages = await response.headers.get('x-wp-totalpages');
  return totalPages;
}

async function fetchAllPosts(totalPages) {
  const postRequests = [];

  for (let page = 1; page <= totalPages; page += 1) {
    const postRequest = fetch(`${state.apiUrl}${state.queryParams}&page=${page}`, state.fetchHeaders)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
    postRequests.push(postRequest);
  }

  try {
    const postResponses = await Promise.all(postRequests);
    state.postsData = postResponses.flat();
  } catch (error) {
    console.log('Error fetching posts: ', error);
  }

  return true;
}

getTotalPages()
  .then(totalPages => fetchAllPosts(totalPages))
  .then(() => {
    const sheets = state.postsData.map((sheet) => {
      return {
        title: sheet.title.rendered,
        excerpt: sheet.excerpt.rendered,
        link: sheet.link
      }
    })

    generateKeys(sheets);
  });
