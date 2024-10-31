import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const inspectUserUrl = 'http://localhost:3000/api/user/';
const duelUsersUrl = 'http://localhost:3000/api/users?';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  async inspectUser(username = 'andrew') {
    try {
      let data = await this.http.get(inspectUserUrl + username).toPromise();
      console.log(data);
      return data;
    } catch (error: any) {
      return {
        error: error.message,
        tips: `The user ${username} was not found...`,
      };
    }
  }

  async duelUsers(user1 = 'fabpot', user2 = 'andrew') {
    try {
      let data = await this.http
        .get(duelUsersUrl + `username=${user1}&username=${user2}`)
        .toPromise();
      console.log(data);
      return data;
    } catch (error: any) {
      return {
        error: error.message,
        tips: `Invalid user in one or both field...`,
      };
    }
  }
}
