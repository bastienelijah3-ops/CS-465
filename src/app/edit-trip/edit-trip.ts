import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  editForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) { }

  ngOnInit(): void {
    // Retrieve stored trip code set during selection
    const tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert("Something went wrong, couldn't find tripCode!");
      this.router.navigate(['/']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Populate form with existing trip details
    this.tripService.getTrip(tripCode).subscribe({
      next: (data: Trip) => {
        this.editForm.patchValue(data);
      },
      error: (error: any) => {
        console.error('Error fetching trip details:', error);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value).subscribe({
        next: (data: Trip) => {
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.error('Error updating trip:', error);
        }
      });
    }
  }
}