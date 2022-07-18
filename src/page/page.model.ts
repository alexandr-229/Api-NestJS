import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose'

export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products
}

export class HHData {
    
    @prop()
    count: number;

    @prop()
    jniorSalary: number;

    @prop()
    middleSalary: number;

    @prop()
    seniorSalary: number;
}

export class PageAdvanteg {

    @prop()
    title: string;

    @prop()
    description: string;
}

export interface PageModel extends Base {}
export class PageModel extends TimeStamps{

    @prop({ enum: TopLevelCategory })
    firstLevelCategory: TopLevelCategory;

    @prop()
    secondCategory: string;

    @prop()
    title: string;

    @prop()
    category: string;

    @prop({ type: () => HHData})
    hh?: HHData;

    @prop({ type: () => [PageAdvanteg]})
    advantages: PageAdvanteg[];

    @prop()
    seoText: string;

    @prop()
    tagsTitle: string;

    @prop({ type: () => [String]})
    tags: string[];
}
