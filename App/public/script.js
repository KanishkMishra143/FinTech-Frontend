document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get form elements
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const rating = form.rating.value;
    const comments = form.comments.value;

    // Gather the data into an object
    const feedbackData = {
        name: name,
        email: email,
        rating: parseInt(rating),
        comments: comments || 'N/A' // Handle optional comments
    };

    // Log the data to the console for the backend developer
    console.log('Feedback submitted:', feedbackData);

    // Display a success message to the user
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = 'Thank you for your feedback! It has been submitted.';
    statusMessage.classList.remove('opacity-0');
    statusMessage.classList.add('opacity-100');

    // Clear the form after a short delay
    setTimeout(() => {
        form.reset();
        statusMessage.classList.remove('opacity-100');
        statusMessage.classList.add('opacity-0');
    }, 3000);
});
