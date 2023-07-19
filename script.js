/**
 * Attach 'Enter' key press event listener to the word input field
 * Triggers the generation of audio when 'Enter' is pressed
 */
document.getElementById('word').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        generateAudio();
    }
});

/**
 * Generates the pronunciation audio for a given word
 * Audio speed depends on whether 'slow' mode is checked
 * Language of audio is based on user selection
 * Displays error message if audio file is not found
 */
function generateAudio() {
    // Fetching user input and page elements
    var word = document.getElementById('word').value;
    var audio = document.getElementById('audio');
    var isSlow = document.getElementById('slow').checked;
    var language = document.getElementById('language').value;
    var errorElement = document.getElementById('error');

    if (word !== '') {
        // Constructing URL for audio file
        var firstTwo = word.substring(0, 2);
        var speed = isSlow ? "_2" : "_1";
        var audioURL = "https://ssl.gstatic.com/dictionary/static/pronunciation/2022-03-02/audio/" + firstTwo + "/" + word + "_" + language + speed + ".mp3";
        
        // Defining error handling function
        audio.onerror = function() {
            errorElement.textContent = "Error: Audio file for '" + word + "' not found in selected language.";
        };
        // Setting source for audio and initiating playback
        audio.src = audioURL;
        audio.play();
    }
}

/**
 * Check system dark mode setting and update theme
 * Theme is updated by injecting CSS into the 'themeStyle' style tag
 */
function updateTheme() {
    var themeStyle = document.getElementById('themeStyle');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeStyle.innerHTML += `
            /* Dark Theme Styles */
            body { background-color: #282c34; color: #f8f8f2; }
            input, select, button { background-color: #44475a; color: #f8f8f2; border: none; }
            #error { color: #ff5555; }
        `;
    } else {
        themeStyle.innerHTML += `
            /* Light Theme Styles */
            body { background-color: #f8f8f2; color: #282c34; }
            input, select, button { background-color: #f8f8f2; color: #282c34; border: none; }
            #error { color: #ff5555; }
        `;
    }
}
updateTheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
