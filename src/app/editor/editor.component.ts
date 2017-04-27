import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SequenceService } from '../_data/sequence.service';
import { ModalService } from '../_data/modal.service';

import { SequenceDetailComponent } from './sequence-detail/sequence-detail.component';
import { SequenceComponent } from '../sequence/sequence.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  @ViewChild(SequenceDetailComponent)
  private sequenceDetail: SequenceDetailComponent;

  @ViewChild(SequenceComponent)
  private sequenceList: SequenceComponent;

  type: string;
  paramsSub: any;
  showDetails: boolean = false;
  showAdd: boolean = false;

  constructor(
    private service: SequenceService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: ModalService
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

  ngDoCheck() {
    if (this.target !== this.sequence) this.showAdd = false;
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
    this.modal.confirmSave();
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
    this.saveSequence();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  showAddNew() {
    this.service.currentEditNode = this.service.currentSequence;
    this.showAdd = true;
  }

  onAddNewElement() {
    setTimeout(() => {
      this.sequenceList.scrollToBottom();
    }, 100);
  }
}
