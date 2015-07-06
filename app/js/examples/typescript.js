class DisplayComponent {
    myName: string;
    names: Array<string>;
    constructor(friendsService: FriendsService) {
        this.myName = 'Alice';
        this.names = friendsService.names;
    }
}