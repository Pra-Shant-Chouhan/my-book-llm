import {flattenError, type ZodError} from "zod";


export function zodFiledErrors(error:ZodError): Record<string, string[]> {
    return flattenError(error).fieldErrors;
}