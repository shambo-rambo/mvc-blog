// post.js
document.addEventListener('DOMContentLoaded', () => {
  const createPostBtn = document.getElementById('create-post');
  const togglePostFormBtn = document.getElementById('toggle-post-form');
  const newPostForm = document.getElementById('new-post-form');

  // Function to toggle the display of the new post form
  const togglePostForm = () => {
    newPostForm.classList.toggle('hidden');
  };

  // Event listener to handle the toggle button click
  if (togglePostFormBtn) {
    togglePostFormBtn.addEventListener('click', togglePostForm);
  } else {
    console.error('Toggle post form button not found');
  }

  // Event listener for the create post button
  if (createPostBtn) {
    createPostBtn.addEventListener('click', (event) => {
      // Prevent the default form submission
      event.preventDefault();

      const title = document.getElementById('new-post-title').value;
      const content = document.getElementById('new-post-content').value;

      fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      })
      .then(response => {
        console.log('Response Status:', response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response data:', data);
        if (data.title) {
          document.getElementById('new-post-title').value = '';
          document.getElementById('new-post-content').value = '';
          location.reload();
        } else {
          alert('Failed to create post: ' + (data.message || 'Unknown error'));
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        alert('Failed to create post. Error: ' + error.message);
      });
    });
  } else {
    console.error('Create post button not found');
  }
});

  document.body.addEventListener('click', function(event) {
    if (event.target.matches('.delete-post-btn')) {
      const postId = event.target.dataset.postId;

      fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        // Add headers if necessary, e.g., for authentication
      })
      .then(response => {
        if (response.ok) {
          // Remove the post element from the DOM
          const postElement = document.querySelector(`#post-${postId}`);
          if (postElement) postElement.remove();
        } else {
          throw new Error('Failed to delete post');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to delete post. Error: ' + error.message);
      });
    }
});