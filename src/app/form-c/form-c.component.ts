import { CommonModule } from '@angular/common'; // Добавлено для CommonModule
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // Добавлено для MatButtonModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../Services/category.service';
import { Category1 } from '../shared/model/Category1';
import { Language } from '../shared/model/Language';
import { TranslatedWord } from '../shared/model/TranslatedWord';

@Component({
  selector: 'app-form-c',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './form-c.component.html',
  styleUrls: ['./form-c.component.css']
})
export class FormCComponent implements OnInit {
  @Input() idString?: string;
  currentCategory: Category1;

  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) {
    this.currentCategory = new Category1(categoryService.nextId, '', Language.English, Language.Hebrew);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idString = params['idString'];
      if (idString) {
        let id: number = parseInt(idString);
        this.idString = idString
        const category = this.categoryService.get(id);
        if (category) {
          this.currentCategory = category;
        } else {
          this.currentCategory =  new Category1(id,'',Language.English, Language.Hebrew)
        }
      }
    });
  }

  addNewWord(): void {
    this.currentCategory.words.push(new TranslatedWord('', ''));
  }
  deleteWord(index: number): void {
    this.currentCategory.words.splice(index, 1);
  }

  getErrorMessage(input: NgModel): string {
    if (input.hasError('required')) {
      return 'You must enter a value';
    } else if (input.hasError('pattern')) {
      return 'Invalid characters detected';
    }
    return '';
  }
  hasAtLeastOne() {
    return this.currentCategory.words.length !== 0
  }
  onSubmitRegistration() {
    console.log("Form submitted!");
    this.categoryService.updateOrAdd(this.currentCategory);
    console.log('Updating category:', this.currentCategory);
    this.router.navigate(['/']);
  }
}

