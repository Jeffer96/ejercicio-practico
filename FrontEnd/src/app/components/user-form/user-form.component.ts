import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  saved = false;
  constructor(private apiService: ApiService, private router: Router) {
  }

  userFrm = new FormGroup({
    firstNames: new FormControl('', Validators.nullValidator && Validators.required),
    lastNames: new FormControl('', Validators.nullValidator && Validators.required),
    cc: new FormControl('', Validators.nullValidator && Validators.required),
    age: new FormControl('', Validators.nullValidator && Validators.required)
  });

  ngOnInit() {
  }

  onSubmit() {
    this.saved = true;
    this.apiService.addUser(this.userFrm.value).subscribe((ans) => {
      console.log('Data persisted...');
      this.userFrm.reset();
    }, (error) => {
        console.log(error);
      })
  }

}
