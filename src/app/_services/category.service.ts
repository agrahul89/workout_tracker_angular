import { Injectable } from '@angular/core';
import { CategoryModel } from '../category/category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  static clone(category: CategoryModel): CategoryModel {
    return new CategoryModel(category.category, false, category.id);
  }

}
