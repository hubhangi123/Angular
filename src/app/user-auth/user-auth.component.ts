import { Component } from '@angular/core';
import { Login, cart, product, signUp } from 'data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  showLogin: boolean = true;
  authError: string = ""

  constructor(private user: UserService, private product: ProductService) { }

  ngOnInit() {
    this.user.userAuthReload();
  }

  signUp(data: signUp) {
    this.user.userSignUp(data)
  }


  login(data: Login) {
    this.user.userLogin(data)
    this.user.invaliduserAuth.subscribe((result) => {
      console.warn(result)
      if (result) {
        this.authError = "User not found"
      } else {
        this.localCartToRemoteCart()
      }
    })
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data)
      cartDataList.forEach((product: product,index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };
      

        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
             console.warn("Item stored in DB");
            }
         })
         if(cartDataList.length===index+1){
          localStorage.removeItem('localCart');
         }
        }, 500);
      })
    }
    setTimeout(() => {
      this.product.getcartList(userId);
    }, 2000);
  }

}

