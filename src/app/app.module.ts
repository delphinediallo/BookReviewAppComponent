import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReviewService } from './review.service';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NewReviewFormComponent } from './new-review-form/new-review-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from './navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReviewMenuComponent } from './review-menu/review-menu.component';
import { ListReviewsComponent } from './list-reviews/list-reviews.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
const appRoutes: Routes = [{
  path: '',                     //default component to display
  component: ListReviewsComponent
 },  {
  path: 'addReview',         //when reviews added 
  component: NewReviewFormComponent
 },  {
  path: 'editReview/:_id',         //when reviews edited 
  component: NewReviewFormComponent
 },  {
  path: 'listReviews',       //when reviews listed
  component: ListReviewsComponent
 }, {
  path: '**',                 //when path cannot be found
  component: NotFoundComponent
 }
];

@NgModule({
  declarations: [
    AppComponent,
    NewReviewFormComponent,
    NavbarComponent,
    ReviewMenuComponent,
    ListReviewsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule

  ],
  providers: [ReviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
