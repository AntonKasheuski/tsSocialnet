export type DialogType = {
    id: number,
    name: string
}
export type SidebarType = {
    friends: Array<DialogType>
}
//export type SidebarActionType =

const initialState = {
    friends: [
        {id: 1, name: 'Sasha'},
        {id: 2, name: 'Viktor'},
        {id: 3, name: 'Antonio'},
    ]
}

const sidebarReducer = (state: SidebarType = initialState, action: any) => {
    return state;
}

export default sidebarReducer;