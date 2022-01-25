import { Component, OnInit } from '@angular/core';
import { Developer } from '../developer.model';
import { DevelopersService } from '../developers.service';

@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
  styleUrls: ['./developer-list.component.css']
})
export class DeveloperListComponent implements OnInit {
  developers: Developer[] = [];
  constructor(private developersService: DevelopersService) {}

  ngOnInit(): void {
    this.developers = this.developersService.getDevelopers();
    this.developersService.developersChanged.subscribe(developers => {
      this.developers = developers;
    });
  }

  onDelete(index: number) {
    this.developersService.deleteDeveloper(index);
  }

}
