import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject, map, catchError, throwError } from "rxjs";
@Injectable({providedIn: 'root'})
export class PostsService {

    error = new Subject();
    constructor(private http: HttpClient){

    }

    createAndStorePost(title:string, content:string){
        const postData: Post = {title:title, content:content};
        this.http
            .post<{name :string}>(
                'https://http-angular-5fcff-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
                postData
            )
            .subscribe(responseData => {
                console.log(responseData);
      }, (error) => {
        this.error.next(error.message)
      });
    }

    fetchPosts(){
        return this.http
            .get<{[key:string]: Post}>('https://http-angular-5fcff-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
            .pipe(map(responseData=> {
                const postsArray: Post[] = [];
                for(const key in responseData) {
                if(responseData.hasOwnProperty(key))
                    postsArray.push({...responseData[key], id:key})
                }
                return postsArray;
            }),
            catchError(errorRes => {
                //Send to analytics server
                return throwError(() => new Error(errorRes))
            })
            )
    }

    deletePosts(){
        return this.http
            .delete('https://http-angular-5fcff-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
    }
}