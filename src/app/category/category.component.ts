import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthService } from '../auth.service';
import { CategoryModel } from './category-model';
import { RestClientService } from '../rest-client.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private categories: CategoryModel[] = [];
  filteredCategories: CategoryModel[] = [];
  filterQuery$ = new Subject<string>();

  constructor(
    private authService: AuthService,
    private restService: RestClientService,
    private router: Router) { }

  ngOnInit() {
    this.retrieveAll(this.authService.auth);
    this.filterQuery$.pipe(
      debounceTime(400), distinctUntilChanged(),
      map(filterQuery => this.filter(filterQuery))
    ).subscribe();
  }

  private add(category: string) {
    if (category === '' || category === undefined || category === null) {
      console.log('Invalid category name :: ' + category);
    } else {
      this.restService.createCategory(category, this.authService.auth).subscribe(
        res => {
          const resource = document.createElement('a');
          resource.href = res.headers.get('Location');
          const pathItems = resource.pathname.split('/');
          const id = pathItems[pathItems.length - 1];
          this.categories.push(new CategoryModel(category, false, parseInt(id, 10)));
          alert(`Category [${category}] created successfully`);
        },
        err => {
          if (err.status === 401 || err.status === 403) {
            console.log('Unauthorized access to category');
          } else if (err.status === 400) {
            console.log('Non existing category');
          }
          alert('Error creating category');
        },
        () => {
          this.resetFilteredCategories();
        }
      );
    }
  }

  private delete(category: CategoryModel) {
    const confirmed = confirm('Deleting this category will also delete all workouts for this category');
    if (confirmed) {
      this.restService.deleteCategory(category.id, this.authService.auth).subscribe(
        res => {
          if (res.status === 200) {
            console.log(`Category #${category.id} deleted successfully`);
            alert(`Category [${category.category}] deleted successfully`);
            this.categories.splice(this.categories.indexOf(category), 1);
          } else {
            console.log(`Category [#${category.category}] could not be deleted`);
          }
        },
        err => {
          if (err.status === 401 || err.status === 403) {
            console.log('Unauthorized access to category');
          } else if (err.status === 400) {
            console.log('Non existing category');
          }
          alert('Error deleting category');
        },
        () => this.resetFilteredCategories()
      );
    }
  }

  private edit(category: CategoryModel) {
    category.editing = true;
  }

  private filter(filterQuery: string): void {
    this.filteredCategories.length = 0;
    this.categories.forEach(
      (category: CategoryModel) => {
        const query = filterQuery === null || filterQuery === undefined
          ? '' : filterQuery.trim().toLocaleLowerCase();
        const categoryName = category.category === null || category.category === undefined
          ? '' : category.category.trim().toLocaleLowerCase();
        if (categoryName.startsWith(query)) {
          this.filteredCategories.push(category);
        }
      }
    );
  }

  private resetFilteredCategories() {
    this.filteredCategories.length = 0;
    this.categories.forEach(category => {
      this.filteredCategories.push(category);
    });
  }

  private retrieveAll(authToken: string): void {
    this.restService.getCategories(authToken).subscribe(
      res => {
        if (res.status === 200 && res.body) {
          this.categories = res.body;
        } else if (res.status === 204) {
          console.log('No categories found');
          this.categories.length = 0;
        }
      },
      err => {
        if (err.status === 401 || err.status === 403) {
          console.log('Unauthorized access to category');
          this.categories.length = 0;
        }
        alert('Error accessing categories');
      },
      () => this.resetFilteredCategories()
    );
  }

  private update(category: CategoryModel) {
    this.restService.updateCategory(category, this.authService.auth).subscribe(
      res => {
        if (res.status === 200) {
          console.log(`Category #${category.id} updated successfully`);
          alert(`Category updated successfully to [${category.category}]`);
          category.category = res.body.category;
        } else if (res.status === 204) {
          alert('Category is not available in databas');
        } else {
          console.log(`Category could not be updated to [${category.category}]`);
        }
      },
      err => {
        if (err.status === 401 || err.status === 403) {
          console.log('Unauthorized access to category');
        }
        alert(`Error updating category to [${category.category}]`);
      },
      () => {
        category.editing = false;
      }
    );
  }

}
