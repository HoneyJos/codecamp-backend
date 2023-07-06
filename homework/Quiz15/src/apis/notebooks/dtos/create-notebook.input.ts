import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNotebookInput {
  @Field(() => String)
  serialNumber: string;

  @Field(() => Date, { nullable: true })
  used_yearmonth?: Date;

  @Field(() => Date, { nullable: true })
  made_yearmonth?: Date;

  @Field(() => String, { nullable: true })
  note?: string;

  @Field(() => Date)
  purchase_date: Date;

  @Field(() => Date, { nullable: true })
  transfer_date?: Date;

  @Field(() => String)
  statusId: string;

  @Field(() => String)
  userId: string;
}
