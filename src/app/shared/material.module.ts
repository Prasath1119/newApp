import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatTableModule, MatInputModule, MatDialogModule, MatPaginatorModule, MatSnackBarModule, MAT_DIALOG_DATA, MatDialogRef, MatCheckboxModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule,


  ],
  declarations: [],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class MaterialModule { }