import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a success message when signing up with valid email and password', async () => {
    const httpClientMock = {
      post: jest.fn().mockResolvedValue({ message: 'User registered successfully' })
    };
    const authService = new AuthService(httpClientMock as any);
    const user = { email: 'test@example.com', password: 'password123' };
    const response = await authService.signup(user);
    expect(response).toBe('User registered successfully');
    expect(httpClientMock.post).toHaveBeenCalledWith('https://entertainment-web-app-backend-2.onrender.com/api/register', user);
  });
});
