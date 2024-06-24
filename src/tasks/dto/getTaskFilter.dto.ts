import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../taskStatus.enum";

export class GetTaskFilterDto {

    @IsOptional()
    @IsIn([TaskStatus.DONE,TaskStatus.INPROGRESS,TaskStatus.OPEN])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    searchTerm: string;
}