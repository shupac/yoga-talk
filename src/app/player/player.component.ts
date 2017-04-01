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
  selectedVoice = 'Fiona';

  constructor(private service: SequenceService) {
  }

  ngOnInit() {
    if (this.synth && this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.availableVoices = this.synth.getVoices();
    }
  }

  startSequence() {
    let voiceData = this.availableVoices.find(voice => voice.name === this.selectedVoice);
    console.log(voiceData);
    let sequence = this.service.getSequence();
    sequence.forEach(pose => this.speak(pose.name, voiceData));
  }

  private speak(text: string, voice) {
    let speech = new (<any>window).SpeechSynthesisUtterance(text);
    speech.voice = voice;
    this.synth.speak(speech);
  }

  stopSequence() {

  }
}


