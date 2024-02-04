import { Component, OnInit } from '@angular/core';
import { Category1 } from '../shared/model/Category1';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {DatePipe} from "@angular/common";
import { CategoryService } from '../Services/category.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [MatTableModule, RouterModule, MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'Words', 'Date', 'actions'];
  categories: Category1 [] = []

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.categories=this.categoryService.list()
  }

  deleteCategory(id:number, name:string){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: name,})

    dialogRef.afterClosed().subscribe(deletionConfirmed => {
          if(deletionConfirmed){
            this.categoryService.delete(id)
            this.categories=this.categoryService.list()
          }
    });
  }



  getCategoryWords(category: Category1): string {
    return category.words.map(word => `${word.origin} - ${word.target}`).join(', ');
  }
}
