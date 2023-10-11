import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class LoggingInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Logging interceptor is here");
        console.log(req.headers);
        
        return next.handle(req).pipe(tap(event => {
            // in interceptor we always get an event
            if(event.type === HttpEventType.Response){
                console.log("Incomming event");
                console.log(event.body);
            }
        }))
    }
}