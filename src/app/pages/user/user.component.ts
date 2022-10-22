import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface sPlant {
  value: string,
}

interface User {
  name: string,
  gender: string,
  plants: sPlant[]
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router) { }

  users: User[] = [
    { name: "David", gender: "male", plants: [{ value: "potato" }, { value: "btree" }, { value: "cilantro" }] },
    { name: "Wanetta", gender: "female", plants: [{ value: "tulips" }, { value: "asparagus" }, { value: "corn" }] },
    { name: "Nick", gender: "male", plants: [{ value: "cactus" }, { value: "cilantro" }] },
  ];

  ngOnInit(): void {
  }

  changeUser(user: User) {
    // redirect to home page with user in local storage
    localStorage.setItem("user", JSON.stringify(user));

    this.router.navigate(["/"]);
  }
}
