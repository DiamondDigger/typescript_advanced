/// <reference path='form-namespace.ts' />

namespace FormNamespace {

    class MyForm {
        private type: FormType = 'inline'
        private state: FormState = 'active'
        
        constructor(public email: string){}
        
        getInfo(): FormInfo {
            return {
                type: this.type,
                state: this.state
            }
        }
    }

    export const form = new MyForm('gg@gmail.com')
}
console.log(FormNamespace.form);