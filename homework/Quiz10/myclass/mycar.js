class Car {
  emphysema = 'Sonata';
  power = 100;
  color = 'Black'
  start = () => {
    console.log('출발합니다');
  }
  stop = () => {
    console.log('정지합니다');
  }
}

const mycar = new Car();
console.log(mycar.power);
console.log(mycar.color);
mycar.start();