import { Component, OnInit } from '@angular/core';

@Component({
  
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar">
        <ng-content select="nb-menu"></ng-content>

        <div>
          <ng-content>
          </ng-content>
        </div>
        <div style="margin-top: 2.5rem;">
        <ng-content slelct="[menu-footer]">
        </ng-content>
        </div>
        
      </nb-sidebar>

      <nb-layout-column style="position: relative; background: #ffffff; padding: 0px;">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

<!--      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer> -->
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent  {
}
