export const Run = () => {
  const synth = (<any>window).speechSynthesis;

  const inputForm = document.querySelector('form');
  const inputTxt = document.querySelector('input');
  const voiceSelect = document.querySelector('select');
  let voices = [];

  function populateVoiceList() {
    const selectedVoices = {
      "Daniel": true,
      "Fiona": true,
      "Karen": true,
      "Moira": true,
      "Tessa": true,
      "Veena": true,
      "Google US English": true,
      "Google UK English Female": true,
      "Google UK English Male": true
    };

    voices = synth.getVoices();
    voices = voices.filter(function({ name }) {
      return selectedVoices[name];
    });

    voices.forEach(voice => {
      let option = document.createElement('option');
      option.textContent = voice.name + ' (' + voice.lang + ')';
      
      if(voice.default) {
        option.textContent += ' -- DEFAULT';
      }

      option.setAttribute('data-lang', voice.lang);
      option.setAttribute('data-name', voice.name);
      voiceSelect.appendChild(option);
      
    });
  }

  populateVoiceList();

  inputForm.onsubmit = function(event) {
    event.preventDefault();

    let utterThis = new (<any>window).SpeechSynthesisUtterance(inputTxt.value);
    let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    voices.forEach(voice => {
      if(voice.name === selectedOption) {
        utterThis.voice = voice;
      }
      synth.speak(utterThis);
      inputTxt.blur();
    });
  }
}
