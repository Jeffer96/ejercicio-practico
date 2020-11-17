import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {
  saved = false;
  mode = "C";
  strMsg = "";
  errorShow = false;
  alert = "";
  alertShow = false;
  currentUser: User = new User();
  
  constructor(private apiService: ApiService, private router: Router, private activeRt: ActivatedRoute) {
  }

  ngOnInit() {
    let idUsr = this.activeRt.snapshot.paramMap.get("id");
    if (idUsr) {
      console.log("Reading the user properties of: " + idUsr);
      this.getUser(idUsr);
    }
  }

  getUser(id) {
    this.apiService.getUserById(id).subscribe(data => {
      this.currentUser = data[0];   
      this.mode = "M";
    })
  }

  onSubmit() {
    this.alertShow = false;
    this.errorShow = false;
    console.log("Saving: " + JSON.stringify(this.currentUser._id));
    
    if (true) {
      if (this.mode == "C") {
        this.apiService.addUser(this.currentUser).subscribe((ans) => {
          console.log('Data persisted...');
          this.saved = true;
          this.alertShow = true;
          this.alert = "Data persisted succesfully";

        }, (error) => {
            this.errorShow = true;
            this.strMsg = "Error, data was not persisted";
          console.log(error);
        })
      } else {
        let id = this.activeRt.snapshot.paramMap.get("id");
        console.log(this.currentUser);
        this.apiService.updateUser(id, this.currentUser).subscribe(data => {
          this.alert = "User " + this.currentUser.cc + " Was updated Succesfully!";
          this.alertShow = true;
        })
      }
    } else {
      this.strMsg = "the form values are not valid, check again!"
      this.errorShow = true;
    }
  }

}
