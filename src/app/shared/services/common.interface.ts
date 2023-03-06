
export interface IPermissionlistDataDto {
    userId: number;
    permissionId: number;
    permissionCode: string;
    permissionName: string;
    permissionDetails: string;
}

export interface IPermissionlist2DataDto {
    userId: number;
    permissionId: number;
    permissionCode: string;
    permissionName: string;
    permissionDetails: string;
}

export interface Childmenu {
    menuId: number;
    menuName: string;
    menuCode: string;
    parentId: number;
    filePath?:string;
    permissionlist: IPermissionlist2DataDto[];
}

export interface IMenuDataDto {
    menuId: number;
    menuName: string;
    menuCode: string;
    parentId: number;
    filePath?:string;
    permissionlist: IPermissionlistDataDto[];
    childmenu: Childmenu[];
}

export interface IMenuResponseDataDto {
    data: IMenuDataDto[];
    success: boolean;
    error?: any;
    errorDetail?: any;
}

export interface IPermissionDataDto {
    data: IPermissionlistDataDto[];
    success: boolean;
    error?: any;
    errorDetail?: any;
}






