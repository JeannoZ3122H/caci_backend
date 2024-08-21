import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

// Validateur personnalisé pour les images
export function imageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const file = control.value;
        if (file && file instanceof File) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif']; // Types d'images acceptés
            return validTypes.includes(file.type) ? null : { invalidImage: true };
        }
        return null;
    };
}