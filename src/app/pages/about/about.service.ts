import {Injectable,EventEmitter} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AboutService {
    public imageview:EventEmitter<boolean>=new EventEmitter()
    constructor(){
        
    }
    changeView(isVisible:boolean){
        this.imageview.emit(isVisible)
    }
}