export class  Catalogue {
    public title: String="";
    public price: number=0;
    static price: number;
    static title: any;

    constructor(title:String,price:number){
      this.title=title;
      this.price=price;
    }
  }