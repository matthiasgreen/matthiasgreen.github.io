function validIndex(indexX, indexY, maxX, maxY, minX=0, minY=0) {
	return ((minX <= indexX) && (indexX < maxX)) && ((minY <= indexY) && (indexY < maxY));
}
  
class Vect2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vect2(this.x, this.y);
  }

  add(other) {
    return new Vect2(this.x + other.x, this.y + other.y)
  }

  subtract(other) {
    return new Vect2(this.x - other.x, this.y - other.y)
  }

  multiply(scalar) {
    return new Vect2(this.x*scalar, this.y*scalar)
  }

  divide(scalar) {
    return new Vect2(this.x/scalar, this.y/scalar)
  }

  distSquared(other) {
    return (this.x-other.x) ** 2 + (this.y-other.y) ** 2;
  }

  dist(other) {
    return Math.sqrt(this.distSquared(other));
  }

  get norm(){
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalized() {
    return this.divide(this.norm)
  }
}