import { NumberSymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

interface Plant {
  value: string,
  view: string,
  cycle: {
    on: number,
    off: number
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  server: string = "192.168.137.76";

  validPlants: Plant[] = [
    { value: "asparagus", view: "Asparagus", cycle: { on: 1, off: 4 } },
    { value: "tulips", view: "Tulips", cycle: { on: 2, off: 1 } },
    { value: "cactus", view: "Cactus", cycle: { on: 1, off: 1 } },
    { value: "btree", view: "Banana Tree", cycle: { on: 6, off: 18 } },
    { value: "corn", view: "Corn", cycle: { on: 7, off: 17 } },
    { value: "cilantro", view: "Cilantro", cycle: { on: 8, off: 16 } },
    { value: "potato", view: "Potato", cycle: { on: 6, off: 18 } },
  ];

  plantText = "";
  selectedPlant: any = null;

  currentUser: any = { name: "Nick", gender: "male", plants: [{ value: "cactus" }, { value: "cilantro" }] };
  availablePlants: Plant[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("user") !== null) {
      this.currentUser = JSON.parse(localStorage.getItem("user")!);
    }

    this.availablePlants = this.validPlants.filter(plant => {
      return this.currentUser.plants.some((userPlant: any) => {
        console.log(userPlant, "plant")
        return userPlant.value === plant.value;
      });
    });

    console.log(this.availablePlants, "available plants");
  }

  changeUser() {
    this.router.navigate(["/user"]);
  }

  updateCard() {
    this.selectedPlant = this.availablePlants.find(plant => plant.value === this.plantText);
  }

  updatePlant() {
    // send request to API to update plant
    console.log(this.plantText, "plant!");

    if (this.plantText.length === 0) {
      // no plant selected
      return;
    }

    // send request
    this.http.get(`http://${this.server}/plants/${this.plantText}`, {}).subscribe({
      next: async (data: any) => {
        console.log(data, "data!")
      }
    })
  }

}
