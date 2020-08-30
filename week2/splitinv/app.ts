import {InversionCounter, Comparator} from "./InversionCounter";
const fs = require('fs')
fs.readFile('input.txt', 'utf8', function(err, data) {
  if (err){
      throw err;
  }
  let input = data.split('\n').map(i => parseInt(i));
  const ans = InversionCounter.sortAndCount(input, comp);
  console.log(ans);
});

const comp:Comparator<number> = {
    isLessThanOrEq:(a:number, b:number):boolean => {
        return a <= b;
    }
};
