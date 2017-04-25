import { Component } from '@angular/core';
import { Synth, Utterance } from '../speech';
import { VoiceChoices } from '../voice-choices';
import { Settings } from '../../settings';

@Component({
  selector: 'app-lexicon',
  templateUrl: './lexicon.component.html',
  styleUrls: ['./lexicon.component.css']
})
export class LexiconComponent {
  value: string = '';
  voices = VoiceChoices;
  availableVoices;
  selectedVoice = Settings.defaultVoice;
  voiceData;
  message: any;

  ngOnInit() {
    this.getVoices();
    if (Synth && Synth.onvoiceschanged !== undefined) {
      Synth.onvoiceschanged = this.getVoices.bind(this);
    }
    else this.getVoices();
  }

  private getVoices() {
    this.availableVoices = Synth.getVoices()
      .filter(voice => voice.lang.match('en'));
  }

  speak() {
    console.log(this.value);
    // this.value = '';
    this.voiceData = this.availableVoices
      .find(voice => voice.name === this.selectedVoice);
    this.message = new Utterance(this.value);
    this.message.voice = this.voiceData;
    this.message.rate = 0.85;
    Synth.speak(this.message);
  }
}
