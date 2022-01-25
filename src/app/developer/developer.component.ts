import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Developer } from '../developer.model';
import { DevelopersService } from '../developers.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit {
  developer!: Developer;
  developerId = -1;
  constructor(
    private developersService: DevelopersService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.developerId = +params['id'];
      this.developer = this.developersService.getDeveloper(this.developerId);
    })
  }

  onHire() {
    this.router.navigate(['/hire'], {queryParams: {devId: this.developerId}});
  }

  onDelete() {
    this.developersService.deleteDeveloper(this.developerId);
    this.router.navigate(['/']);
  }

}
