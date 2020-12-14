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

 