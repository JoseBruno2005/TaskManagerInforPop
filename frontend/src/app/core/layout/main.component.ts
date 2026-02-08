import { Component } from "@angular/core";
import { Navbar } from "../../shared/components/navbar/navbar.component";
import { RouterOutlet } from "@angular/router";

@Component({
    standalone: true,
    selector: 'app-main-layout',
    imports: [RouterOutlet, Navbar],
    templateUrl: './main.component.html'
})
export class MainLayoutComponent {}