import { Routes } from '@angular/router';
import { FormCComponent } from './form-c/form-c.component';
import { CategoryListComponent } from './category-list/category-list.component'

export const routes: Routes = [
	{path: 'category/:idString', component: FormCComponent},
	{path: '', component: CategoryListComponent}
];
