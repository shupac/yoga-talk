import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VoiceChoices } from './voice-choices';
import { SequenceService } from '../_data/sequence.service';
import { PlayerService } from '../_data/player.service';
import { Settings } from '../settings';
import { Synth, Utterance } from './speech';
import Lexicon from './lexicon';
import Lexicon2 from './lexicon2';
import { PlayerItemComponent } from './player-item/player-item.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  zone: NgZone;
  paramsSub: any;
  dataSub: any;
  isPreview: false;
  voices = VoiceChoices;
  availableVoices;
  selectedVoice = Settings.defaultVoice;
  voiceData;
  playing = false;
  cueTimeout;
  itemIndex = 0;
  currentMessage;

  constructor(
    private sequenceService: SequenceService,
    private playerService: PlayerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.zone = new NgZone({enableLongStackTrace: false});
  }

  ngOnInit() {
    this.getVoices();
    if (Synth && Synth.onvoiceschanged !== undefined) {
      Synth.onvoiceschanged = this.getVoices.bind(this);
    }
    else this.getVoices();

    this.paramsSub = this.route.params
      .subscribe(params => {
        this.sequenceService.setCurrentSequence(+params['sid']);
        this.playerService.setCurrentSequence(this.sequenceService.currentSequence);
      });

    this.dataSub = this.route.data
      .subscribe(data => {
        this.isPreview = data['preview'];
      });

    PlayerItemComponent.nextId = 0;
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.dataSub.unsubscribe();
  }

  get displaySequence() {
    return this.sequenceService.currentSequence;
  }

  get speechSequence() {
    return this.speechSequence.sequence;
  }

  get currentNode() {
    return this.playerService.currentNode;
  }

  startSequence(index?: number) {
    if (this.playing) this.stopSequence();
    this.voiceData = this.availableVoices
      .find(voice => voice.name === this.selectedVoice);
    this.playerService.currentIndex = index || 0;
    this.playing = true;
    if (!this.isPreview) this.speak('Starting sequence in 5 seconds', 0, () => {
      setTimeout(this.speakCurrentNode.bind(this), 5000);
    });
    else this.speakCurrentNode();
  }

  stopSequence() {
    Synth.cancel();
    this.playing = false;
    this.playerService.currentIndex = null;
    clearTimeout(this.cueTimeout);
    if (this.currentMessage) this.currentMessage.onend = null;
    this.currentMessage = null;
  }

  goBack() {
    this.stopSequence();
    let url;
    if (this.isPreview) url = '../edit';
    else url = '../'
    this.router.navigate([url], { relativeTo: this.route });
  }

  private getVoices() {
    this.availableVoices = Synth.getVoices()
      .filter(voice => voice.lang.match('en'));
  }

  private speakCurrentNode() {
    let node = this.playerService.currentNode;
    if (!node) {
      this.stopSequence();
      return;
    }
    let text = node.name;
    if (Settings.sayBreathCount && node.duration) {
      let timing = node.duration > 1 ? node.timing : node.timing.substring(0, node.timing.length - 1);
      text += ', ' + node.duration + ' ' + timing;
    }

    let duration;
    if (node.timing === 'minutes') duration = node.duration * 60;
    else if (node.timing) duration = node.duration * node.speed;
    else duration = 0;

    if (node.release) this.speak(text, duration, this.sayRelease.bind(this));
    else this.speak(text, duration, this.cueNext.bind(this));
  }

  private speak(text: string, pause?: number, onend?: () => any) {
    // text = Lexicon[text] || text;
    Lexicon2.forEach(word => {
      text = text.toLowerCase().replace(word.name, word.sound);
    });
    let message = new Utterance(text);
    message.voice = this.voiceData;
    message.rate = 0.9;
    message.onend = () => this.cueTimeout = setTimeout(onend, pause * 1000);
    this.currentMessage = message;
    Synth.speak(message);
  }

  private sayRelease() {
    let node = this.playerService.currentNode;
    let text, pause;
    if (node.timing === 'rounds') {
      text = 'finish round';
      pause = 15;
    }
    else {
      text = 'release';
      pause = 5;
    }
    this.speak(text, pause, this.cueNext.bind(this));
  }

  private cueNext() {
    this.cueTimeout = setTimeout(() => {
      this.zone.run(() => {
        this.playerService.currentIndex++;
        this.speakCurrentNode();
      });
    }, ( Settings.previewPause ) * 1000);
  }
}
