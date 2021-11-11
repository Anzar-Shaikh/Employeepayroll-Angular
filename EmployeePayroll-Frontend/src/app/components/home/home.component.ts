import { Component, OnInit } from '@angular/core';
import {Service} from "../../service/service";
import { Employee } from 'src/app/model/employee';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public employeeDetails: Employee[] = [];

  constructor( public service : Service) { }


  /**
   * This method is used to get the employee data in the home page.
   * it will add all data as response in the home page which user has filled in the form home page.
   */
  ngOnInit(): void {
      this.loadData();
  }

  loadData(){
    this.service.getEmployeeData().subscribe(data => {
      this.employeeDetails = data["data"];
      console.log("this is my data " + JSON.stringify(data["data"]))

      this.employeeDetails.forEach(employee => {console.log(JSON.stringify(employee.employeeId))})
    })
  }

  remove(id : number) {
    this.service.deleteEmployeeData(id).subscribe(data=> {
      console.log(data);
      this.ngOnInit();
    });
  }


}
