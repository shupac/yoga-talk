import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SequenceService } from '../_data/sequence.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  paramsSub;

  constructor(
    private service: SequenceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params
      .subscribe(params => {
        this.service.setCurrentSequence(+params['id']);
      });

    this.service.getSequences();
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  addSequence() {
    this.service.addSequence();
  }
}
