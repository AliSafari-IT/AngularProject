import { Component } from '@angular/core';
import { SideBarComponent } from "../menu/side-bar/side-bar.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    imports: [SideBarComponent]
})
export class LayoutComponent {
    constructor(private router: Router) { }

    navigateTo(path: string) {
        this.router.navigateByUrl(path);
    }


}
