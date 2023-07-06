import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  ko_name: string;

  @Field(() => String, { nullable: true })
  en_name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  company: string;

  @Field(() => String)
  team: string;
}
