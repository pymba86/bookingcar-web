import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Car} from '../../models/car.model';


@Component({
  selector: 'app-cars-form',
  template: `

    <form (submit)="submit()" class="form" [formGroup]="form">

      <div class="form-group">
        <label for="name-input">Название:</label>
        <input id="name-input" type="text" class="form-control" formControlName="name">
      </div>
      
      <div class="form-group">
        <button
          type="submit"
          [disabled]="!form.valid"
          class="btn btn-success float-right">
          Сохранить
        </button>
      </div>

    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarsFormComponent implements OnInit, OnChanges {

  @Input() car: Car = {
    id: null,
    name: '',
  };

  @Output() onSubmit = new EventEmitter<Car>();

  form: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'id': [this.car.id],
      'name': [this.car.name, Validators.required],
    });
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.car) {
      this.form.patchValue(this.car);
    }
  }

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }

  }

}
