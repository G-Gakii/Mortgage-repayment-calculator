import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent {
  @Input() monthlyPayment!: number;
  @Input() total!: number;
  @Input() interest!: number;
  @Input() monthlyInterest!: number;
  @Input() type!: string;
}
