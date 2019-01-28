import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  title = 'Grid';
  allUser: User[];
  statusCode: number;
  requestProcessing = false;
  userIdToUpdate = null;
  processValidation = false;

  userForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getAllUser();
  }


  getAllUser() {
    this.userService.getAllUser()
      .subscribe(
        data => this.allUser = data,
        errorCode => this.statusCode = errorCode);
  }


  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

  onUserFormSubmit() {
    this.processValidation = true;
    if (this.userForm.invalid) {
      return;
    }
    let userValues = this.userForm.value;

    if (this.userIdToUpdate == null) {
      this.userService.createUser(userValues)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllUser();
          this.userIdToUpdate = null;
          this.userForm.reset();
          this.processValidation = false;
        },
          errorCode => this.statusCode = errorCode
        );
    } else {
      userValues.id = this.userIdToUpdate;
      this.userService.updateArticle(userValues)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllUser();
          this.userIdToUpdate = null;
          this.userForm.reset();
          this.processValidation = false;
        },
          errorCode => this.statusCode = errorCode);

    }


  }

  loadUserToEdit(userId: string) {
    this.userIdToUpdate = userId;
    this.userService.getUserById(userId)
      .subscribe(user => {
        this.userIdToUpdate = user.id;
        this.userForm.setValue({ name: user.name });
        this.processValidation = true;
        this.requestProcessing = false;
      },
        errorCode => this.statusCode = errorCode);
  }

  deleteUser(userId: string) {
    this.userService.deleteUserById(userId)
      .subscribe(successCode => {
        this.statusCode = 204;
        this.getAllUser();
      },
        errorCode => this.statusCode = errorCode);
  }
}