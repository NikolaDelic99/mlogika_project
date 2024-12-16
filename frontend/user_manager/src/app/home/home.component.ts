import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [TranslatePipe]
})
export class HomeComponent {

}
