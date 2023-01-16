import { Doors, Draw, Treasures } from './../deck';

const draw = new Draw();
const treasures = new Treasures(draw);
const doors = new Doors(draw);

let a = [...treasures.take(1), ...doors.take(2)];
let b = [...treasures.take(2), ...doors.take(1)];
console.log(`AAA\n${JSON.stringify(a, null, 3)}`);
console.log(`BBB\n${JSON.stringify(b, null, 3)}`);
console.log(JSON.stringify(treasures, null, 3));
console.log(JSON.stringify(doors, null, 3));

draw.put([...b])
b = [];

console.log(JSON.stringify(doors, null, 3));
console.log(JSON.stringify(treasures, null, 3));
