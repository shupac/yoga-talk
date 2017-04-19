import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Sequence } from '../_data/sequence.model';
import { SequenceService } from '../_data/sequence.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-sequences-list',
  templateUrl: './sequences-list.component.html',
  styleUrls: ['./sequences-list.component.css']
})
export class SequencesListComponent {
  paramsSub;
  target;

  constructor(
    private service: SequenceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.target = this.service.getSequence(+params['id']);
    });
  }

  ngOnDestroy () {
    this.paramsSub.unsubscribe();
  }

  // get target() {
  //   return this.service.currentSequence;
  // }

  get sequences() {
    return this.service.sequences;
  }

  addSequence() {
    this.service.addSequence();
  }
}
