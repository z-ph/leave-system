export enum Role {
    normal = "普通用户",
    centerDirector = "中心主任",
    deputyDirector = "教学部副职",
    departmentDirector = "教学部正职"
}
export function getRoleGrade(role: Role|undefined): number {
    switch (role) {
        case Role.normal:
            return 0;
        case Role.centerDirector:
            return 1;
        case Role.deputyDirector:
            return 2;
        case Role.departmentDirector:
            return 3;
        default:
            return 0;
    }
}