import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from '../models/job.model';
import { Subject } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserService {

  JobList: Job[] = [];
  public Job = new Subject<any>();
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  response: any;
  localdata: any;
  temp: Job[];


  constructor(private http: HttpClient,
    public snackBar: MatSnackBar,
    private router: Router,
  ) {
  }


  loginService(formvalue) {
    console.log('formvalue', formvalue)
    if (formvalue.username == 'admin') {
      this.http.get('assets/api.json').subscribe(resp => {
        this.response = resp;
        this.router.navigate(['/home'])
        localStorage.setItem('loginuser', JSON.stringify(this.response))
      })
    } else {
      this.http.get('assets/user.json').subscribe(resp => {
        this.response = resp;
        this.router.navigate(['/home'])
        localStorage.setItem('loginuser', JSON.stringify(this.response))
      })
    }
  }



  addJob(job: Job) {
    job.ID = this.JobList.length + 1;
    console.log('job', job)
    if (localStorage.getItem('job')) {
      this.JobList = JSON.parse(localStorage.getItem('job'));
      this.JobList.push(job);
      localStorage.setItem('job', JSON.stringify(this.JobList))
      this.Job.next(this.JobList);
      let message = "Job added successfully";
      this.toasterMsg(message)
    } else {
      this.JobList.push(job);
      localStorage.setItem('job', JSON.stringify(this.JobList))
      this.Job.next(this.JobList);
      let message = "Job added successfully";
      this.toasterMsg(message)
    }

  }

  editJob(job) {
    console.log('job', job)
    if (localStorage.getItem('job') || !localStorage.getItem('job')) {
      this.JobList = JSON.parse(localStorage.getItem('job'));
      const index = this.JobList.findIndex(c => c.ID === job.ID);
      this.JobList[index] = job;
      localStorage.setItem('job', JSON.stringify(this.JobList))
      this.Job.next(this.JobList);
      let message = "Job updated successfully";
      this.toasterMsg(message)
    }

  }
  deleteJob(id: number) {
    if (localStorage.getItem('job') || !localStorage.getItem('job')) {
      this.JobList = JSON.parse(localStorage.getItem('job'));
      const job = this.JobList.findIndex(c => c.ID === id);
      this.JobList.splice(job, 1);
      localStorage.setItem('job', JSON.stringify(this.JobList))
      this.Job.next(this.JobList);
      let message = "Job deleted successfully";
      this.toasterMsg(message)
    }
  }

  multiDelete(selectedarray) {
    if (localStorage.getItem('job') || !localStorage.getItem('job')) {
      this.JobList = JSON.parse(localStorage.getItem('job'));
      let temp = this.JobList;
      selectedarray.forEach(function (item) {
        var ItemIndex = temp.findIndex(b => b.ID === item.ID);
        temp.splice(ItemIndex, 1)
      })
      localStorage.setItem('job', JSON.stringify(temp))
      this.Job.next(temp);
      let message = "Job deleted successfully";
      this.toasterMsg(message)
      console.log('filtertemp2', temp)

    }
  }

  getAllJobs() {
    return this.JobList;
  }

  toasterMsg(msg) {
    this.snackBar.open(msg, 'Done', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}