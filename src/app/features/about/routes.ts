import { Routes } from "@angular/router";
import { About } from "../../about/about";

export const ABOUT_ROUTES: Routes = [
    {path: '', component: About, pathMatch: 'full'}
];