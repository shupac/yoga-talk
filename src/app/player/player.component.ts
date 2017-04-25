import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VoiceChoices } from './voice-choices';
import { SequenceService } from '../_data/sequence.service';
import { PlayerService } from '../_data/player.service';
import { Settings } from '../settings';
import { Synth, Utterance } from './speech';
import Lexicon from './lexicon';
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
    console.log('start', index);
    if (this.playing) this.stopSequence();
    this.voiceData = this.availableVoices
      .find(voice => voice.name === this.selectedVoice);
    this.playerService.currentIndex = index || 0;
    console.log(this.playerService.currentIndex);
    this.playing = true;
    this.speakCurrentNode();
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
    if (Settings.sayBreathCount) text += ' ' + node.duration + ' ' + node.timing;
    this.speak(text);
  }

  private speak(text: string) {
    text = Lexicon[text] || text;
    let message = new Utterance(text);
    message.voice = this.voiceData;
    message.rate = 0.85;
    message.onend = this.cueNextNode.bind(this);
    this.currentMessage = message;
    Synth.speak(message);
  }

  private cueNextNode(e) {
    console.log('cue next');
    let node = this.playerService.currentNode;
    if (!node) {
      this.stopSequence();
      return;
    }

    let duration;
    if (node.timing === 'minutes') duration = node.duration * 60;
    else if (node.timing) duration = node.duration * node.speed;
    else duration = 0;
    if (this.isPreview) duration = 0;
    
    this.cueTimeout = setTimeout(() => {
      this.zone.run(() => {
        this.playerService.currentIndex++;
        this.speakCurrentNode();
      });
    }, duration * 1000);

  }
}
