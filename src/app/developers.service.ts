import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Developer } from "./developer.model";

@Injectable({providedIn: 'root'})
export class DevelopersService {
    public developersChanged = new Subject<Developer[]>();
    private developers: Developer[] = [
        new Developer(
            'John', 
            'john@gmail.com', 
            '0882456557', 
            'Bulgaria', 
            'https://images.unsplash.com/photo-1585692144012-9957ec584538?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80', 
            20, 
            'Javascript', 
            'I am a programmer', 
            10, 'English', 
            'myLinkedIn.com'),

            new Developer(
                'Mark', 
                'mark@gmail.com', 
                '0883716345', 
                'England', 
                'https://images.unsplash.com/photo-1531905117481-2117c6655c72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80', 
                10, 
                '.NET', 
                'I am a programmer and more', 
                5, 'English', 
                'mark.linkedIn.com'),
    ];
    
    getDevelopers() {
        return [...this.developers];
    }

    getDeveloper(index: number) {
        return [...this.developers][index];
    }

    createDeveloper(developer: Developer) {
        this.developers.push(developer);
        this.developersChanged.next(this.getDevelopers());
    }

    editDeveloper(index: number, developer: Developer) {
        this.developers[index] = developer;
        this.developersChanged.next(this.getDevelopers());
    }

    deleteDeveloper(index: number) {
        this.developers.splice(index, 1);
        this.developersChanged.next(this.getDevelopers());
    }

}