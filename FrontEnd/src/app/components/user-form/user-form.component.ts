import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { User } from '../../model/user';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  showPrintPdf = false;
  
  constructor(private apiService: ApiService, private router: Router, private activeRt: ActivatedRoute) {
  }

  ngOnInit() {
    let idUsr = this.activeRt.snapshot.paramMap.get("id");
    let mode = this.activeRt.snapshot.paramMap.get("mode");
    if (idUsr) {
      console.log("Reading the user properties of: " + idUsr + " in "+mode+" mode.. ");
      this.getUser(idUsr);
      if (mode=="P" || 1==1) {
        this.showPrintPdf = true;
      }
      
    }
  }

  printPdfUser() {
 
      //make html with usr data
      //this.pdfTittle = data["firstNames"] + " " + data["lastNames"];
      let base = document.getElementById("formRoot");
      const doc = new jsPDF('p', 'pt', 'a4');
      const options = {
        background: 'white',
        scale: 3
      };
      html2canvas(base, options).then((canvas) => {

        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        return doc;
      }).then((docResult) => {
        docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
      });
   
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
