import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post<{name :string}>(
        'https://http-angular-5fcff-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http
      .get<{[key:string]: Post}>('https://http-angular-5fcff-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
      .pipe(map(responseData=> {
        const postsArray: Post[] = [];
        for(const key in responseData) {
          if(responseData.hasOwnProperty(key))
            postsArray.push({...responseData[key], id:key})
        }
        return postsArray;
      }))
      .subscribe(posts => {
        this.loadedPosts = posts;
        this.isFetching = false;
        console.log(posts)
      })
  }
}
