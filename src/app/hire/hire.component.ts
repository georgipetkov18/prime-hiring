import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Developer } from '../developer.model';
import { DevelopersService } from '../developers.service';
import { HiringService } from '../hiring.service';

@Component({
  selector: 'app-hire',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.css']
})
export class HireComponent implements OnInit {
  developers!: Developer[];
  toBeHiredDevelopers: Developer[] = [];
  alreadyHiredDevelopers: Developer[] = [];
  error = {
    occured: false,
    message: '',
  }

  constructor(
    private developersService: DevelopersService,
    private hiringService: HiringService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.developers = this.developersService.getDevelopers();
    this.route.queryParams.subscribe((query: Params) => {
      if (!query['devId']) {
        return;
      }
      let index = +query['devId'];
      let selectedDeveloper = this.developersService.getDeveloper(index);
      this.toBeHiredDevelopers.push(selectedDeveloper);
    });

  }

  onHire(developer: Developer) {
    if (this.toBeHiredDevelopers.some(d => d.email === developer.email)) {
      return;
    }
    this.toBeHiredDevelopers.push(developer);
  }

  onRemove(developer: Developer) {
    let index = this.toBeHiredDevelopers.indexOf(developer);
    this.toBeHiredDevelopers.splice(index, 1);
  }

  onSubmit(form: NgForm) {
    if (this.toBeHiredDevelopers.length <= 0) {
      this.error.occured = true;
      this.error.message = 'No developers are chosen';
      return;
    }
    this.alreadyHiredDevelopers = [];
    let startDate = new Date(form.value['startDate']);
    let endDate = new Date(form.value['endDate']);

    if (isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime()) ||
      startDate.getTime() < new Date().getTime() ||
      endDate.getTime() < new Date().getTime()) {
        this.error.occured = true;
        this.error.message = 'You cannot assign date in the past';
      return;
    }

    this.alreadyHiredDevelopers = this.toBeHiredDevelopers.filter(d =>
      this.hiringService.isHired(d, startDate, endDate)
    );

      console.log(this.alreadyHiredDevelopers);
      
    if (this.alreadyHiredDevelopers.length > 0) {
      this.error.occured = true;
      this.error.message = 'Developers are already hired: ' + 
        this.alreadyHiredDevelopers
        .map(dev => dev.email)
        .reduce((acc, email) => acc+=`${email}, `, '')
      return;
    }
    let notHiredDevelopers = this.toBeHiredDevelopers.filter(d =>
      !this.hiringService.isHired(d, startDate, endDate)
    );
    this.hiringService.hireDevelopers(notHiredDevelopers, startDate, endDate);
    this.router.navigate(['/hiring-list'])
  }

}
