import { Component, Input, OnInit  } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpServiceService} from '../http-service.service'
import { Catalogue } from '../_Classe/Catalogue';
import {
  map,
  distinctUntilChanged,
  debounceTime,
  tap,
  switchMap,
  catchError,
} from 'rxjs/operators';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  @Input() titreFilter:string;
  @Input() priceFilter:Number | undefined;
  
  catalogue:Catalogue[]=[];
  catalogueDisplayed:Catalogue[]=[];
  constructor(private httpService: HttpServiceService) {
    this.titreFilter="";    
  }
  title = 'TP3';

  model: Observable<Catalogue[]> = new Observable();
  searchField$: Observable<any> = new Observable();

  ngOnInit() {
    this.httpService.getData().then((data:any)=>{
      data.map((d:any)=>{
        this.catalogue.push(new Catalogue(d.title,d.price))
      })      
    }).then(()=>{
      this.catalogueDisplayed=this.catalogue;
      this.model = of(this.catalogue)
    })
  }

  filter(valuePrice:number | undefined,valueTitre:string){

    this.searchField$.pipe(tap((data: (any | undefined)[])=>{
      data.push(valuePrice);
      data.push(valueTitre);
    }))
    


    this.model = this.searchField$.pipe(
      map((data: { target: { value: any; }; }) => data.target.value),
      debounceTime(300),
      distinctUntilChanged(),
/*
      switchMap((term) =>
        {
          if(term===''){
            return of([]);
          }else{

          }

          if(valuePrice!= undefined && valuePrice!= null && Catalogue.price>valuePrice){
        
          }else{
            if(valueTitre=="" || Catalogue.title.includes(valueTitre)){
              this.model.push(Catalogue);
            }else{
    
            }        
          }
        }
      )*/
    );

    this.catalogueDisplayed=[];
    this.catalogue.map((Catalogue)=>{
      if(valuePrice!= undefined && valuePrice!= null && Catalogue.price>valuePrice){
        
      }else{
        if(valueTitre=="" || Catalogue.title.includes(valueTitre)){
          this.catalogueDisplayed.push(Catalogue);
        }else{

        }        
      }
    })
  }

}

