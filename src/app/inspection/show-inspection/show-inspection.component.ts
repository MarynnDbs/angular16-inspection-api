import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service';

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css']
})
export class ShowInspectionComponent implements OnInit {

  inspectionList$!:Observable<any[]>;
  inspectionTypesList$!:Observable<any[]>;
  inspectionTypesList:any=[];

  // Map to display data associates with foreign keys
  inspectionTypesMap:Map<number, string> = new Map();

  constructor(private service: InspectionApiService) {}

  ngOnInit(): void {
    this.inspectionList$ = this.service.getInspectionList();
    this.inspectionTypesList$ = this.service.getInspectionTypesList();
  }

  refreshInspectionTypesMap() {
    this.service.getInspectionTypesList().subscribe(data => {
      this.inspectionTypesList = data;

      for(let i = 0; i< data.length; i++) {
        this.inspectionTypesMap.set(this.inspectionTypesList[i].id, this.inspectionTypesList[i].inspectionName);
      }
    });
  }
}
