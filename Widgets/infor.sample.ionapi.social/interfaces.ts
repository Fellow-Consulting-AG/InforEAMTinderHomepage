
export interface ISocialUser {
	FirstName?: string;
	LastName?: string;
	Email?: string;
	Title?: string;
	UserGUID?: string;
}

export interface IUserDetailResponse {
	UserDetailList: ISocialUser[];
	Status: number;
	ErrorList: {}[];
}
