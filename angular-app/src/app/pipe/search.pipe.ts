/** Imports */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  /**
   * Returns a filtered array of elements who have
   * at least one parameter matching the filter.
   * 
   * @param items     the array to be filtered
   * @param filter    the string for matching
   */
  transform(items: any[], filter: String): any {
    if(!items || !filter) {
      return items;
    }

    return items.filter((item) => {
      if(item.name.toLowerCase().includes(filter.toLowerCase())){
        return true;
      }
      else if(item.email.toLowerCase().includes(filter.toLowerCase())){
        return true;
      }
      else if(item.location.toLowerCase().includes(filter.toLowerCase())){
        return true;
      }
      else if(item.primary.toLowerCase().includes(filter.toLowerCase())){
        return true;
      }
    });

  }

}
