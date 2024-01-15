import { ApplicationConfig } from '@angular/core';

import { provideRouter, withDebugTracing } from '@angular/router';
import { routes } from './app.routes';
import { AppModule } from './app.module';

// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes), provideClientHydration(), provideAnimations()]
// };


export const appConfig: ApplicationConfig = {
  // providers: [provideRouter(routes, withDebugTracing())]
  providers: [AppModule]
}