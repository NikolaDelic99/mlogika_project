import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { LangSwitcherComponent } from './lang-switcher/lang-switcher.component';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [MatButton, RouterLink, MatMenuTrigger, MatMenu, MatMenuItem, LangSwitcherComponent, MatTooltip, RouterOutlet, TranslatePipe]
})
export class AppComponent {
  title = 'user_manager';
}
