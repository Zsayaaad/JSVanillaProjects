const postsContainer = document.getElementById('posts-container');
const filter = document.getElementById('filter');
const loading = document.querySelector('.loader');

const limit = 5;
let page = 1;

// Fetch POST from API
async function fetchPosts() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const json = await response.json();
  return json;
}

// Show Posts
async function showPosts() {
  const posts = await fetchPosts();
  console.log(posts);

  posts.map((post) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>
    `;

    postsContainer.append(postElement);
  });
}

function showLoading() {
  // Show loading design
  loading.classList.add('show');

  // Fetch more posts after 1 second.
  setTimeout(() => {
    page++;
    showPosts();
  }, 1000);

  // Hide the loading indicator after 0.3 seconds.
  setTimeout(() => {
    loading.classList.remove('show');
  }, 300);
}

function filterPosts(e) {
  // toUpperCase() => To get posts if you search by big words
  const term = e.target.value.toUpperCase();

  const posts = document.querySelectorAll('.post');
  posts.forEach((post) => {
    // Get the tilte & body of each post to search
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

showPosts();

// Our Scroll Functionality
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

// Filter Posts By Search
filter.addEventListener('input', filterPosts);
