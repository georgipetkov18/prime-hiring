import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Developer } from '../developer.model';
import { DevelopersService } from '../developers.service';

@Component({
  selector: 'app-developer-form',
  templateUrl: './developer-form.component.html',
  styleUrls: ['./developer-form.component.css']
})
export class DeveloperFormComponent implements OnInit {
  @Input('isCreation') isCreation = true;
  form!: FormGroup;
  mode = 'Create'
  developerId = -1;


  constructor(
    private developersService: DevelopersService,
    private route: ActivatedRoute,
    private router: Router) { }

  initForm() {
    let name = '';
    let email = '';
    let phone = '';
    let location = '';
    let picUrl = '';
    let price = null;
    let tech = '';
    let description = '';
    let xp = null;
    let language = '';
    let linkedIn = '';

    if (!this.isCreation) {
      let developer = this.developersService.getDeveloper(this.developerId);
      name = developer.name;
      email = developer.email;
      phone = developer.phoneNumber;
      location = developer.location;
      picUrl = developer.profilePicUrl;
      price = developer.pricePerHour;
      tech = developer.technology;
      description = developer.description;
      xp = developer.yearsOfExperience;
      language = developer.nativeLanguage;
      linkedIn = developer.linkedInLink;
    }

    this.form = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'email': new FormControl(email, [Validators.required, Validators.email]),
      'phone': new FormControl(phone, Validators.required),
      'location': new FormControl(location,Validators.required),
      'picUrl': new FormControl(picUrl),
      'price': new FormControl(price, Validators.required),
      'tech': new FormControl(tech, Validators.required),
      'description': new FormControl(description),
      'xp': new FormControl(xp, Validators.required),
      'language': new FormControl(language, Validators.required),
      'linkedIn': new FormControl(linkedIn),
    });
  }

  ngOnInit(): void {
    if (!this.isCreation) {
      this.mode = 'Edit';
      this.route.params.subscribe((params: Params) => {
        this.developerId = +params['id'];
        this.initForm();
      });
    }
    else {
      this.initForm();
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    let name = this.form.value['name'];
    let email = this.form.value['email'];
    let phone = this.form.value['phone'];
    let location = this.form.value['location'];
    let picUrl = this.form.value['picUrl'];
    let price = +this.form.value['price'];
    let tech = this.form.value['tech'];
    let description = this.form.value['description'];
    let xp = +this.form.value['xp'];
    let language = this.form.value['language'];
    let linkedIn = this.form.value['linkedIn'];

    const developer = new Developer(
      name, email, phone,
      location, picUrl, price,
      tech, description, xp, language, linkedIn);
    if (this.isCreation) {
      this.developersService.createDeveloper(developer);
    }

    else {
      this.developersService.editDeveloper(this.developerId, developer);
    }
    this.router.navigate(['/'], { relativeTo: this.route })
  }
}
