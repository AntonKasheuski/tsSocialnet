let state = {
    profilePage: {
        dialogs: [
            {id: 1, name: 'Daria'},
            {id: 2, name: 'Vasya'},
            {id: 3, name: 'Petya'},
            {id: 4, name: 'Sasha'},
            {id: 5, name: 'Viktor'},
            {id: 6, name: 'Antonio'}
        ],
        messages: [
            {id: 1, message: 'Hi!'},
            {id: 2, message: 'Hey!'},
            {id: 3, message: 'Yo!'},
            {id: 4, message: 'Yo!'},
            {id: 5, message: 'Yo!'}
        ]
    },
    dialogPage: {
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 15},
            {id: 2, message: "It's my first post", likesCount: 20}
        ]}
}

export default state;