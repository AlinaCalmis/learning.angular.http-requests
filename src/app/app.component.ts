import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  loadedPosts = [];
  isFetching = false;
  errorMsg = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient,private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.errorMsg = errorMessage
    })

    this.isFetching = true
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
      console.log(posts);
      
    }, (error) => {
      this.isFetching = false;
      this.errorMsg = error.message;
      console.log(error);
      
    })
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content)
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
      console.log(this.loadedPosts);

    }, (error) => {
      this.isFetching = false;
      this.errorMsg = error.message
      console.log(error);
      
    })
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = []
    })
  }

  onHandleError(){
    this.errorMsg = null
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe()
  }
}
