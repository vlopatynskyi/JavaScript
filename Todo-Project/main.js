'use strict';

const todo = {
    tasks: [],
    lastId: 0,
    add(text) {
        
            this.tasks.push({
                id: this.lastId + 1 ,
                text: text,
                completed: false,
            });
        this.lastId++;
        return this;
    },
    
    remove(id) {

        const index = this.tasks.findIndex(task => task.id === id)

        if(index !== -1) {
            this.tasks.splice(index, 1);

            let newId = 1;
            for(let task of this.tasks) {
                task.id = newId;

                newId++;
            };
            this.lastId--;
        }
        
        return this;
    },

    complete(id) {
        const task = this.tasks.find(task => task.id === id);
       if( task ){
        task.completed = true;
       };
        return this;
    },

    show() {
        this.tasks.forEach((item) => console.log(item));
        return this;
    },

    toggle(id) {
        const task = this.tasks.find(task => task.id === id);
        if( task ){
        task.completed = !task.completed;
        };
        return this;
    },

    clearCompleted() {

        this.tasks = this.tasks.filter(task => !task.completed);

        let newId = 1;
            for(let task of this.tasks) {
                task.id = newId;

                newId++;
            };
            this.lastId = this.tasks.length;
        return this;
    },

    filter(status) {
        if(status === 'all') {
            return(this.tasks);
        }
        else if(status === 'active') {
            return(this.tasks.filter(item => !item.completed));
        } 
        else if(status === 'completed') {
            return this.tasks.filter(item => item.completed);
        }
         return 'Unknown status';
    },
};


todo.add('JavaScript lessons').add('Programming').add('Polish')
todo.complete(3);

console.log( todo.filter("completed") );



