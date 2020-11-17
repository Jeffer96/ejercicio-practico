import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  Users: User[] = [];
  linesXpage = 10;
  currentPage = 1;


  constructor(private apiService: ApiService, private activeRt: ActivatedRoute) {
    
  }

  readUsers() {
    this.apiService.getUsers().subscribe((data) => {
      //console.log(Object.values(data).length);
      if (this.currentPage < 1) {
        this.currentPage = 1;
      }
      
      let refArray = Object.values(data);
      let maxPages = this.topInt(refArray.length / this.linesXpage);
      if (maxPages < this.currentPage) {
        this.currentPage = maxPages;
      }
      if (this.linesXpage < refArray.length) {
        let startingData = (this.currentPage - 1) * this.linesXpage;
        let endingData = (this.currentPage * this.linesXpage);
        if (endingData > refArray.length) {
          endingData = refArray.length;
        }
        refArray = refArray.slice(startingData, endingData);
      } else {
        this.currentPage = 1;
        this.linesXpage = 10;
      }
      this.Users = refArray;
    })
  }

  deleteUser(usr,id) {
    this.apiService.deleteUser(usr._id).subscribe((data) => {
      this.Users.splice(id, 1);
    });
  }

  ngOnInit() {
    console.log("Initiating list...");
    /**this.currentPage = this.toInt(this.activeRt.snapshot.paramMap.get("page"),1);
    this.linesXpage = this.toInt(this.activeRt.snapshot.paramMap.get("lxp"),10);**/
    this.currentPage = 1;
    this.activeRt.params.subscribe(routeParams => {
      let pageInd = this.toInt(routeParams["pi"], 0);
      this.currentPage = this.toInt(routeParams["page"], 1) + pageInd;
      this.linesXpage = this.toInt(routeParams["lxp"],1);
      this.readUsers();
    });
    this.readUsers();
  }

  topInt(param: number) {
    let top = Math.round(param);
    if (param > top) {
      top = top + 1;
    }
    return top;
  }

  toInt(param: string, reseteable: number) {
    try {
      let resp = isNaN(parseInt(param)) ? 0 : parseInt(param);
      return resp;
    } catch (e) {
      console.log("Error converting "+param+" to integer: "+e);
      return reseteable;
    }
  }

  setLinesXPage(event: any) {
    let defVal = event.target.value.replace(/[^0-9]*/g, '');
    event.target.value = defVal;
    this.linesXpage = this.toInt(defVal,1);
  }

}
