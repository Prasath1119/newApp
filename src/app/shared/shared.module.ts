
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddJobComponent } from './add-job/add-job.component';
import { MaterialModule } from './material.module';

@NgModule({
    declarations: [
        AddJobComponent
    ],
    imports: [
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,

    ],
    providers: [],
   
    exports: [AddJobComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
      ],
      entryComponents: [
        AddJobComponent
     ]
})
export class SharedModule { }


