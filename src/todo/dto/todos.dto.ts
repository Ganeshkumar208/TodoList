export interface TodoDto {
  id:number;

  Activity: string | null;

  Status: string | null;

  DateToComplete: Date | null;
 
  StartDate: Date | null;
 
  StartTime: number | null;
 
  CompletedDate: Date | null;
  
  CompletedTime: number | null;
}