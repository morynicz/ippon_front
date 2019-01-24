export class LocationSpy {
    clicked: boolean = false;
    back(): void {
        this.clicked = true;
    }

    path(): string { //Apparently used by router or sth?
        return "";
    }
}