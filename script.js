const postBtn = document.getElementById('post-btn');
const postInput = document.getElementById('tweet');
const charCount = document.getElementById('char-count');

let posts = JSON.parse(localStorage.getItem('posts')) || [];
let comments = JSON.parse(localStorage.getItem('comments')) || [];

const saveDataToLocalStorage = () => {
	localStorage.setItem('posts', JSON.stringify(posts));
	localStorage.setItem('comments', JSON.stringify(comments));
};

postInput.addEventListener('input', () => {
	const post = postInput.value;
	charCount.innerHTML = post.length;
	if (post.length > 100) {
		charCount.parentElement.style.color = 'red';
	} else {
		charCount.parentElement.style.color = 'black';
	}
});

postBtn.addEventListener('click', () => {
	const post = postInput.value;

	if (post.length > 100) {
		alert('Your tweet is too long');
	} else {
		const newPost = {
			content: post,
			id: posts.length + 1,
		};

		posts.push(newPost);
		saveDataToLocalStorage();

		const tweet = document.createElement('div');
		tweet.setAttribute('class', 'card');
		tweet.innerHTML = `
   <img
 src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/031/original/profile_image.png?1706888739"
 alt="pfp"
 class="pfp"
   />
   <div class="card-details">
 <div class="card-header">
  <div class="user-details">
   <h3>User</h3>
   <p>@auser</p>

   <div class="actions">
    <i class="fa-solid fa-pen-to-square"></i>
    <i class="fa-solid fa-trash"></i>
   </div>
  </div>
 </div>

 <div class="card-body">
  <p>
   ${post}
  </p>
 </div>

 <div class="card-footer">
  <div class="posts">
   <i class="fa-regular fa-comment"></i>
  </div>

  <div class="likes">
   <i class="fa-regular fa-heart like"></i>
  </div>
 </div>
 
 <div id="id">${posts.length}</div>
   </div>`;

		const feed = document.getElementById('view-post');
		feed.appendChild(tweet);
	}

	postInput.value = '';
	charCount.innerHTML = 0;
});

// like and post functionality

const feed = document.getElementById('view-post');

feed.addEventListener('click', (e) => {
	const target = e.target;

	if (target.classList.contains('like')) {
		target.classList.toggle('fa-regular');
		target.classList.toggle('fa-solid');
		target.classList.toggle('liked');
	}

	if (target.classList.contains('fa-comment')) {
		const elemtn = document.createElement('div');
		elemtn.innerHTML = `<div class="box">
   <div class="area">
 <img
  src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/031/original/profile_image.png?1706888739"
  alt="pfp"
 />
 <textarea
  name="tweet"
  id="comment"
  cols="30"
  rows="10"
  placeholder="Type something here..."
 ></textarea>
   </div>

   <div class="extras">
 <div>
  <span id="com-count">0</span>
  /100
 </div>
 <button id="comment-btn">Post</button>
   </div>
  </div>`;

		target.parentElement.parentElement.parentElement.appendChild(elemtn);

		const commentBtn = document.getElementById('comment-btn');
		const comment = document.getElementById('comment');

		const comCount = document.getElementById('com-count');

		comment.addEventListener('input', () => {
			const post = comment.value;
			comCount.innerHTML = post.length;
			if (post.length > 100) {
				comCount.parentElement.style.color = 'red';
			} else {
				comCount.parentElement.style.color = 'black';
			}
		});

		commentBtn.addEventListener('click', () => {
			const post = comment.value;

			if (post.length > 100) {
				alert('Your comment is too long');
			} else {
				const comment = document.getElementById('comment');
				if (comment) {
					const postDiv = document.createElement('div');
					postDiv.setAttribute('class', 'card');
					postDiv.innerHTML = `
   <img
    src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/031/original/profile_image.png?1706888739"
    alt="pfp"
    class="pfp"
   />
   <div class="post-details">
    <h3>KV</h3>
    <p>${comment.value}</p>
   </div>`;

					target.parentElement.parentElement.parentElement.lastChild.remove();
					const id =
						target.parentElement.parentElement.parentElement.lastChild.innerHTML;

					target.parentElement.parentElement.parentElement.appendChild(postDiv);
					// fetch the id of the post
					const updatedPosts = posts.map((p) => {
						console.log(p);
						if (p.id == id) {
						}
						return p;
					});
					posts = updatedPosts;
					saveDataToLocalStorage();

					const newComment = {
						content: comment.value,
						postId: id,
					};
					comments.push(newComment);
					saveDataToLocalStorage();
				}
			}
		});
	}
});

// Retrieve posts and comments from localStorage and display them by default
window.addEventListener('DOMContentLoaded', () => {
	const feed = document.getElementById('view-post');

	posts.forEach((post) => {
		const tweet = document.createElement('div');
		tweet.setAttribute('class', 'card');
		tweet.innerHTML = `
   <img
 src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/031/original/profile_image.png?1706888739"
 alt="pfp"
 class="pfp"
   />
   <div class="card-details">
 <div class="card-header">
  <div class="user-details">
   <h3>User</h3>
   <p>@user</p>

   <div class="actions">
    <i class="fa-solid fa-pen-to-square"></i>
    <i class="fa-solid fa-trash"></i>
   </div>
  </div>
 </div>

 <div class="card-body">
  <p>
   ${post.content}
  </p>
 </div>

 <div class="card-footer">
  <div class="posts">
   <i class="fa-regular fa-comment"></i>
  </div>

  <div class="likes">
   <i class="fa-regular fa-heart like"></i>
  </div>
 </div>

 <div id="id">${post.length}</div>
   </div>`;

		feed.appendChild(tweet);
	});

	comments.forEach((comment) => {
		const postDiv = document.createElement('div');
		postDiv.setAttribute('class', 'card');
		postDiv.innerHTML = `
   <img
 src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/031/original/profile_image.png?1706888739"
 alt="pfp"
 class="pfp"
   />
   <div class="post-details">
 <h3>KV</h3>
 <p>${comment.content}</p>
   </div>`;

		feed.appendChild(postDiv);
	});
});

// Add functionality to delete a post

feed.addEventListener('click', (e) => {
	const target = e.target;
	if (target.classList.contains('fa-trash')) {
		let id =
			target.parentElement.parentElement.parentElement.parentElement.lastChild
				.innerHTML;
		console.log(id);

		id = target.parentElement.parentElement.lastChild.innerHTML;

		console.log(id);

		posts = posts.filter((post) => post.id != id);
		comments = comments.filter((comment) => comment.postId != id);
		saveDataToLocalStorage();
		target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
	}
});
