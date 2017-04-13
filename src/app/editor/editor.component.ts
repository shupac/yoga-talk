import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SequenceService } from '../_data/sequence.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  type: string;
  target;
  paramsSub;

  constructor(
    private service: SequenceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params
      .subscribe(params => {
        this.type = params['type'] || 'sequence';
        this.target = this.service.getNode(params['type'], +params['id']);
      });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
