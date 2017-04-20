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
  paramsSub;
  showDetails: boolean = false;

  constructor(
    private service: SequenceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params
      .subscribe(params => {
        this.service.setCurrentSequence(+params['sid']);
        this.service.currentEditNode = this.service.currentSequence;
        this.toggleSort({type: null});
      });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  get sequence() {
    return this.service.currentSequence;
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

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  saveSequence() {
    this.service.saveCurrentSequence();
  }

  deletePose(pose) {
    this.service.deletePose(pose.id);
    this.service.currentEditNode = this.service.currentSequence;
  }

  deleteSeries(series) {
    this.service.deleteSeries(series.id);
    this.service.currentEditNode = this.service.currentSequence;
  }

  deleteSequence(sequence) {
    this.service.deleteSequence(sequence.id);
    this.router.navigate(['']);
  }

  resetEditNode() {
    this.service.currentEditNode = this.service.currentSequence;
  }

  finish() {
    this.service.currentEditNode = null;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
