import { Draw, Treasures } from './../deck';

const draw = new Draw();
const treasures = new Treasures(draw);

let a = treasures.take(3);
// const b = treasures.take(2);
console.log(`AAA\n${JSON.stringify(a, null, 3)}`);
console.log(JSON.stringify(treasures, null, 3));

draw.put([...a])
a = [];

console.log(`AAA\n${JSON.stringify(a, null, 3)}`);
console.log(JSON.stringify(treasures, null, 3));

a = [...a, ...treasures.take(2)];

console.log(`AAA\n${JSON.stringify(a, null, 3)}`);
console.log(JSON.stringify(treasures, null, 3));

// draw.put([...a, ...b]);
// const c = treasures.take(6);
// console.log(`CCC\n${JSON.stringify(c, null, 3)}`)
