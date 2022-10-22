import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

interface Plant {
  value: string,
  view: string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  server: string = "192.168.137.76";

  availablePlants: Plant[] = [
    {value: "asparagus", view: "Asparagus"},
    {value: "tulips", view: "Tulips"},
    {value: "cactus", view: "Cactus"}
  ];

  plant = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  updatePlant() {
    // send request to API to update plant
    console.log(this.plant, "plant!");

    if(this.plant.length === 0) {
      // no plant selected
      return;
    }

    // send request
    this.http.get(`http://${this.server}/plants/${this.plant}`, {}).subscribe({
      next: async (data: any) => {
        console.log(data, "data!")
      }
    })
  }

}
