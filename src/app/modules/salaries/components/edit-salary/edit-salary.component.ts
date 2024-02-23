import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserSalariesService } from '@services/user-salaries.service';
import { EditSalaryForm } from './edit-salary-form';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { CompanyTypeSelectItem } from '@shared/select-boxes/company-type-select-item';
import { DeveloperGradeSelectItem } from '@shared/select-boxes/developer-grade-select-item';
import { UserSalary, UserSalaryAdminDto } from '@models/salaries/salary.model';
import { AlertService } from '@shared/components/alert/services/alert.service';
import { UserProfession, UserProfessionEnum } from '@models/salaries/user-profession';
import { SelectItem } from '@shared/select-boxes/select-item';
import { KazakhstanCity, KazakhstanCityEnum } from '@models/salaries/kazakhstan-city';
import { Skill } from '@services/skills.service';
import { SalariesChart } from '../salaries-chart/salaries-chart';
import { WorkIndustry } from '@services/work-industry.service';

@Component({
  selector: 'app-edit-salary-modal',
  templateUrl: './edit-salary.component.html',
  styleUrl: './edit-salary.component.scss'
})
export class EditSalaryComponent implements OnInit, OnDestroy {

  @Input()
  skills: Array<Skill> = [];

  @Input()
  industries: Array<WorkIndustry> = [];

  @Input()
  salarytoBeEdited: UserSalaryAdminDto | null = null;

  @Output()
  closed: EventEmitter<void> = new EventEmitter();

  @Output()
  salaryAdded: EventEmitter<UserSalary> = new EventEmitter();

  form: EditSalaryForm | null = null;
  errorMessage: string | null = null;
  salaryValue: string | null = null;
  showSalaryValue = false;

  readonly companyTypes: Array<CompanyTypeSelectItem> = CompanyTypeSelectItem.allItems();
  readonly grades: Array<DeveloperGradeSelectItem> = DeveloperGradeSelectItem.gradesSimpleOnly();
  readonly professions: Array<SelectItem<UserProfession>> = UserProfessionEnum.options();
  readonly cities: Array<SelectItem<KazakhstanCity>> = KazakhstanCityEnum.options();

  skillsAsOptions: Array<SelectItem<number>> = [];
  industriesAsOptions: Array<SelectItem<number>> = [];

  constructor(
    private readonly service: UserSalariesService,
    private readonly alert: AlertService) {}

  ngOnInit(): void {
    this.skillsAsOptions = this.skills.map((x) => {
      return {
        value: x.id.toString(),
        item: x.id,
        label: x.title
      }
    });

    this.industriesAsOptions = this.industries.map((x) => {
      return {
        value: x.id.toString(),
        item: x.id,
        label: x.title
      }
    });

    if (this.salarytoBeEdited == null) {
      return;
    }

    this.salaryValue = this.showSalaryValue ? SalariesChart.formatNumber(this.salarytoBeEdited.value) : "* * * * *";
    this.form = new EditSalaryForm(this.salarytoBeEdited, this.industries.length > 0);
  }

  addSalarySubmitAction(): void {
    this.errorMessage = null;
    const data = this.form?.createRequestOrNull();
    if (data == null || this.salarytoBeEdited == null) {
      return;
    }

    this.service
        .update(this.salarytoBeEdited.id, data)
        .pipe(untilDestroyed(this))
        .subscribe(
          (x) => {
            if (x.isSuccess && x.createdSalary) {
              this.errorMessage = null;
              this.alert.success(this.salarytoBeEdited ? 'Зарплата обновлена' : 'Зарплата успешно записана');
              this.salaryAdded.emit(x.createdSalary);
            } else {
              this.alert.error(x.errorMessage!);
              this.errorMessage = x.errorMessage!;
            }});
  }

  showOrHideSalary(): void {
    this.showSalaryValue = !this.showSalaryValue;
    this.salaryValue = this.showSalaryValue ? SalariesChart.formatNumber(this.salarytoBeEdited!.value) : "* * * * *";
  }

  ngOnDestroy(): void {
    // ignored
  }

  close(): void {
    this.closed.emit();
  }
}
