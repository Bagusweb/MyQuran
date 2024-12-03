import { getCurrentData, saveData } from "./localStorage";

export function preventDoublePlayAndTriggerNextPlay(e, index, numberOfSurah) {
    // code from https://github.com/buckypinkman/quran-online/blob/master/mixins/audio.js
    const allAudio = document.querySelectorAll('.' + e.target.className)
    for (let i = 0; i < allAudio.length; i++) {
        if (allAudio[i] != e.target) {
            allAudio[i].pause();
        }
    }

    e.target.onended = () => {
        if(e.target != allAudio[allAudio.length - 1]){
        const nextAudioEl = e.target.parentElement.parentElement.nextSibling.children[0].children[1]
        nextAudioEl.play()
        }

        let last_listened = getCurrentData('_last_listened');
        if(last_listened.some(l => l.numberOfSurah == numberOfSurah)){
            last_listened = last_listened.map(l => {
                if(l.numberOfSurah == numberOfSurah){
                    l.last_listened_date = (new Date()).toLocaleString();
                }
                return l;
            });
        } else {
            last_listened.push({
                numberOfSurah,
                    last_listened_date: (new Date()).toLocaleString()
            });
        }
        saveData("_last_listened",last_listened);
    }

    e.target.onplaying = () => {
        if(e.target != allAudio[allAudio.length - 1]){
            const nextAudioEl = e.target.parentElement.parentElement.nextSibling.children[0].children[1];
            nextAudioEl.currentTime = 0;
            nextAudioEl.preload = true
        }
    }

    window.location.assign(window.location.pathname + `#ayah-${index}`);
  };