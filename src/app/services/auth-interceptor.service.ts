import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private oktaAuthService : OktaAuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return from(this.handleAccess(request,next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    
    // only add access token for secured endpoints
    const securedEndPoints = ['http://localhost:8080/api/orders'];

    // check if the proccess request url matches(thesame) one of the secured endpoints.
    if(securedEndPoints.some(url => request.urlWithParams.includes(url))){

      // if it does match get access token
      // awiat => it's telling to wait on the line of code untill the we get access token from oktaAuthService
      // getAccessToken method is async method.
      const accessToken = await this.oktaAuthService.getAccessToken();

      // clone the request and add a new header with access token
      /* we clone the request because the requst is immutable(can't be change it directly).. 
      so we make copy of it and then we change it accordignly. */
      request = request.clone({
        setHeaders : {
          Authorization : 'Bearer ' + accessToken 
        }
      }) 
    }
  
    /* here we want to contunie for other interceptors that are waiting till all is done
      if there no interceptors we just gonna make call to the given rest api only*/
  return next.handle(request).toPromise();
  }
}
