import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  saved = false;
  userData = {};
  mode = "C";
  strMsg = "";
  errorShow = false;
  alert = "";
  alertShow = false;
  
  constructor(private apiService: ApiService, private router: Router, private activeRt: ActivatedRoute) {
  }

  userFrm = new FormGroup({
    firstNames: new FormControl('', Validators.nullValidator && Validators.required),
    lastNames: new FormControl('', Validators.nullValidator && Validators.required),
    cc: new FormControl('', Validators.nullValidator && Validators.required),
    age: new FormControl('', Validators.nullValidator && Validators.required),
    _id: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    cellPhone: new FormControl('')
  });

  ngOnInit() {
    let idUsr = this.activeRt.snapshot.paramMap.get("id");
    if (idUsr) {
      console.log("Reading the user properties...")
      this.getUser(idUsr);
    }
  }

  getUser(id) {
    this.apiService.getUserById(id).subscribe(data => {
      //console.log("Reading the user-->" + data[0]["age"]);
      /**this.userFrm.patchValue({
        _id: data[0]["_id"],
        cc: data[0]["cc"],
        email: data[0]["email"],
        firstNames: data[0]["firstNames"],
        lastNames: data[0]["lastNames"],
        address: data[0]["address"],
        cellPhone: data[0]["cellPhone"],
        age: data[0]["age"]
      });**/
      this.userData = data[0];
      this.mode = "M";
    })
  }

  onSubmit() {
    if (this.userFrm.valid) {
      if (this.mode == "C") {
        this.apiService.addUser(this.userFrm.value).subscribe((ans) => {
          console.log('Data persisted...');
          this.saved = true;
          this.userFrm.reset();
        }, (error) => {
          console.log(error);
        })
      } else {
        let id = this.activeRt.snapshot.paramMap.get("id");
        this.apiService.updateUser(id, this.userFrm.value).subscribe(data => {
          this.alert = "User " + this.userFrm.value["cc"] + " Was updated Succesfully!";
          this.alertShow = true;
        })
      }
    } else {
      this.strMsg = "the form values are not valid, check again!"
      this.errorShow = true;
    }
    
  }

}
