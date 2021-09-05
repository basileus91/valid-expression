import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'valid-expression';
  expression: any;
  isValidExpression = false;
  operatorExpression = new RegExp('(?<=[-+*/])|(?=[-+*/])');
  sinExpression = new RegExp('sin(.+?)');
  cosExpression = new RegExp('cos(.+?)');
  tanExpression = new RegExp('tan(.+?)');
  result = 0;

  validate(): void {
    const arr = this.expression.split(this.operatorExpression);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      if (this.isOperator(arr[i].trim()) || this.isNumber(arr[i].trim()) || this.isSpecialExpression(arr[i])) {
        this.isValidExpression = true;
        if (this.isSpecialExpression(arr[i])){
          if (this.sinExpression.test(arr[i].trim())) {
            arr[i] = Math.sin(arr[i].match(/(\d+)/)[0]);
          } else if (this.cosExpression.test(arr[i].trim())) {
            arr[i] = Math.cos(arr[i].match(/(\d+)/)[0]);
          } else if (this.tanExpression.test(arr[i].trim())) {
            arr[i] =  Math.tan(arr[i].match(/(\d+)/)[0]);
          }
        }
      } else {
        this.isValidExpression = false;
      }
    }
    // tslint:disable-next-line:variable-name
    let string = '';
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      string += arr[i];
    }
    this.result = this.calculateString(string);
  }

  calculateString(fn): number {
    return new Function('return ' + fn)();
  }

  isOperator(str: string): boolean {
    return this.operatorExpression.test(str);
  }

  isNumber(str: string): boolean {
    return !isNaN(+str);
  }

  isSpecialExpression(str: string): boolean {
    return this.sinExpression.test(str.trim()) || this.cosExpression.test(str.trim()) || this.tanExpression.test(str.trim());
  }
}
