import { Routes } from "@angular/router";
import { MenuComponent } from "./components/menu.component";
import { GameComponent } from "./components/game.component";

export const routes: Routes = [
    {path: '', component: MenuComponent},
    {path: 'game', component: GameComponent}
];
