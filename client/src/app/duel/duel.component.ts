import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css'],
})
export class DuelComponent implements OnInit {
  usernameOne: string = '';
  usernameTwo: string = '';
  user1Data: any;
  user2Data: any;
  user1Win = false;
  user2Win = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }
  compareDev(user1: any, user2: any) {
    if (user1['followers'] > user2['followers']) {
      this.user1Win = true;
    } else if (user1['followers'] == user2['followers']) {
      this.user1Win = true;
      this.user2Win = true;
    } else {
      this.user2Win = true;
    }
  }

  async onSubmit() {
    this.user1Win = false;
    this.user2Win = false;
    try {
      const data: any = await this.userService.duelUsers(
        this.usernameOne,
        this.usernameTwo
      );
      console.log(data);
      if (Array.isArray(data) && data.length == 2) {
        this.user1Data = data[0];
        this.user2Data = data[1];
        this.compareDev(data[0], data[1]);
      } else {
        this.user1Data = data;
        this.user2Data = data;
      }
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  }
}
