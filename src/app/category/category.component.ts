import { CategoryModel } from './category-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private categories: CategoryModel[] = [
    new CategoryModel('Aerobics'),
    new CategoryModel('Cardio'),
    new CategoryModel('Walk'),
    new CategoryModel('Cycle'),
    new CategoryModel('Jog'),
    new CategoryModel('Pushup'),
    new CategoryModel('Sit-up'),
    new CategoryModel('Sprint'),
    new CategoryModel('Swim'),
    new CategoryModel('Yoga')
  ];

  filteredCategories: CategoryModel[];

  constructor() { }

  ngOnInit() {
    // TODO: Load all categories from service
    this.filteredCategories = this.categories;
  }

  private add(category: string) {
    if (category === '' || category === undefined || category === null) {
      console.log('Invalid category name :: ' + category);
    } else {
      // TODO: call service to add category
      this.categories.push(new CategoryModel(category));
    }
  }

  private delete(category: CategoryModel) {
    // TODO: call service to delete category
    const index: number = this.categories.indexOf(category);
    if (index !== -1) {
        this.categories.splice(index, 1);
    }
    console.log(this.categories.length);
  }

  private edit(category: CategoryModel) {
    category.editing = true;
  }

  private filter(filterQuery: String): CategoryModel[] {
    console.log(filterQuery);
    if (filterQuery !== null && filterQuery !== undefined && filterQuery.trim() !== '') {
      // TODO: filter categories list and return
    }
    return this.filteredCategories;
  }

  private update(category: CategoryModel) {
    // TODO: call service to update category
    category.editing = false;
  }

}
