class Person {
    constructor(private name: string){}
}

const bill = new Person('Maxim')

const btn = document.querySelector("#btn")!

btn.addEventListener('click', () => {
    console.log('Btn clicked!');
})

function logInfo(info: string, _?:number){
    const message = 'message'
    console.log(info)
}

logInfo('2')

