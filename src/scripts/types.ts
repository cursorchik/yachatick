export type UserData = {
	img: string,
	name: string,
	messages: { owner: boolean, message: string, time: string }[]
}