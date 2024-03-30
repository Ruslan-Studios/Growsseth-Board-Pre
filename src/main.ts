import { bootstrapApplication, provideProtractorTestingSupport } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { MenuComponent } from "./app/components/menu.component";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routes)
  ]
}).catch((err) =>
  console.error(err),
);