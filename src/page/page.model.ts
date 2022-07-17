export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products
}

export class PageModel {
    _id: string;
    firstLevelCategory: TopLevelCategory;
    secondCategory: string;
    title: string;
    category: string;
    hh?: {
        count: number;
        jniorSalary: number;
        middleSalary: number;
        seniorSalary: number
    };
    advantages: {
        title: string;
        description: string;
    }[];
    seoText: string;
    tagsTitle: string;
    tags: string[];
}
