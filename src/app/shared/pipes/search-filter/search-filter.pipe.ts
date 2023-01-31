import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any {
    if (!items) return [];
    if (!searchText) return items;
    if (searchText.length >=3) {
      return items.filter(item => {
        return Object.keys(item).some(key => {
          return String(item[key]).toLowerCase().includes(searchText.toLowerCase());
        });
      });
    }
    else if (searchText.length < 3) {
      searchText = searchText.substring(0, searchText.length - searchText.length % 4);
      return items.filter(item => {
        return Object.keys(item).some(key => {
          return String(item[key]).toLowerCase().includes(searchText.toLowerCase());
        });
      });
    }
  }
}
