import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
   selector: 'app-main-container',
   imports: [
     SharedModule
   ],
   templateUrl: './main-container.component.html',
   styleUrl: './main-container.component.css',
   standalone: true 
})
export class MainContainerComponent { }
