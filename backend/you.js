const YouTube = require('youtube-node');

const youTube = new YouTube();
youTube.setKey('AIzaSyC4B5qzKzMj0FaXU6tbLmIF73Q5peuEtQA');

function generateYouTubeLink(videoTitle) {
  youTube.search(videoTitle, 2, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      const firstVideo = result.items[0];
      const videoId = firstVideo.id.videoId;
      const youtubeLink = `https://www.youtube.com/watch?v=${videoId}`;
      console.log(youtubeLink);

      // Now you can use youtubeLink as needed, or return it if this function is supposed to return it.
    }
  });
}

// Example usage:
const videoTitle = "Daily Saving Tips for Beginners";
generateYouTubeLink(videoTitle);
