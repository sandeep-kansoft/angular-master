import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequestDto } from '../../models/LoginRequestDto.model';
import { AuthModel } from '../../models/auth.model';
import { AuthHTTPService } from '../../services/auth-http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  defaultAuth: any = {
    email: '',
    password: '',
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  // isLoading$: Observable<boolean>;
  errorMessage: string = 'The login details are incorrect';
  isLoading: boolean = false;
  isSubmitButtonClicked: boolean = false;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private authHttpService: AuthHTTPService,
    private cdr: ChangeDetectorRef
  ) {
    // this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/purchase-requisition/pr-overview']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] ||
      '/purchase-requisition/pr-overview';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.isSubmitButtonClicked = true;
    if (this.isLoading) this.hasError = false;
    this.isLoading = true;
    const payload: LoginRequestDto = {
      AzureToken: '',
      Password: this.f.password.value,
      UserNameOrEmailAddress: this.f.email.value,
      SingleSignIn: false,
    };

    this.authHttpService.login(payload).subscribe({
      next: (auth: AuthModel) => {
        if (auth) {
          const result = this.authService.setAuthFromLocalStorage(auth);
          if (result) {
            this.router.navigate(['/']);
          }
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = err?.ErrorDetail;
        this.cdr.detectChanges();
      },
    });

    this.cdr.detectChanges();
    // subscribe(
    //   (auth: AuthModel) => {
    //     const result = this.authService.setAuthFromLocalStorage(auth);
    //     if (result) {
    //       this.router.navigate(['/crafted/pages/profile/overview']);
    //     }
    //   },
    //   (err) => {
    //     console.log('Error occured while loggin in', err);
    //   }
    // );
  }

  ngOnDestroy() {
    this.cdr.detach();
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
