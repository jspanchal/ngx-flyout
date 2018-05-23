import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';

@Component({
  selector: 'ngx-flyout',
  templateUrl: './flyout.component.html',
  styleUrls: ['./flyout.component.scss']
})

export class FlyoutComponent implements OnInit, OnChanges {

  /**
   * Fired when flyout is opened
   *
   * @memberof FlyoutComponent
   */
  @Output()
  flyoutOpened = new EventEmitter<Object>();

  /**
   * Fired when flyout is closed
   *
   * @memberof FlyoutComponent
   */
  @Output()
  flyoutClosed = new EventEmitter<Object>();

  /**
   * Use for two way data binding on open
   *
   * @memberof FlyoutComponent
   */
  @Output()
  openChange = new EventEmitter<boolean>();

  /**
   * Position of layout
   * left, right, top, bottom
   *
   * @memberof FlyoutComponent
   */
  @Input()
  position = 'right';


  /**
   * Whether flyout is open or not
   * 
   * @memberof FlyoutComponent
   */
  @Input()
  open = false;

  /**
   * Whether to show close button or not
   * 
   * @memberof FlyoutComponent
   */
  @Input()
  showCloseButton = true;

  /**
   * Additional css classes to style flyout
   * 
   * @memberof FlyoutComponent
   */
  @Input()
  flyoutClasses = [];

  /**
   * Whether to show backdrop or not
   * 
   * @memberof FlyoutComponent
   */
  @Input()
  showBackdrop = true;

  /**
   * Whether to close flyout when clicked on backdrop
   * 
   * @memberof FlyoutComponent
   */
  @Input()
  hideOnBackdropClick = true;

  /**
   * Additional css classes to style backdrop
   * 
   * @memberof FlyoutComponent
   */
  @Input()
  backdropClasses = [];

  /**
   * Flyout element reference
   *
   * @memberof FlyoutComponent
   */
  @ViewChild('flyout') flyout: ElementRef;

  /**
   * Backdrop element reference
   *
   * @memberof FlyoutComponent
   */
  @ViewChild('backdrop') backdrop: ElementRef;


  /**
   * Default css classes which will be applied on flyout
   *
   * @memberof FlyoutComponent
   */
  _defaultFlyoutClasses = ['flyout'];

  /**
   * Default css classes which will be applied on backdrop
   *
   * @memberof FlyoutComponent
   */
  _defaultBackdropClasses = ['backdrop'];

  constructor() { }

  ngOnInit() {
    this._renderUi();
    this._enableAnimation();
  }

  /**
   * Handle ngOnChanges event
   *
   * @memberof FlyoutComponent
   */
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

  /**
   * Update css classes on flyout
   *
   * @memberof FlyoutComponent
   */
  _updateFlyoutClassList() {
    const classList = [...this._defaultFlyoutClasses, ...this.flyoutClasses, this.position];
    if (this.open) {
      classList.push('open');
    }
    this.flyout.nativeElement.className = classList.join(' ');
  }

  /**
   * Update transporm property of flyout
   *
   * @memberof FlyoutComponent
   */
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

  /**
   * Update css classes on backdrop element
   *
   * @memberof FlyoutComponent
   */
  _updateBackdropClassList() {
    const classList = [...this._defaultBackdropClasses, ...this.backdropClasses];
    if (this.showBackdrop && this.open) {
      classList.push('open');
    }
    this.backdrop.nativeElement.className = classList.join(' ');
  }

  /**
   * Open/Show flyout
   *
   * @memberof FlyoutComponent
   */
  _openFlyout() {
    this.open = true;
    this._renderUi();
    this.openChange.emit(this.open);
    this.flyoutOpened.emit();
  }

  /**
   * Close/Hide flyout
   *
   * @memberof FlyoutComponent
   */
  _closeFlyout() {
    this.open = false;
    this._renderUi();
    this.openChange.emit(this.open);
    this.flyoutClosed.emit();
  }

  /**
   * Render the UI
   *
   * @memberof FlyoutComponent
   */
  _renderUi() {
    this._updateBackdropClassList();
    this._updateFlyoutClassList();
    this._updateFlyoutTransform();
  }

  /**
   * Make flyout animated
   *
   * @memberof FlyoutComponent
   */
  _enableAnimation() {
    this._defaultFlyoutClasses.push('animated');
  }

  /**
   * Handle close button click event
   *
   * @memberof FlyoutComponent
   */
  onCloseButtonClick($event) {
    this._closeFlyout();
  }

  /**
   * Handle backdrop click event
   *
   * @memberof FlyoutComponent
   */
  onBackdropClick($event) {
    if (this.hideOnBackdropClick) {
      this._closeFlyout();
    }
  }
}
