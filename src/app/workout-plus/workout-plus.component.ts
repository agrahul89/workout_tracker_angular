import { Component, OnInit, Input } from '@angular/core';
import { WorkoutModel } from '../workout/workout-model';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { RestClientService } from '../_services/rest-client.service';
import { AuthService } from '../_services/auth.service';
import { CategoryModel } from '../category/category-model';

@Component({
  selector: 'app-workout-plus',
  templateUrl: './workout-plus.component.html',
  styleUrls: ['./workout-plus.component.css']
})
export class WorkoutPlusComponent implements OnInit {

  @Input() action: string;
  @Input() workout: WorkoutModel;
  protected categories: CategoryModel[] = [];

  constructor(
    private ngbModal: NgbActiveModal,
    private authService: AuthService,
    private restService: RestClientService) { }

  ngOnInit() {
    this.restService.getCategories(this.authService.auth).subscribe(
      res => {
        if (res.status === 200 && res.body) {
          this.categories = res.body;
        } else if (res.status === 204) {
          console.log('No categories found');
          this.categories.length = 0;
        }
      }
    );
    if (!this.workout) {
      this.workout = new WorkoutModel('', null, '', 0.0, false);
    }
  }

  dismiss(reason) {
    this.ngbModal.close(reason);
  }

}
