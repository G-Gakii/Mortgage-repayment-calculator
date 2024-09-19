import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ResultPlaceholderComponent } from '../result-placeholder/result-placeholder.component';
import { ResultsComponent } from '../results/results.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ResultPlaceholderComponent,
    ResultsComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  monthlypayment: number = 0;
  totalpayment: number = 0;
  interest: number = 0;

  calculateForm: FormGroup = new FormGroup({
    amount: new FormControl(1, [Validators.required, Validators.min(1)]),
    term: new FormControl(1, [Validators.required, Validators.min(1)]),
    rate: new FormControl(1, [Validators.required, Validators.min(1)]),
    type: new FormControl('repayment', Validators.required),
  });

  mortgageterm: any;

  onsubmit() {
    if (this.calculateForm.valid) {
      this.mortgageterm = this.calculateForm.value;
      let monthlyInterest = this.mortgageterm.rate / 100 / 12;
      let numberOfMonths = this.mortgageterm.term * 12;
      this.monthlypayment =
        (this.mortgageterm.amount *
          monthlyInterest *
          Math.pow(1 + monthlyInterest, numberOfMonths)) /
        (Math.pow(1 + monthlyInterest, numberOfMonths) - 1);

      this.totalpayment = this.monthlypayment * numberOfMonths;
    } else {
      alert('Form is invalid. Please fill out all required fields.');
    }
  }
  clear() {
    this.calculateForm.reset({
      amount: 0,
      term: 0,
      rate: 0,
      type: 'repayment',
    });
    this.monthlypayment = 0;
    this.totalpayment = 0;
  }
}
