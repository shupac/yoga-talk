import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sequence } from '../_data/sequence.model';
import { SequenceService } from '../_data/sequence.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-sequences-list',
  templateUrl: './sequences-list.component.html',
  styleUrls: ['./sequences-list.component.css']
})
export class SequencesListComponent {

    sequences: Sequence[];

    constructor(
      private service: SequenceService,
      private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.service.getSequences().then(sequences => this.sequences = sequences);
    }

    addSequence() {
      this.service.addSequence();
    }
  }
