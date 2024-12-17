import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; 
import { RouterModule } from '@angular/router'; 
import { MatMenuModule } from '@angular/material/menu';
import { LangSwitcherComponent } from '../../lang-switcher/lang-switcher.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-main-container',
   imports: [
     CommonModule,
     MatButtonModule, 
     RouterModule, 
     MatMenuModule, 
     LangSwitcherComponent, 
     MatTooltipModule, 
     TranslateModule
   ],
   templateUrl: './main-container.component.html',
   styleUrl: './main-container.component.css',
   standalone: true 
})
export class MainContainerComponent { }
