import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';

@Component({
  selector: 'ngx-flyout',
  templateUrl: './flyout.component.html',
  styleUrls: ['./flyout.component.scss']
})

export class FlyoutComponent implements OnInit, OnChanges {

  @Output()
  flyoutOpened = new EventEmitter<Object>();

  @Output()
  flyoutClosed = new EventEmitter<Object>();

  @Output()
  openChange = new EventEmitter<boolean>();

  @Input()
  position = 'right';

  @Input()
  mode = 'over';

  @Input()
  open = false;

  @Input()
  showCloseButton = true;

  @Input()
  flyoutClasses = [];

  @Input()
  showBackdrop = true;

  @Input()
  hideOnBackdropClick = true;

  @Input()
  backdropClasses = [];

  @ViewChild('flyout') flyout: ElementRef;
  @ViewChild('backdrop') backdrop: ElementRef;

  _defaultFlyoutClasses = ['flyout'];

  _defaultBackdropClasses = ['backdrop'];

  constructor() { }

  ngOnInit() {
    this._renderUi();
  }

  ngOnChanges(changes): void {
    if (changes['open']) {
      if (this.open) {
        this._openFlyout();
      } else {
        this._closeFlyout();
      }
    } else {
      this._renderUi();
    }
  }

  _updateFlyoutClassList() {
    const classList = [...this._defaultFlyoutClasses, ...this.flyoutClasses, this.mode, this.position];
    if (this.open) {
      classList.push('open');
    }
    this.flyout.nativeElement.className = classList.join(' ');
  }

  _updateFlyoutTransform() {
    if (this.open) {
      this.flyout.nativeElement.style.transform = 'translate3d(0, 0, 0)';
    } else {
      const element = this.flyout.nativeElement;
      const dimension = {
        left: parseInt(element.style.left, 10) || 0,
        right: parseInt(element.style.right, 10) || 0,
        top: parseInt(element.style.top, 10) || 0,
        bottom: parseInt(element.style.bottom, 10) || 0,
        width: element.offsetWidth || 0,
        height: element.offsetHeight || 0
      };

      switch (this.position) {
        case 'top':
          this.flyout.nativeElement.style.transform = 'translate3d(0, -' + dimension.height + 'px, 0)';
          break;
        case 'bottom':
          this.flyout.nativeElement.style.transform = 'translate3d(0, ' + dimension.height + 'px, 0)';
          break;
        case 'left':
          this.flyout.nativeElement.style.transform = 'translate3d(-' + dimension.width + 'px, 0, 0)';
          break;
        default:
          this.flyout.nativeElement.style.transform = 'translate3d(' + dimension.width + 'px, 0, 0)';
          break;
      }
    }
  }

  _updateBackdropClassList() {
    const classList = [...this._defaultBackdropClasses, ...this.backdropClasses];
    if (this.showBackdrop && this.open) {
      classList.push('open');
    }
    this.backdrop.nativeElement.className = classList.join(' ');
  }

  _openFlyout() {
    this.open = true;
    this._renderUi();
    this.openChange.emit(this.open);
    this.flyoutOpened.emit();
  }

  _closeFlyout() {
    this.open = false;
    this._renderUi();
    this.openChange.emit(this.open);
    this.flyoutClosed.emit();
  }

  _renderUi() {
    this._updateBackdropClassList();
    this._updateFlyoutClassList();
    this._updateFlyoutTransform();
  }

  onCloseButtonClick($event) {
    this._closeFlyout();
  }

  onBackdropClick($event) {
    if (this.hideOnBackdropClick) {
      this._closeFlyout();
    }
  }
}
