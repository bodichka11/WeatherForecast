import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';

const bootstrap = () => bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      provideHttpClient(),
    ]
  });

export default bootstrap;
