import { generateKeys } from './content.js';
import dropDown from './dropDown.js';

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
        id: sheet.id,
        title: sheet.title.rendered,
        excerpt: sheet.excerpt.rendered,
        link: sheet.link
      }
    })

    generateKeys(sheets, getPostId());
  });

  function getPostId() {
    let body = document.body;
    let classes = body.className.split(' ');
    let postId = 0;
    
    classes.forEach(className => {
      if (className.startsWith('postid-')) {
        postId = Number(className.substring(7));
      }
    });
    
    return postId;
  }

  document.getElementById('piano').addEventListener('click', function(event) {
    const listItem = event.target.closest('.sheets__item.white');
    if (listItem) {
      const link = listItem.querySelector('a');
      if (link) {
        window.location.href = link.href;
      }
    }
  });

  dropDown();