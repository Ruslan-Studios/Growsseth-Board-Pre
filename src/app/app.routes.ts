import { Routes } from "@angular/router";
import { MenuComponent } from "./components/menu/menu.component";
import { CreateGameComponent } from "./components/creategame/creategame.component";
import { OptionsComponent } from "./components/options/options.component";
import { SearchGameComponent } from "./components/searchgame/searchgame.component";
import { JoinRandomComponent } from "./components/joinrandom/joinrandom.component";
import { MainmenuComponent } from "./components/mainmenu/mainmenu.component";
import { LobbyRoomComponent } from "./components/lobby-room/lobby-room.component";

export const routes: Routes = [
    {path: '', component: MenuComponent},
    {path: 'options', component: OptionsComponent},
    {path: 'createGame', component: CreateGameComponent},
    {path: 'searchGame', component: SearchGameComponent},
    {path: 'searchRandom', component: JoinRandomComponent},
    {path: 'lobbyRoom', component: LobbyRoomComponent},
    {path: 'threeScene', component: MainmenuComponent}
];
