const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');


    //SOUNDS
    const sounds = document.querySelectorAll('.sound-picker button');

    //TIME DISPLAY
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button')

    //GET the LENGTH of the OUTLINE
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);

    //DURATION
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //PLAY SOUND
    play.addEventListener('click', () =>{
        checkPlaying(song);
    });

    //Create function to STOP and PLAY current SONG
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src = '/svgs/pause.svg';
        } else{
            song.pause();
            video.pause();
            play.src = '/svgs/play.svg'
        }
    };

    // ANIMATE the PLAY CIRCLE
    song.ontimeupdate = () =>{
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;

        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //ANIMATE the CIRCLE
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //ANIMATE timer
        timeDisplay.textContent = `${minutes}:${seconds}`; /* updated time */

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = './svgs/play.svg';
            video.pause();
        }
    };

    //SELECT sound
    timeSelect.forEach(option =>{
        option.addEventListener('click', function(){
            fakeDuration = this.getAttribute('data-time'); /* update fakeDuration */
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration % 60)}`; /* initial time */
        });
    });

    //PICK different SOUNDS
    sounds.forEach(sound =>{
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        })
    })

};

app();