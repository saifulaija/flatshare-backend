
type IOptions={
    page?:number;
    limit?:number;
    sortOrder?:string;
    sortBy?:string
}

type IOptionsResult={
    page:number;
    limit:number;
    skip:number;
    sortBy:string;
    sortOrder:string

}
const calculatePagination=(options:IOptions):IOptionsResult=>{
const page=Number(options.page) || 1;
const limit =Number(options.limit) || 10;
const skip=(Number(page)-1)*Number(limit);
const sortBy=options.sortBy || 'createdAt';
const sortOrder=options.sortOrder || 'desc';

return {
page,
limit,
skip,
sortBy,
sortOrder
}

}

export const paginationHelper={
    calculatePagination
}