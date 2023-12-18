// comment.js
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.toggle-comment-form-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('hidden');
        });
    });
      
    // document.querySelectorAll('.post-comment-btn').forEach(button => {
    //     button.addEventListener('click', function(event) {
    //         const postId = this.dataset.postId;
    //         const content = document.getElementById(`comment-content-${postId}`).value;

    //         fetch('/api/comments', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ content, postId }),
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //                 alert('Failed to create comment. Server responded with status ' + response.status);
    //                 return;
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             if (data && data.id) {
    //                 document.getElementById(`comment-content-${postId}`).value = '';
    //                 // Add the new comment to the DOM
    //                 const commentsSection = document.querySelector(`#comments-section-${postId}`);
    //                 const newComment = document.createElement('div');
    //                 newComment.textContent = content;
    //                 commentsSection.appendChild(newComment);
    //             } else {
    //                 alert('Failed to create comment: Unknown error');
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //             alert('Failed to create comment. Error: ' + error.message);
    //         });
    //     });
    // });
    
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

            // Optimistic UI update
            const commentsSection = document.querySelector(`#comments-section-${postId}`);
            const newComment = document.createElement('div');
            newComment.textContent = content;
            commentsSection.appendChild(newComment);
            contentInput.value = '';

            fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, postId }),
            })
            .then(response => {
                if (!response.ok) {
                    // Remove the comment from the DOM
                    commentsSection.removeChild(newComment);
                    throw new Error('Server responded with status ' + response.status);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to create comment. Error: ' + error.message);
            });
        });
    });
});
