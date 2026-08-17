import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, RouterLink, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(private tripDataService: TripDataService) { }

  ngOnInit(): void {
    this.getTrips();
  }

  private getTrips(): void {
    this.message = 'Searching for trips...';
    this.tripDataService.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips = value;
        this.message = value.length > 0 ? `Found ${value.length} trips` : 'No trips found';
      },
      error: (error: any) => {
        console.error(error);
        this.message = 'Error fetching trips from database.';
      }
    });
  }
}