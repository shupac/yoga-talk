import { Component } from '@angular/core';
import { VoiceChoices } from './voice-choices';
import { SequenceService } from '../sequence.service';

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

  constructor(private service: SequenceService) {

  }

  ngOnInit() {
    if (this.synth && this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = this.getVoices.bind(this);
    }
    else this.getVoices();
  }

  private getVoices() {
    this.availableVoices = this.synth.getVoices().filter(voice => voice.lang.match('en'));
  }

  startSequence() {
    let sequence = this.service.getSequence();
    let voiceData = this.availableVoices.find(voice => voice.name === this.selectedVoice);
    sequence.forEach(pose => this.speak(pose.pronunciation || pose.name, voiceData));
    // this.playing = true;


  }

  stopSequence() {
    this.synth.cancel();
    this.playing = false;
  }

  private speak(text: string, voice) {
    let message = new (<any>window).SpeechSynthesisUtterance(text);
    message.voice = voice;
    // message.lang = 'hi-IN';
    this.synth.speak(message);
  }
}
