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
  voiceData;
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
    this.synth.cancel();
    this.playing = false;
    this.service.currentIndex = null;
    clearTimeout(this.cueTimeout);
  }

  private speakAndCueNext(sequence) {
    let pose = sequence[this.service.currentIndex];
    if (!pose) return this.stopSequence();
    this.speak(pose.pronunciation || pose.name);
    this.speak(pose.breaths + ' breaths');
    this.cueTimeout = setTimeout(() => {
      this.service.currentIndex++;
      this.speakAndCueNext(sequence);
    }, pose.breaths * Settings.secPerBreath * 1000);
  }

  private speak(text: string) {
    let message = new (<any>window).SpeechSynthesisUtterance(text);
    message.voice = this.voiceData;
    this.synth.speak(message);
  }
}
