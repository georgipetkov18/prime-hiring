import { Injectable } from "@angular/core";
import { Developer } from "./developer.model";

export class HiringInfo {
    constructor(public startDate: Date, public endDate: Date, public developers: Developer[]) { }
}


@Injectable({ providedIn: 'root' })
export class HiringService {
    hiringInformation: HiringInfo[] = [];

    isHired(developer: Developer, startDate: Date, endDate: Date) {
        let developerJobs = this.hiringInformation.filter(i => i.developers.includes(developer));

            return developerJobs.some(j => 
                (j.startDate.getTime() < startDate.getTime() &&
                startDate.getTime() < j.endDate.getTime()) || 
                (j.startDate.getTime() < endDate.getTime() &&
                endDate.getTime() < j.endDate.getTime()))
    }

    hireDevelopers(developers: Developer[], startDate: Date, endDate: Date) {
        let jobAlreadyExists = this.hiringInformation.some(i => i.startDate.getTime() === startDate.getTime() &&
            i.endDate.getTime() === endDate.getTime())
        if (jobAlreadyExists) {
            this.hiringInformation.find(i => i.startDate.getTime() === startDate.getTime() &&
                i.endDate.getTime() === endDate.getTime())
                ?.developers.push(...developers);
        }
        else {
            this.hiringInformation.push(new HiringInfo(startDate, endDate, developers));
        }
    }

    getHiringInformation() {
        return [...this.hiringInformation];
    }
}