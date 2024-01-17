import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IDropDownMenuItem } from '../../../interfaces/dropdownMenu';

@Component({
    selector: 'app-side-bar',
    standalone: true,
    template: `
    <ul class="dropdown-menu" *ngIf="menuItems">
    <li *ngFor="let item of menuItems.submenu; let i = index" class="dropdown-item"
        [ngClass]="{'dropdown-submenu-items': item.submenu, 'open': item.submenuVisible}">
        <a class="dropdown-link" href="#" (click)="item.link ? navigateTo(item.link) : toggleSubmenu(i, null, null); $event.preventDefault()">
            {{item.title}}
        </a>
        <ul class="dropdown-submenu-items" *ngIf="item.submenu && item.submenuVisible">
            <li *ngFor="let subItem of item.submenu; let j = index" class="dropdown-submenu-item">
                <a class="dropdown-link" href="#" (click)="subItem.link ? navigateTo(subItem.link) : toggleSubmenu(i, j, null); $event.preventDefault()">
                    {{subItem.title}}
                </a>
                <ul class="dropdown-ssubmenu-items" *ngIf="subItem.submenu && subItem.submenuVisible">
                    <li *ngFor="let ssubItem of subItem.submenu; let k = index" class="dropdown-submenu-item">
                        <a class="dropdown-link" href="#" (click)="ssubItem.link ? navigateTo(ssubItem.link) : toggleSubmenu(i, j, k); $event.preventDefault()">
                            {{ssubItem.title}}
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="dropdown-divider" *ngIf="item.divider"></div>
    </li>
</ul>
    `,
    styleUrl: './side-bar.component.css',
    imports: [CommonModule]
})
export class SideBarComponent {
    hovered = false;
    title = 'dropdown-menu';
    visiblity: boolean = false;
    visState = 'show';
    toggle() {
        this.visiblity = !this.visiblity;
        this.visState = this.visiblity ? 'show' : 'hide';
    } constructor(private router: Router) { }
    navigateTo(path: string) {
        this.router.navigateByUrl(path);
    }
    // Your component logic goes here
    menuItems: IDropDownMenuItem =
        {
            title: 'Angular Material',
            submenu: [
                {
                    title: 'Data Table',
                    submenu: [
                        { title: 'Employee List', link: '/material/employee-list' },
                        { title: 'Person List', link: '/material/person-list' }
                    ],
                    submenuVisible: false,
                },
                {
                    title: 'Forms',
                    submenu: [
                        { title: 'Add Employee Form', link: '/material/add-employee-form' },
                        { title: 'Add Person Form', link: '/material/add-person-form' }
                    ],
                    submenuVisible: false
                },
                {
                    title: 'Cards', submenu: [
                        { title: 'Employee Details', link: '/material/employee-details-card' },
                        { title: 'Person Details', link: '/material/person-details-card' }
                    ],
                    submenuVisible: false
                },
                {
                    title: 'Charts', submenu: [
                        { title: 'Employee Chart', link: '/material/employee-chart' },
                        { title: 'Person Chart', link: '/material/person-chart' }
                    ],
                    submenuVisible: false
                }

            ],
            submenuVisible: false,
            toggleSubmenu: () => { },
            closeSubmenu: () => { },
            openSubmenu: () => { },
            closeAllSubmenus: () => { },
            divider: true
        };

    // Add methods to toggle visibility of submenus
    toggleSubmenu(mainIndex: number, subIndex: number | null, subSubIndex: number | null) {
        console.log(`Toggling submenu at mainIndex: ${mainIndex}, subIndex: ${subIndex}, subSubIndex: ${subSubIndex}`);
        if (this.menuItems && this.menuItems.submenu) {

            // Close all other submenus at the top level
            this.menuItems.submenu.forEach((item, idx: number) => {
                if (idx !== mainIndex) item.submenuVisible = false;
            });

            if (subIndex === null) {
                // Toggle the selected top-level submenu
                this.menuItems.submenu[mainIndex].submenuVisible = !this.menuItems.submenu[mainIndex].submenuVisible;
            } else {
                // Close all other submenus at the first nested level
                this.menuItems.submenu[mainIndex].submenu!.forEach((subItem, idx: number) => {
                    if (idx !== subIndex) subItem.submenuVisible = false;
                });

                if (subSubIndex === null) {
                    // Toggle the selected first-level nested submenu
                    this.menuItems.submenu[mainIndex].submenu![subIndex].submenuVisible = !this.menuItems.submenu[mainIndex].submenu![subIndex].submenuVisible;
                } else {
                    // Close all other submenus at the second nested level
                    this.menuItems.submenu[mainIndex].submenu![subIndex].submenu!.forEach((subSubItem, idx: number) => {
                        if (idx !== subSubIndex) subSubItem.submenuVisible = false;
                    });

                    // Toggle the selected second-level nested submenu
                    this.menuItems.submenu[mainIndex].submenu![subIndex].submenu![subSubIndex].submenuVisible = !this.menuItems.submenu[mainIndex].submenu![subIndex].submenu![subSubIndex].submenuVisible;
                }
            }
        }
    }
}
