import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { DeveloperFormComponent } from './developer-form/developer-form.component';
import { DeveloperListComponent } from './developer-list/developer-list.component';
import { DeveloperComponent } from './developer/developer.component';
import { HireComponent } from './hire/hire.component';
import { HiringListComponent } from './hiring-list/hiring-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'create', component: CreateComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'developer/:id', component: DeveloperComponent},
  {path: 'hire', component: HireComponent},
  {path: 'hiring-list', component: HiringListComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    HomeComponent,
    EditComponent,
    DeveloperFormComponent,
    DeveloperListComponent,
    DeveloperComponent,
    HireComponent,
    HiringListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
