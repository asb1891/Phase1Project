document.addEventListener("DOMContentLoaded", () => {
  // Your JavaScript code here

  //Selecting elements from the DOM are being selected and stored in constants for easy reference later in the script.
  const finneganPhotos = document.querySelector("#finnegan-photos");
  const stars = document.querySelectorAll(".star svg"); // Updated to select the SVG elements
  const starRatings = document.querySelectorAll(".star-rating");
  const starNumber = document.getElementById("star-value");
  const commentForm = document.getElementById("comment-form");

  let originalDescription = "";

  //Function to add a new comment to the comments container
  function addComment(commentText) {
    const commentsContainer = document.getElementById("comments-container");
    const newComment = document.createElement("p");
    newComment.textContent = commentText;
    commentsContainer.appendChild(newComment);
  }

  //Function to reset star ratings to their default state
  function resetStarRatings() {
    stars.forEach((star, index) => {
      star.style.color = "#000000"; // Default star color (black)
      starRatings[index].textContent = "0"; // Reset star ratings to 0
    });
  }
  const starRatingTitle = document.getElementById("star-rating-title");

  // Star rating functionality
  stars.forEach((star, index) => {
    star.addEventListener("click", function () {
      starNumber.textContent = index + 1;
      starRatingTitle.textContent = `Star Rating: ${index + 1}`;
    });
  });

  // Fetch data from a JSON API (assuming it's running locally)
  fetch("http://localhost:4001/Photos")
    .then((response) => response.json())
    .then((Photos) => {
      // Loop through each photo in the response
      Photos.forEach((photo, index) => {
        // Create an image element for each photo
        const finneganImage = document.createElement("img");
        finneganImage.src = photo.image;
        finneganImage.classList.add(`image-${index}`);

        // Add a click event listener to each image
        finneganImage.addEventListener("click", () => {
          // Update the detail image and comment when an image is clicked
          // Update the detail image and comment when an image is clicked
          const detailImage = document.querySelector(".detail-image");
          detailImage.src = photo.image;

          const comment = document.querySelector(".comment");
          comment.textContent = photo.comment;
          // Store the original description
          originalDescription = photo.description;

          const description = document.querySelector(".description");
          description.textContent = originalDescription;
        });
        finneganImage.addEventListener("mouseover", () => {
          // Update the detail image
          const detailImage = document.querySelector(".detail-image");
          detailImage.src = photo.image;

          // Update the comment and description
          const comment = document.querySelector(".comment");
          comment.textContent = photo.comment;

          const description = document.querySelector(".description");
          description.textContent = photo.description;

          // Initialize starRatings here
          //starRatings = document.querySelectorAll(".star-rating");

          // Reset star ratings
          resetStarRatings();
        });

        // Append the image to the photos container
        finneganPhotos.appendChild(finneganImage);
      });

      // Add a submit event listener to the comment form
      commentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const commentInput = document.getElementById("comment-input");
        const commentText = commentInput.value;

        // Add the new comment to the comments container
        addComment(commentText);
        commentInput.value = ""; // Clear the input field
      });
    });
});
