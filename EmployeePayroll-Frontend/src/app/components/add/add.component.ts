import {Component, OnInit, Pipe} from '@angular/core';
import {Employee} from "../../model/employee";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Service} from "../../service/service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
  day = "";
  month = "";
  year = "";

  daysArray = [{key : 1 , value : "01"},{key : 2 , value : "02"},{key : 3 , value : "03"},
                {key : 4 , value : "04"},{key : 5 , value : "05"},{key : 6 , value : "06"},
                {key : 7 , value : "07"},{key : 8 , value : "08"},{key : 9 , value : "09"},
                {key : 10 , value : "10"},{key : 11 , value : "11"},{key : 12 , value : "12"},
                {key : 13 , value : "13"},{key : 14 , value : "14"},{key : 15 , value : "15"},
                {key : 16 , value : "16"},{key : 17 , value : "17"},{key : 18 , value : "18"},
                {key : 19 , value : "19"},{key : 20 , value : "20"},{key : 21 , value : "21"},
                {key : 22 , value : "22"},{key : 23 , value : "23"},{key : 24 , value : "24"},
                {key : 25 , value : "25"},{key : 26 , value : "26"},{key : 27 , value : "27"},
                {key : 28 , value : "28"},{key : 29 , value : "29"},{key : 30 , value : "30"},{key : 31 , value : "31"}];

  monthArray = [{key : "January" , value : "Jan"},{key : "February" , value : "Feb"},{key : "March" , value : "Mar"},
                {key : "April" , value : "Apr"},{key : "May" , value : "May"},{key : "June" , value : "Jun"},
                {key : "July" , value : "Jul"},{key : "August" , value : "Aug"},{key : "September" , value : "Sep"},
                {key : "October" , value : "Oct"},{key : "November" , value : "Nov"},{key : "December" , value : "Dec"},];

  yearArray = [2017,2018,2019,2020];

  departmentsArray : any [] = [];

  salaries : number [] = [50000,100000,150000,200000,250000,300000,350000,400000,450000,500000];



  public formGroupDepartments : FormGroup;
  public employeeFormGroup: FormGroup;

  employee: Employee = new Employee();


  constructor(private formBuilder: FormBuilder, private httpService: Service, private router: Router) {
    this.formGroupDepartments =  this.formBuilder.group( {
      HR : false, Sales : false ,   Finance : false, Engineer : false,  Other : false
    })
    this.employeeFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\\s]{2,}$")]),

    })
  }


  ngOnInit(): void {
  }

  onSubmit(){
    this.addDepartments()

    this.employee.startDate = this.day+" "+this.month+" "+ this.year;
    console.log("The employee is = >"+JSON.stringify(this.employee));

    this.httpService.addEmployeeData(this.employee).subscribe(data => {
      console.log(data["data"])
    })
    this.gotoList();
  }


  addDepartments(){
    this.departmentsArray = []
    for (let i of ["HR", "Sales", "Finance", "Engineer", "Other"]) {
      if(this.formGroupDepartments.get(i)?.value){
        this.departmentsArray.push(i);
      }

    }
    this.employee.departments = this.departmentsArray;
  }


  gotoList() {
    setTimeout(() => {
      this.router.navigate([''])
    }, 2000);

  }

  /**
   * This method validate the employee name and note
   * @param controlName
   * @param errorName
   * @returns the error message when has error.
   */
  public checkError = (controlName: string, errorName: string) => {
    return this.employeeFormGroup.controls[controlName].hasError(errorName);
  }

}
