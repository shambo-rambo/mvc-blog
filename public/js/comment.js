// public/js/comment.js
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.toggle-comment-form-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('hidden');
        });
    });

    document.querySelectorAll('.post-comment-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            const postId = this.dataset.postId;
            const contentInput = document.getElementById(`comment-content-${postId}`);
            const content = contentInput.value;

            // Form validation
            if (!content.trim()) {
                alert('Comment content cannot be empty');
                return;
            }

            fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, post_id: postId }),
            })
            .then(response => response.json())
            .then(data => {
                // Update the UI with the new comment
                const commentsSection = document.querySelector(`#comments-section-${postId}`);
                const newComment = document.createElement('div');
                newComment.textContent = data.content;
                commentsSection.appendChild(newComment);
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            });
            })
        });
    });
