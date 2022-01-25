import { Component, OnInit } from '@angular/core';
import { HiringInfo, HiringService } from '../hiring.service';

@Component({
  selector: 'app-hiring-list',
  templateUrl: './hiring-list.component.html',
  styleUrls: ['./hiring-list.component.css']
})
export class HiringListComponent implements OnInit {
  information: HiringInfo[] = [];
  developersEmails: string[] = [];
  constructor(private hiringService: HiringService) { }

  ngOnInit(): void {
    this.information = this.hiringService.getHiringInformation();
  }

}
