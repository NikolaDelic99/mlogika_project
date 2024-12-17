import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MAT_SELECT_CONFIG } from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lang-switcher',
  standalone: true,
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.css'],
  imports: [
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    TranslateModule, 
  ],
  providers: [
    {
      provide: MAT_SELECT_CONFIG,
      useValue: { overlayPanelClass: 'lang-panel' },
    },
  ],
})
export class LangSwitcherComponent {
  currentLanguage = 'en';

  constructor(
    private translate: TranslateService,
    private dateAdapter: DateAdapter<any>
  ) {
    this.currentLanguage = this.translate.currentLang || 'en';
  }

  switchLanguage(lang: string) {
    this.currentLanguage = lang;
    this.translate.use(lang);
    this.dateAdapter.setLocale(lang);
  }
}



