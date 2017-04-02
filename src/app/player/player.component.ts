import { Component } from '@angular/core';
import { VoiceChoices } from './voice-choices';
import { SequenceService } from '../sequence.service';
import { Settings } from '../settings';
import { Synth, Utterance } from './speech';
import Lexicon from './lexicon';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  voices = VoiceChoices;
  voiceData;
  availableVoices;
  selectedVoice = Settings.defaultVoice;
  playing = false;
  cueTimeout;

  constructor(private service: SequenceService) {}

  ngOnInit() {
    if (Synth && Synth.onvoiceschanged !== undefined) {
      Synth.onvoiceschanged = this.getVoices.bind(this);
    }
    else this.getVoices();
  }

  startSequence(index?: number) {
    if (this.playing) this.stopSequence();
    let sequence = this.service.getSequence();
    this.voiceData = this.availableVoices
      .find(voice => voice.name === this.selectedVoice);
    this.service.currentIndex = index || 0;
    this.speakAndCueNext(sequence);
    this.playing = true;
  }

  stopSequence() {
    Synth.cancel();
    this.playing = false;
    this.service.currentIndex = null;
    clearTimeout(this.cueTimeout);
  }

  private getVoices() {
    this.availableVoices = Synth.getVoices()
      .filter(voice => voice.lang.match('en'));
  }

  private speakAndCueNext(sequence) {
    let pose = sequence[this.service.currentIndex];
    if (!pose) return this.stopSequence();
    this.speak(pose.name);
    if (Settings.breathCount) this.speak(pose.breaths + ' breaths');
    this.cueTimeout = setTimeout(() => {
      this.service.currentIndex++;
      this.speakAndCueNext(sequence);
    }, pose.breaths * Settings.secPerBreath * 1000);
  }

  private speak(text: string) {
    text = Lexicon[text] || text;
    let message = new Utterance(text);
    message.voice = this.voiceData;
    Synth.speak(message);
  }
}
