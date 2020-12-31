import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Job } from '../models';
import { UserService } from '../service/user.service';
import { AddJobComponent } from '../shared/add-job/add-job.component';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})



export class AdminComponent implements OnInit, AfterViewInit {
  displayedColumns = ['jobtitle', 'company', 'description', 'edit', 'delete', 'checked'];
  displayedColumns2 = ['jobtitle', 'company', 'description', 'view'];

  dataSource = new MatTableDataSource([]);
  fileNameDialogRef: MatDialogRef<AddJobComponent>;
  table_data: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  localData: any;
  admin: boolean = false;
  user: boolean;
  userData: any;
  checkedArray: any = [];
  multiDeleteBtn: any = "true";

  highlight(element: Element) {
    element.highlighted = !element.highlighted;
  }

  constructor(private dialog: MatDialog,
    private userService: UserService,
    private router: Router,

  ) { }
  ngOnInit() {
    this.loginUser();
  }
  loginUser() {
    let user = JSON.parse(localStorage.getItem('loginuser'))
    this.userData = user;
    if (this.userData.role == "admin") {
      this.admin = true;
      this.getJobData();
    } else {
      this.user = true;
      this.getLocalData();
    }
  }

  ngAfterViewInit() {
    if (this.userData.role == "admin") {
      this.admin = true;
      this.getJobData();
    } else {
      this.user = true;
      this.getLocalData();
    }
  }

  getLocalData() {
    this.table_data = JSON.parse(localStorage.getItem('job'));
    this.dataSource = this.table_data;
    this.dataSource = new MatTableDataSource(this.table_data)
    this.dataSource.paginator = this.paginator;
  }
  getJobData() {
    this.table_data = JSON.parse(localStorage.getItem('job'));
    this.dataSource = this.table_data;
    this.dataSource = new MatTableDataSource(this.table_data)
    this.dataSource.paginator = this.paginator;

    this.userService.Job.subscribe(res => {
      this.table_data = res;
      this.checkedArray = [];
      if (res.length >= 1) {
        this.dataSource = this.table_data;
        this.dataSource = new MatTableDataSource(this.table_data)
        this.dataSource.paginator = this.paginator;
        this.multiDeleteBtn = "true";
      } else if (res.length == 0) {
        this.dataSource = this.table_data;
        this.dataSource = new MatTableDataSource(this.table_data)
        this.dataSource.paginator = this.paginator;
        this.multiDeleteBtn = "true";
      }
    });
  }

  downloadFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
    var blob = new Blob([csvArray], { type: 'text/csv' })
    saveAs(blob, "JobList.csv");
  }



  get JobList() {
    return this.userService.getAllJobs();
  }


  openDialog() {
    this.fileNameDialogRef = this.dialog.open(AddJobComponent, {
      minHeight: '400px',
      minWidth: '350px',
      data: {}
    });
    this.fileNameDialogRef.afterClosed().subscribe(result => {
    });
  }

  editJob(element) {
    const job = this.userService.getAllJobs().find(c => c.ID === element.ID);
    const dialogRef = this.dialog.open(AddJobComponent, {
      minHeight: '400px',
      minWidth: '350px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deleteJob(id: number) {
    this.userService.deleteJob(id);
  }

  checkedData(event, element) {
    if (element.checked == true) {
      this.checkedArray.push(element)
      if (this.checkedArray.length > 0) {
        this.multiDeleteBtn = "false";
      }
    } else {
      var index = this.checkedArray.findIndex(item => item.ID == element.ID)
      this.checkedArray.splice(index, 1);
      if (this.checkedArray.length == 0) {
        this.multiDeleteBtn = "true";
      }
    }

  }
  multiDeleteFunc() {
    this.userService.multiDelete(this.checkedArray);
  }

  viewJob(element) {
    this.fileNameDialogRef = this.dialog.open(AddJobComponent, {
      minHeight: '400px',
      minWidth: '300px',
      data: element
    });
  }

  logout() {
    localStorage.removeItem('loginuser');
    this.router.navigate(['/login'])
  }
}
export interface Element {
  checked: boolean;
  highlighted?: boolean;
  hovered?: boolean;
}
