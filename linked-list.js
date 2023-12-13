/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if(this.head === null){
      this.head = newNode;
    }
    if(this.tail !== null){
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if(this.head !== null){
      newNode.next = this.head;
    }
    if(this.tail === null){
      this.tail = newNode;
    }

    this.head = newNode;
    this.length++;
  }


  _get(idx){
    let current = this.head;
    for(let i = 0; i !== idx && current !== null; i++){
      current = current.next;
    }

    return current;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length-1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if(idx >= this.length || idx < 0){
      throw new Error('Invalid index');
    }
    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if(idx >= this.length || idx < 0){
      throw new Error('Invalid index');
    }
    this._get(idx).val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if(idx > this.length || idx < 0){
      throw new Error("Invalid index.");
    }
    if(idx === 0){
      return this.unshift(val);
    }
    if(idx === this.length){
      return this.push(val);
    }

    let prev = this._get(idx-1);

    let newNode = new Node(val);
    newNode.next = prev.next;
    prev.next = newNode;

    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    let previous = this._get(idx-1);

    if(idx >= this.length || idx < 0){
      throw new Error('Invalid index')
    }


    if(idx === 0){
      let val = this.head.val;
      this.head = this.head.next;
      this.length--;
      if(this.length < 2){
        this.tail = this.head;
      }
      return val;
    }

    if(idx === this.length-1){
      let val = previous.next.val;
      previous.next = null;
      this.tail = previous;
      this.length--;
      return val;
    }

    let val = previous.next.val;
    previous.next = previous.next.next;
    this.length--;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    let total = 0;
    let current = this.head;

    while(current !== null){
      total += current.val;
      current = current.next;
    }

    if(this.length === 0){
      return 0;
    }

    return total/this.length;
  }
}

module.exports = LinkedList;
