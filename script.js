var apiKey = 'AIzaSyDFakJcb4IFnQCE6lBQNf5Y5zl0psSVhHQ'; // Replace with your actual API key
var channelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw'; // Correct channel ID for @phdotnet888
var maxResults = 10;

function init() {
    gapi.load('client', function () {
        gapi.client.init({
            apiKey: apiKey,
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
        }).then(function () {
            execute();
        }).catch(function (error) {
            console.error('Error loading GAPI client:', error);
            document.getElementById('playlistContainer').textContent = 'Failed to load the API client.';
        });
    });
}

function execute() {
    gapi.client.youtube.search.list({
        part: 'snippet',
        channelId: channelId,
        order: 'date',
        maxResults: maxResults
    }).then(function (response) {
        var videos = response.result.items;
        var playlistContainer = document.getElementById('playlistContainer');
        playlistContainer.innerHTML = '';

        if (videos && videos.length > 0) {
            videos.forEach(function (video) {
                var videoId = video.id.videoId;
                if (videoId) { // Ensure it's a video and not a playlist or other item
                    var title = video.snippet.title;
                    var thumbnailUrl = video.snippet.thumbnails.medium.url; // Better thumbnail quality

                    var playlistItem = document.createElement('div');
                    playlistItem.className = 'playlist-item';

                    var thumbnail = document.createElement('img');
                    thumbnail.src = thumbnailUrl;
                    thumbnail.alt = title;

                    var titleElement = document.createElement('div');
                    titleElement.textContent = title;
                    titleElement.style.padding = '10px';
                    titleElement.style.backgroundColor = '#f9f9f9';
                    titleElement.style.borderRadius = '4px';

                    playlistItem.appendChild(thumbnail);
                    playlistItem.appendChild(titleElement);

                    playlistContainer.appendChild(playlistItem);
                }
            });
        } else {
            playlistContainer.textContent = 'No videos found.';
        }
    }).catch(function (error) {
        console.error('Error fetching videos:', error);
        document.getElementById('playlistContainer').textContent = 'An error occurred while fetching videos.';
    });
}

window.onload = init;
