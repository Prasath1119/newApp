import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/service';


@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css'],

})
export class AddJobComponent implements OnInit {
  AddJobForm: FormGroup;
  view: boolean;
  viewData: any;
  addJob: boolean;
  userData: any;

  constructor(public dialogRef: MatDialogRef<AddJobComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (Object.keys(this.data).length == 0) {
      this.addJob = true;
    } else {
      this.addJob = false;
    }
  }

  ngOnInit() {
    this.viewData = this.data;
    let user = JSON.parse(localStorage.getItem('loginuser'))
    this.userData = user;
    if (user.role == 'user') {
      this.view = true;
    } else {
      this.view = false;
      this.AddJobForm = this.formBuilder.group({
        ID: [this.data.ID],
        jobtitle: [this.data.jobtitle, [Validators.required]],
        company: [this.data.company, [Validators.required]],
        description: [this.data.description, [Validators.required]]
      });
    }


  }
  Cancel() {
    this.dialogRef.close();
  }

  Clear() {
    this.dialogRef.close();
  }
  submit() {
    if (this.AddJobForm.valid) {
      if (isNaN(this.data.ID)) {
        this.userService.addJob(this.AddJobForm.value);
        this.dialogRef.close();
      }
      else {
        this.userService.editJob(this.AddJobForm.value);
        this.dialogRef.close();
      }
    }
  }
}
