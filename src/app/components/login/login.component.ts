import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';
import myAppConfig from 'src/app/Config/my-app-config';
import myappconfig from 'src/app/Config/my-app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignIn : any;

  constructor(private oktaAuthService : OktaAuthService) {
    this.oktaSignIn = new OktaSignIn({
      logo : "assets/images/logo.png",
      baseUrl : myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId : myappconfig.oidc.clientId,
      features : {
        registration : true
      },
      redirectUri : myappconfig.oidc.redirectUri,
      authparams : {
        pkce : true,
        issuer : myappconfig.oidc.issuer,
        scopes : myappconfig.oidc.scopes
      }
    });
   }

  ngOnInit(): void {

    this.oktaSignIn.remove();
    this.oktaSignIn.renderEl({
      el : "#okta-sign-in-widget"},
      response => {
        if(response.status == "SUCCESS"){
          this.oktaAuthService.signInWithRedirect();
        }
      },
    error =>{
      throw error;
      }
    )
  }
}
