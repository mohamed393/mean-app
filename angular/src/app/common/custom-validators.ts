// ' ' this space has value  
import{AbstractControl,ValidationErrors} from '@angular/forms'
export class CustomValidators{
    static space(control:AbstractControl):ValidationErrors | null{
        let value:string = control.value
        if(value.indexOf(' ')== -1){
            return null
        }else{
            return {space:{hasSpace:true}};
        }
    }
}