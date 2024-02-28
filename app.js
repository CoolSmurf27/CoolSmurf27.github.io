const all_songs = [];

document.addEventListener('DOMContentLoaded', (event) => {
const url = 'http://localhost:3000/api/v1/tunes';
    /* the sound used for the piano */
    const synth = new Tone.Synth().toDestination();
    /* how the piano will sound */

    function playSound(note, duration='8n', timing=0) {
        const now = Tone.now();
        synth.triggerAttackRelease(note, duration, now + timing);
    }
    /* the button clicks for piano playing */
    function handleButtonClick(event) {
      
        const note = event.target.dataset.note;
      
        playSound(note);
    }

/* Piano playing */
    const keys = ['c4', 'c#4', 'd4', 'd#4', 'e4', 'f4', 'f#4', 'g4', 'g#4', 'a4', 'bb4', 'b4', 'c5', 'c#5', 'd5', 'd#5', 'e5'];
    keys.forEach((key) => {
        const button = document.getElementById(key);
        button.addEventListener('click', handleButtonClick);
        
        button.dataset.note = key.toUpperCase();
    });

   
    document.addEventListener('keydown', (e) => {
        const keyToNote = {
            'a': 'C4',
            'w': 'C#4',
            's': 'D4',
            'e': 'D#4',
            'd': 'E4',
            'f': 'F4',
            't': 'F#4',
            'g': 'G4',
            'y': 'G#4',
            'h': 'A4',
            'u': 'Bb4',
            'j': 'B4',
            'k': 'C5',
            'o': 'C#5',
            'l': 'D5',
            'p': 'D#5',
            ';': 'E5',


        };
    
    
        if (keyToNote[e.key]) {
           
            e.preventDefault();
            
            playSound(keyToNote[e.key]);
        }
});

document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('tunebtn');
    if (playButton) {
        playButton.addEventListener('click', playSelectedTune);
    }
 
});
    const getAllTunes = async () => {

                
                try {
                    const response = await axios.get(url)
                    
                    console.log("Success: ", response.data);

                    all_songs = [];
                    response.data.forEach(item => {
                        console.log("Tune name: " + item.name);
                        all_songs.push(item)
                    })

                }
                catch (error) {
                    
                    console.log(error);
                }
                
}

    const fetchAndPopulateTunes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/tunes');
            const tunes = response.data;
            const tunesDrop = document.getElementById('tunesDrop');
            tunes.forEach(tune => {
                all_songs.push(tune)
                const option = document.createElement('option');
                option.value = tune.id;
                option.text = tune.name;
                tunesDrop.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching tunes:', error);
        }
    };
    

    window.addEventListener('load', fetchAndPopulateTunes);


    window.addEventListener('load', getAllTunes);

    const fetchTunes = async () => {
        try {
         
            const response = await axios.get('http://localhost:3000/api/v1/tunes');
            const tuneData = response.data;

       
            const dropdown = document.getElementById('tunesDropdown');
            tuneData.forEach(tune => {
                const option = document.createElement('option');
                option.text = tune.name;
                option.value = JSON.stringify(tune.tune);
                dropdown.appendChild(option);
            });

            console.log('Tunes fetched successfully:', tuneData);
        } catch (error) {
            console.error('Error fetching tunes:', error);
           
        }
    }

    
    const playSelectedTune = async () => {
        const dropdown = document.getElementById('tunesDrop');
        const selectedTune = dropdown.value;
        const now = Tone.now();
        console.log("SMALL TEST")
        console.log(all_songs)
        all_songs.forEach(item => {
            console.log(item)
            if (item.id == selectedTune){
                console.log("BIG TEST")
                item.tune.forEach(note => {
                    synth.triggerAttackRelease(note.note, note.duration, now + note.timing);
                });
            };
        });
    }
    document.getElementById('tunebtn').addEventListener('click', playSelectedTune);
 
    window.onload = fetchTunes;
   
});