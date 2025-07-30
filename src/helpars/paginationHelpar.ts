interface IOptions{
        page?:number
        limit?:number
        sortOrder?:string
        sortBy?:string    
}

interface IOptionsReslt extends IOptions{
    skip:number
}




const calculatePagination = (
    options: IOptions
): IOptionsReslt=>{
    const page : number = Number(options.page) || 1;
    const limit:number = Number(options.limit) || 10;
    const skip : number = (Number(page) -1) * limit;
    const sortBy: string = options.sortBy || 'createdAt';
    const sortOrder: string = options.sortOrder || 'desc';

    return{
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }

}

export const paginationHelpar = {
    calculatePagination
}