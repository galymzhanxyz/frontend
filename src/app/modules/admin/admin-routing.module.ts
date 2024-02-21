import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStartPageComponent } from './components/admin-start-page/admin-start-page.component';
import { BackgroundJobsComponent } from './components/background-jobs/background-jobs.component';
import { InterviewTemplatesAdminPageComponent } from './components/interviews/interview-templates-admin-page/interview-templates-admin-page.component';
import { UsersAdminPageComponent } from './components/users/users-admin-page/users-admin-page.component';
import { SalariesAdminPageComponent } from './components/salaries/salaries-admin-page/salaries-admin-page.component';
import { SalariesAddingChartComponent } from './components/salaries/salaries-adding-chart/salaries-adding-chart.component';
import { SalariesNotInStatsAdminPageComponent } from './components/salaries/salaries-not-in-stat-admin-page/salaries-not-in-stat-admin-page.component';
import { SkillsPaginatedTableComponent } from './components/skills/skills-paginated-table/skills-paginated-table.component';
import { WorkIndustriesPaginatedTableComponent } from './components/work-industries/work-industries-paginated-table/work-indusrties-paginated-table.component';

const routes: Routes = [
  { path: '', component: AdminStartPageComponent },
  { path: 'users', component: UsersAdminPageComponent },
  { path: 'interview-templates', component: InterviewTemplatesAdminPageComponent },
  { path: 'background-jobs', component: BackgroundJobsComponent },
  { path: 'skills', component: SkillsPaginatedTableComponent },
  { path: 'work-industries', component: WorkIndustriesPaginatedTableComponent },
  { path: 'salaries', component: SalariesAdminPageComponent },
  { path: 'salaries/not-in-stats', component: SalariesNotInStatsAdminPageComponent },
  { path: 'salaries/salaries-adding-trend-chart', component: SalariesAddingChartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
