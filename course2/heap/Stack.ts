export class Stack<T> {
  _store: T[] = [];
  push(val: T) {
    this._store.push(val);
  }
  pop(): T | undefined {
    return this._store.pop();
  }
  peek(): T | undefined{
      return this._store[this._store.length - 1];
  }
  isEmpty():boolean{
      return this._store.length === 0;
  }
  getSize():number{
      return this._store.length;
  }
}
