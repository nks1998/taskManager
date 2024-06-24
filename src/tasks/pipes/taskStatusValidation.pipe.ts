import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../taskStatus.enum";

export class TaskStatusValidate implements PipeTransform {
    readonly statusAllowed = [
        TaskStatus.DONE,
        TaskStatus.INPROGRESS,
        TaskStatus.OPEN
    ]
    private checkValidation(givenStatus: any) {
        return this.statusAllowed.includes(givenStatus)
    }
    transform(value: any) {
        value.toUpperCase()
        if(!this.checkValidation){
            throw new BadRequestException("Invalid Status")
        }
        return value
    }
}