import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ordinal'})
export class OrdinalPipe implements PipeTransform {
  transform(value: string|number): string {
    let i = Number(value);
    let j = i % 10,
       k = i % 100;
    if (j === 1 && k !== 11) {
        return i + 'st';
    }
    if (j === 2 && k !== 12) {
        return i + 'nd';
    }
    if (j === 3 && k !== 13) {
        return i + 'rd';
    }
    return i + 'th';
    }
}


