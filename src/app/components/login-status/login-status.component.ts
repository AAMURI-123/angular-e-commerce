import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  storage :Storage = localStorage;
  isAuthenticated : boolean = false;
  userName : String;

 
  constructor(private oktaAuthService : OktaAuthService) { }

  ngOnInit(): void {

    // subscribe on every authentication state change
    this.oktaAuthService.$authenticationState.subscribe(
      res =>{
        this.isAuthenticated = res;
        this.getUserInfo();
      }
    )
  }


  getUserInfo() {
   
    // get the loged in user info
    if(this.isAuthenticated){

      this.oktaAuthService.getUser().then(
        res =>{
          this.userName = res.name;
          
          // store the user email to local storage
          this.storage.setItem("theEmail",JSON.stringify(res.email));
        }
      )

    }
    
  }

  logout(){

    this.oktaAuthService.signOut();
  }
}
