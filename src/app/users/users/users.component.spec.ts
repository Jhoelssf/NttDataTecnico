import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { User } from '../users.model';
import { UsersService } from '../users.service';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let usersService: UsersService;

  const usersMock: User[] = [
    {
      userId: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      userName: 'johnDoe',
      phone: '123456789',
      address: 'Street 123',
      city: 'City',
      country: 'Country',
      birthDate: '2000-01-01',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [HttpClientTestingModule, RouterModule],
      providers: [UsersService, provideToastr()],
    });

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);

    spyOn(usersService, 'getUsers').and.returnValue(of(usersMock));
  });

  it('should call getUsers on init', () => {
    fixture.detectChanges();

    expect(usersService.getUsers).toHaveBeenCalled();
  });

  it('should set users on init', () => {
    fixture.detectChanges();

    expect(component.users).toEqual(usersMock);
  });

  it('should handle error on init', () => {
    (usersService.getUsers as jasmine.Spy).and.returnValue(
      throwError(() => new Error('Error'))
    );
    fixture.detectChanges();

    expect(component.users).toEqual([]);
  });
});
