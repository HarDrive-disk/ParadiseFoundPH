var apiKey = 'AIzaSyAjd9J1YKZNexbEeNWPMXXO27JXYjm_8Kg'; // Replace with your actual API key
var maxResults = 10;

// Define search queries for each beach
var locations = [
    {
        name: "Saud Beach, Pagudpud, Ilocos Norte",
        searchQuery: "saud beach",
        playlistContainerId: "playlistContainer1"
    },
    {
        name: "White Beach, Boracay, Aklan",
        searchQuery: "white beach boracay",
        playlistContainerId: "playlistContainer2"
    },
    {
        name: "Alegria Beach, Siargao Island, Surigao del Norte",
        searchQuery: "alegria beach siargao",
        playlistContainerId: "playlistContainer3"
    }
];

function init() {
    gapi.load('client', function () {
        gapi.client.init({
            apiKey: apiKey,
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
        }).then(function () {
            // Initialize for each location
            locations.forEach(function (location) {
                execute(location);
            });
        }).catch(function (error) {
            console.error('Error loading GAPI client:', error);
            document.getElementById('playlistContainer').textContent = 'Failed to load the API client.';
        });
    });
}

function execute(location) {
    gapi.client.youtube.search.list({
        part: 'snippet',
        q: location.searchQuery, // Use the search query (e.g., 'saud beach')
        type: 'video', // Make sure it's searching for videos
        maxResults: maxResults
    }).then(function (response) {
        var videos = response.result.items;
        var playlistContainer = document.getElementById(location.playlistContainerId);
        playlistContainer.innerHTML = '';

        if (videos && videos.length > 0) {
            videos.forEach(function (video) {
                var videoId = video.id.videoId;
                if (videoId) {
                    var title = video.snippet.title;
                    var thumbnailUrl = video.snippet.thumbnails.high?.url ||
                        video.snippet.thumbnails.medium?.url ||
                        video.snippet.thumbnails.default?.url; // Fallback options
                    var videoUrl = 'https://www.youtube.com/watch?v=' + videoId;  // YouTube video URL

                    var playlistItem = document.createElement('div');
                    playlistItem.className = 'playlist-item';

                    // Create the anchor tag to make the video clickable
                    var link = document.createElement('a');
                    link.href = videoUrl;
                    link.target = '_blank';  // Open in a new tab

                    var thumbnail = document.createElement('img');
                    thumbnail.src = thumbnailUrl;
                    thumbnail.alt = title;

                    var titleElement = document.createElement('div');
                    titleElement.className = 'title';
                    titleElement.textContent = title;

                    // Append thumbnail and title inside the link
                    link.appendChild(thumbnail);
                    link.appendChild(titleElement);

                    // Append the link to the playlist item
                    playlistItem.appendChild(link);

                    // Append playlist item to the container
                    playlistContainer.appendChild(playlistItem);
                }
            });
        } else {
            playlistContainer.textContent = 'No videos found.';
        }
    }).catch(function (error) {
        console.error('Error fetching videos from search query:', error);
        document.getElementById(location.playlistContainerId).textContent = 'An error occurred while fetching videos.';
    });
}

window.onload = init;
