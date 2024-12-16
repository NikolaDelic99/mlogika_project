import { Component } from '@angular/core';
import { TranslateService, TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { DateAdapter, MatOption } from '@angular/material/core';
import { MAT_SELECT_CONFIG, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-lang-switcher',
    templateUrl: './lang-switcher.component.html',
    styleUrls: ['./lang-switcher.component.css'],
    imports: [MatSelect, MatSelectTrigger, MatIcon, NgClass, MatOption, TranslateDirective, TranslatePipe]
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
