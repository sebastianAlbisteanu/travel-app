import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { StoreService } from './store.service';
import { routerTransition } from './router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent {
  constructor(public router: Router, private storeService: StoreService) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          this.storeService.updatePage('index');
        } else {
          this.storeService.updatePage(event.url.substring(1));
        }
      }
    });
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
