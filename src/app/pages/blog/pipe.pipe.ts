import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipe'
})
export class PipePipe implements PipeTransform {

  transform(blog: any, term: any): any {
    if ( term === undefined) {
        return blog;
      }
    return blog.filter(function(bl){
      console.log(blog)
      console.log(bl)
      return bl.title.toLowercase().includes(term.toLowercase());
    });
  }

}
