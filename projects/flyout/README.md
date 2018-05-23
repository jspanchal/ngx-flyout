[demo](http://codetonics.com/ngx-flyout/demo)

[![NPM](https://nodei.co/npm/ngx-flyout.png)](https://www.npmjs.com/package/ngx-flyout)

No Drama Sidebar/Flyout/Sidenav Component For Angular 6 and greater.

## Installation

```shell
npm i ngx-flyout --save
```

## Changelog

See the [releases page](https://github.com/codetonics/ngx-flyout/releases) on GitHub.


## Usage

Add `FlyoutModule` to your app module:

```typescript
import { FlyoutModule } from 'ngx-flyout';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FlyoutModule],
  bootstrap: [AppComponent],
})
class AppModule {}
```

In your app component, simply use add a `<ngx-flyout>` wrapper, then place the content you want in your flyout within it.

```typescript
@Component({
  selector: 'app',
  template: `
    <!-- Container for sidebar(s) + page content -->
    <ngx-flyout [(open)]="openFlyout">
        <ul>
            <li>Menu 1</li>
            <li>Menu 2</li>
            <li>Menu 3</li>
        </ul>
    </ngx-flyout>

    <button (click)="toggleSidebar">
        Toggle Flyout
    </button>
  `
})
class AppComponent {
  private openFlyout: boolean = false;

  private toggleSidebar() {
    this.openFlyout = !this.openFlyout;
  }
}
```

## Options

### Inputs

| Property name | Type | Default | Description |
| ------------- | ---- | ------- | ----------- |
| open | boolean | `false` | Controls the open state of the flyout. This should be two-way bound. |
| position | `'left'`, `'right'`, `'top'`, `'bottom'` | `'right'` | What side the flyout should open. |
| showCloseButton | `showCloseButton: boolean` | true | Controls visibility of close button. |
| flyoutClasses | `flyoutClasses: string[]` | | Additional styling classes for flyout. |
| showBackdrop | `showBackdrop: boolean` | true | Controls visiblity of backdrop. |
| hideOnBackdropClick | `hideOnBackdropClick: boolean` | true | If clicking on backdrop closes the flyout or not.  |
| backdropClasses | `backdropClasses: string[]` | | Additional styling classes for backdrop |

#### Outputs

| Property name | Callback arguments | Description |
| ------------- | ------------------ | ----------- |
| flyoutOpened | | Emitted when flyout is opened. |
| flyoutClosed | | Emitted when flyout is closed. |
| openChange | `open: boolean` | Emitted when `open` is modified. This allows to do "two-way binding" |