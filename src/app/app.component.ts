import { Component, OnInit } from '@angular/core';
import { ReviewService } from './review.service';  
 
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title ='Book Review';
  //declare variable to hold response and make it public to be accessible from components.html
  public reviews;
  //initialize the call using ReviewService 
  constructor(private _myService: ReviewService) { }
  ngOnInit() {
    this.getReviews();
  }
  //method called OnInit
  getReviews() {
   this._myService.getReviews().subscribe(
      //read data and assign to public variable reviews
      data => { this.reviews = data},
      err => console.error(err),
      () => console.log('finished loading')
    );
  } 
  onDelete(reviewId: string) {
    this._myService.deleteReview(reviewId);
  }
 
}
