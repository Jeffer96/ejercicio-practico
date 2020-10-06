import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  Users: any = [];

  constructor(private apiService: ApiService) {
    this.readUsers();
  }

  readUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.Users = data;
    })
  }

  deleteUser(usr,id) {
    this.apiService.deleteUser(usr._id).subscribe((data) => {
      this.Users.splice(id, 1);
    });
  }

  ngOnInit() {
  }

}
