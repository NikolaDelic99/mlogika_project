import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { LangSwitcherComponent } from './lang-switcher/lang-switcher.component';
import { SharedModule } from './shared/shared.module';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [SharedModule,LangSwitcherComponent]
})
export class AppComponent {
  title = 'user_manager';
  modules = environment.modules;
}
