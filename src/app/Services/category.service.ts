import { Injectable } from '@angular/core'
import { Category1 } from '../shared/model/Category1';


@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories = new Map<number, Category1>();
  nextId = 0;

  constructor(){
     //this.categories.set(23, new Category(23, "Ben", Language.English, Language.Hebrew));
  }

  currentName() {
    return this.get(this.nextId)?.name || ''
  }
  list(): Category1[] {
    return Array.from(this.categories.values());
  }

  get(id: number): Category1 | undefined {
    return this.categories.get(id);
    }

  delete(id: number): void {
    this.categories.delete(id);
    }

    add(newCategoryData:Category1) {
      newCategoryData.id = this.nextId;
      this.categories.set(this.nextId, newCategoryData);
      this.nextId++;
    }

    update(category: Category1) : void {
      if (this.categories.has(category.id)){
        this.categories.set(category.id, category);
      }
    }
    updateOrAdd(category: Category1) : void {
      this.categories.set(category.id,category)
      if (this.nextId < category.id) this.nextId++
    }


}




