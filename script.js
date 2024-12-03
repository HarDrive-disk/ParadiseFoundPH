var apiKey = 'AIzaSyDFakJcb4IFnQCE6lBQNf5Y5zl0psSVhHQ';
var channelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw'; // Correct channel ID for @phdotnet888
var maxResults = 10;

function init() {
    gapi.client.setApiKey(apiKey);
    loadClient();
}

function loadClient() {
    gapi.client.load('youtube', 'v3', function() {
        execute();
    });
}

function execute() {
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        channelId: channelId,
        order: 'date',
        maxResults: maxResults
    });

    request.execute(function(response) {
        var videos = response.items;
        if (videos && videos.length > 0) {
            var playlistContainer = document.getElementById('playlistContainer');
            playlistContainer.innerHTML = '';

            videos.forEach(function(video) {
                var videoId = video.id.videoId;
                var title = video.snippet.title;
                var thumbnailUrl = video.snippet.thumbnails.default.url;

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
            });
        } else {
            document.getElementById('playlistContainer').textContent = 'No videos found.';
        }
    }, function(error) {
        console.error('Error:', error);
        document.getElementById('playlistContainer').textContent = 'An error occurred while fetching videos.';
    });
}

gapi.load('client');
window.onload = init;
