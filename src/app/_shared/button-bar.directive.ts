import {
  Directive, ElementRef, HostListener, HostBinding,
  Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[myButtonBar]',
})
export class ButtonBarDirective {
  @Input() value: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter();
  @HostBinding('style.display') display = 'inline-flex';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    let children = this.el.nativeElement.children;
    for (let i = 0; i < children.length; i++) {
      children[i].style.float = 'left';
    }
    let after = document.createElement('div');
    after.innerHTML = '';
    after.style.display = 'table';
    after.style.clear = 'both';
    this.el.nativeElement.appendChild(after);
  }

  setValue(value) {
    this.value = value;
    this.valueChange.emit(value);
  }
}

@Directive({
  selector: '[myRadioValue]',
})
export class RadioButtonDirective {
  @Input() myRadioValue: string;
  @HostListener('click') onClick() {
    this.parent.setValue(this.myRadioValue);
  }
  @HostBinding('class') class = 'radio-button';
  @HostBinding('class.radio-button-selected') isSelected: boolean = false;

  constructor(
    private parent: ButtonBarDirective
  ) {}

  ngDoCheck() {
    this.isSelected = this.parent.value === this.myRadioValue;
  }
}
