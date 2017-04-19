import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SequenceService } from '../_data/sequence.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  type: string;
  sequence;
  paramsSub;

  constructor(
    private service: SequenceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params
      .subscribe(params => {
        this.sequence = this.service.getSequence(+params['sid']);
        this.toggleSort({type: null});
      });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  get target() {
    return this.service.currentEditNode;
  }

  get sortRoot() {
    return this.service.sortRoot;
  }

  toggleSort(target) {
    this.service.toggleSort(target.type);
  }

  deletePose(pose) {
    this.service.currentSequence.deletePose(pose);
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  deleteSeries(series) {
    this.service.currentSequence.deleteSeries(series);
  }
}
