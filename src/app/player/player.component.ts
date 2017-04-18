import { Component } from '@angular/core';
import { VoiceChoices } from './voice-choices';
import { SequenceService } from '../_data/sequence.service';
import { PlayerService } from '../_data/player.service';
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
  availableVoices;
  selectedVoice = Settings.defaultVoice;
  voiceData;
  playing = false;
  cueTimeout;

  constructor(
    private sequenceService: SequenceService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    if (Synth && Synth.onvoiceschanged !== undefined) {
      Synth.onvoiceschanged = this.getVoices.bind(this);
    }
    else this.getVoices();
  }

  get sequence() {
    return this.sequenceService.speechSequence;
  }

  startSequence(index?: number) {
    if (this.playing) this.stopSequence();
    this.voiceData = this.availableVoices
      .find(voice => voice.name === this.selectedVoice);
    this.sequenceService.currentSpeechIndex = index || 0;
    this.speakAndCueNext(this.sequence);
    this.playing = true;
  }

  stopSequence() {
    Synth.cancel();
    this.playing = false;
    this.sequenceService.currentSpeechIndex = null;
    clearTimeout(this.cueTimeout);
  }

  private getVoices() {
    this.availableVoices = Synth.getVoices()
      .filter(voice => voice.lang.match('en'));
  }

  private speakAndCueNext(sequence) {
    let pose = sequence[this.sequenceService.currentSpeechIndex];
    if (!pose) return this.stopSequence();
    this.speak(pose.name);
    if (Settings.breathCount) this.speak(pose.breaths + ' breaths');

    let duration = pose.duration || pose.breaths * Settings.secPerBreath;
    this.cueTimeout = setTimeout(() => {
      this.sequenceService.currentSpeechIndex++;
      this.speakAndCueNext(sequence);
    }, duration * 1000);
  }

  private speak(text: string) {
    text = Lexicon[text] || text;
    let message = new Utterance(text);
    message.voice = this.voiceData;
    Synth.speak(message);
  }
}
