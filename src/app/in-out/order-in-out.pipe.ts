import { Pipe, PipeTransform } from '@angular/core';
import { InOut } from './in-out.model';

@Pipe({
  name: 'orderInOut'
})
export class OrderInOutPipe implements PipeTransform {

  transform(items: InOut[]): InOut[] {
    return items.sort((a, b) => {
      if (a.type === 'in') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
