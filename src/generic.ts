const cars1: string[] = ['ford', 'bmw']
const cars2: Array<string> = ['ford', 'bmw']

// const promise: Promise<string> = new Promise(resolve => {
//     setTimeout(()=> {
//         resolve('promise resolved');        
//     }, 2000)

//     promise.then(data => {
//         console.log(data.toUpperCase)
//     })
// })

function mergeObjects<T extends object, R extends object>(a: T, b: R) {
    return Object.assign({}, a, b)
}

const merged = mergeObjects({name: 'Billy'}, {specialty: 'fireman'})
console.log(merged.specialty);

const merged2 = mergeObjects({model: 'ford'}, {engine: 'v6 3.0L'})
console.log(merged2.engine)

//--------------->

interface ILength{
    length: number
}

function withCount<T extends ILength>(value: T): {value: T, count: string}{
    return {
        value,
        count: `This object has ${value.length} symbols`
    }
}

console.log(withCount('Hello buddy, how are you? Give me a beer for me and my fellas, please '))
console.log(withCount([1,3,4,'hello',5]));
console.log(withCount({length: 342}));

//---------------->

function getObjectValue<T extends object, R extends keyof T>(obj: T, key: R){
    return obj[key]
}

const person = {
    age: 132,
    name: 'John',
    job: 'vampire'
}

console.log(getObjectValue(person, 'age'))
console.log(getObjectValue(person, 'name'))
console.log(getObjectValue(person, 'job'))

//----------------->
class Collection <T extends number | string | boolean>{
    // private _items: T[] = []
    constructor(private _items: T[] = []){}

    add(item: T){
        this._items.push(item)
    }
    remove(item: T){
        this._items = this._items.filter(i => i != item)
    }
    get items(): T[]{
        return this._items
    }
}

const numbers = new Collection<number>([1,2,3,4,5])
numbers.add(6)
numbers.remove(1)
console.log(numbers.items)

const strings = new Collection<string>(['h', 'e','l','l','o'])
strings.add('b')
strings.remove('l')
console.log(strings.items)

// const objs = new Collection([{a: 1}, {b: 2}])
// objs.remove({a: 1})
// console.log(objs.items)

//------------------->

interface Car {
    model: string,
    year: number 
}

const bmw: Partial<Car> = {}

function createCarAndValidate(model: string, year: number): Car{
    const car: Partial<Car> = {}

    if (model.length > 3){
        car.model = model
    }

    if (year > 2000) {
        car.year = year
    }

    return car as Car
}

const audi = createCarAndValidate('audi', 3020)

const arrOfNumbers: Array<number> = [1,2,3,4,5]
arrOfNumbers.shift()
arrOfNumbers.unshift(100)

console.log(arrOfNumbers)

const arrOfNumbersReadOnly:Readonly <Array<number>> = [10,20,30,40,50]
console.log(arrOfNumbersReadOnly[4]);

const ford:Readonly< Car> = {
    model: 'ford',
    year: 2024
}

// ford.model= 'jaguar'
// console.log(ford.model);
