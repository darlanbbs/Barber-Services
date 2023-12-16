import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "phoneNumber", async: false })
export class PhoneNumberValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const phoneNumberRegex = /^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/;
    return phoneNumberRegex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return "O número de telefone é inválido.";
  }
}
