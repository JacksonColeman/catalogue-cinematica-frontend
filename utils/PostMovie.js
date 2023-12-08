const postMovie = async (movieData) => {
  // Make a fetch POST request
  fetch("/api/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "true",
      // Add any other headers you might need, e.g., authorization headers
    },
    body: JSON.stringify({ movie: movieData }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Movie creation failed");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Movie created successfully:", data);
      // Do something with the response, like redirecting or updating the UI
    })
    .catch((error) => {
      console.error("Movie creation error:", error);
      // Handle the error as needed
    });
};

export default postMovie;
