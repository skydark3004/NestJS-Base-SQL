import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import { Types } from 'mongoose';

export function IsObjectId(input?: { options?: ValidationOptions; fieldOfChildClass?: string }) {
  return (object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: { ...input?.options, message: `${propertyName} is not an object ID` },
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, validationArguments?: ValidationArguments) {
          if (value instanceof Array) {
            for (const el of value) {
              const valueToValidate = input?.fieldOfChildClass ? el[input.fieldOfChildClass] : el;
              if (!Types.ObjectId.isValid(valueToValidate)) {
                return false;
              }
            }
          } else {
            const valueToValidate = input?.fieldOfChildClass ? value[input.fieldOfChildClass] : value;
            if (!Types.ObjectId.isValid(valueToValidate)) {
              return false;
            }
          }

          return true;
        },
      },
    });
  };
}
