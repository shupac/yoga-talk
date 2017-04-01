import { Component } from '@angular/core';
import { VoiceChoices } from './voice-choices';
import { SequenceService } from '../sequence.service';
import { Settings } from '../settings';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  synth = (<any>window).speechSynthesis;
  voices = VoiceChoices;
  availableVoices;
  selectedVoice = 'Tessa';
  playing = false;
  cueTimeout;

  constructor(private service: SequenceService) {}

  ngOnInit() {
    if (this.synth && this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = this.getVoices.bind(this);
    }
    else this.getVoices();
  }

  private getVoices() {
    this.availableVoices = this.synth.getVoices()
      .filter(voice => voice.lang.match('en'));
  }

  startSequence() {
    let sequence = this.service.getSequence();
    let voiceData = this.availableVoices
      .find(voice => voice.name === this.selectedVoice);
    this.service.currentIndex = 0;
    this.speakAndCueNext(sequence, voiceData);
    this.playing = true;
  }

  stopSequence() {
    this.synth.cancel();
    this.playing = false;
    this.service.currentIndex = null;
    clearTimeout(this.cueTimeout);
  }

  private speakAndCueNext(sequence, voice) {
    let pose = sequence[this.service.currentIndex];
    if (!pose) return this.stopSequence();
    this.speak(pose.pronunciation || pose.name, voice);
    this.cueTimeout = setTimeout(() => {
      this.service.currentIndex++;
      this.speakAndCueNext(sequence, voice);
    }, pose.breaths * Settings.secPerBreath * 1000);
  }

  private speak(text: string, voice) {
    let message = new (<any>window).SpeechSynthesisUtterance(text);
    message.voice = voice;
    this.synth.speak(message);
  }
}
