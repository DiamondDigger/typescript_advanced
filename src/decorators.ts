function Log(constructor: Function){
    console.log('CLASS DESCRIPTOR');
    
    console.log(constructor)
}

function Log2(target :any, propName: string | Symbol){
    console.log('FIELD DESCRIPTOR');
    
    console.log(target);
    console.log(propName);
}

function Log3(target: any, propName: string | Symbol, descriptor: PropertyDescriptor){
    console.log('FUNCTION DESCRIPTOR');
    
    console.log(target);
    console.log(propName);
    console.log('<----descriptor---->: ', descriptor);
}

@Log
class Component2 {
    @Log2
    name: string


    @Log3
    get componentName() {
        return this.name
    }

    constructor(name: string) {
        this.name = name
    }
    
    @Log3
    logName(): void {
        console.log(`Component Name: ${this.name}`);
    }
}
// ---------------->

interface ComponentDecorator {
    selector: string
    template: string 
}

function Component(config: ComponentDecorator) {
    return function
        <T extends {new(...args: any[]): object}>
    (Constructor: T){
        return class extends Constructor {
            constructor(...args: any[]) {
                super(...args)

                const el = document.querySelector(config.selector)!
                el.innerHTML = config.template
            }
        }
    }

}

function Bind(_: any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor{
    const original = descriptor.value
    console.log('descriptor.original: ', descriptor);
    

    return {
        configurable: true,
        enumerable: false,
        get() {
            return original.bind(this)
        }
    }
}

@Component({
    selector: '#card',
    template: `
     <div class='card'>
        <div class='card-content'>
            <span class='card-title'>Card Component</span>
        </div>
     </div>
    `
})
class CardComponent {
    constructor(public name: string) {
    }
    
    @Bind
    logName(): void {
        console.log(`Component name: ${this.name}`);
        
    }
    
    @Bind
    logName2(): void {
        console.log(` -name- : ${this.name}`);
        
    }
}

const card = new CardComponent('My Card Component')

const button = document.querySelector('#btn')!

button.addEventListener('click', card.logName)
button.addEventListener('click', card.logName2)

//--------------------->

type ValidatorType = 'required' | 'email'

interface ValidatorConfig {
    [prop: string] : {                  // class name
        [validateProp: string]: ValidatorType
    }
}

const  validators: ValidatorConfig = {}

function validate(obj: any): boolean {
    const objConfig = validators[obj.constructor.name]  
    if (!objConfig) {
        return true
    }
    let isValid = true
    Object.keys(objConfig).forEach(key => {
       if (objConfig[key] === 'required') {
            isValid = isValid && obj[key]
            console.log(`obj[${key}]: `, obj[key] );
       }
    })
    return isValid
}

function Required(target: any, propName: string){
    validators[target.constructor.name] = {
        ...validators[target.constructor.name],
        [propName] : 'required'
    }
}

class Form {
    @Required
    public email: string | void

    constructor(email?: string) {
        this.email = email
    }
}

const form = new Form()

console.log(form);

if(validate(form)) {
    console.log('Validate:', form);
} else {
    console.log('Validation error');
}