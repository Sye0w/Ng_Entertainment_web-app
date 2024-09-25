import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SearchComponent } from "../../components/search/search.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, SearchComponent,RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent {

}
