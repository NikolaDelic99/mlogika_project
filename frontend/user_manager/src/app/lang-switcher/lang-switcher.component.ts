import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import { MAT_SELECT_CONFIG } from '@angular/material/select';

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.css']
})
export class LangSwitcherComponent {

  currentLanguage: string = 'en';

        constructor(private translateService: TranslateService, private dateAdapter: DateAdapter<any>) {
                translateService.setDefaultLang(this.currentLanguage);
                translateService.use(this.currentLanguage);
                this.dateAdapter.setLocale(this.currentLanguage);
        }

        switchLanguage(language: string) {
                this.currentLanguage = language;
                this.translateService.use(language);
                this.dateAdapter.setLocale(language);
        }

}
