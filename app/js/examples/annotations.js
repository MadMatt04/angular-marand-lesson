@Component({
    selector: 'todo-list'
})
@View({
    directives: [NgFor, NIf]
})
class TodoList {
    todos: Array<string>;

    constructor() {
        this.todos = ["Eat Breakfast", "Walk Dog", "Breathe"];
    }
}