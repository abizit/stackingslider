class OPSlider {
    isSliding: boolean = false;
    readonly wrapper: Element;
    private sections: HTMLElement[];
    readonly sectionsCount: number;
    private current: number;
    transitions = {
        "transition": "transitionend",
        "OTransition": "oTransitionEnd",
        "MozTransition": "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    };
    sectionTransition: string;

    constructor(public selector: HTMLElement, public transitionTime: number) {
        this.wrapper = this.selector.querySelector('.op-wrapper');
        let items = this.wrapper.querySelectorAll('.slide-item');
        this._itemsClone(items);
        this.sections = Array.prototype.slice.call(this.wrapper.querySelectorAll('.slide-item'));
        this.sectionsCount = this.sections.length;
        this.current = 0;
        this.init();
    }

    init() {
        if (this.sectionsCount < 2) {
            console.log('Need minimum two slides');
            return
        }
        // set transition time to :root to be used by CSS
        document.documentElement.style.setProperty('--transitiontime', `${this.transitionTime.toString()}ms`);

        // find which transitionEnd is being used by the browser
        this.sectionTransition = this._transitionFinder();

        //Setup initial Classes to the slider
        this.selector.classList.add('op-outer');
        this.sections[this.current].classList.add('active-item');
        this.sections[this.current + 1].classList.add('next-item');
        this.sections[this.sectionsCount - 1].classList.add('prev-item');

        // Setup Left Right Navigation
        let navLeft = document.createElement('div'),
            navRight = document.createElement('div'),
            nav = document.createElement('nav');
        navLeft.className = 'op-nav-left';
        navRight.className = 'op-nav-right';
        nav.className = 'op-nav';

        nav.appendChild(navLeft);
        nav.appendChild(navRight);

        this.selector.insertBefore(nav, this.wrapper);

        navLeft.addEventListener('click', () => {
            this._navigate('prev')
        });
        navRight.addEventListener('click', () => {
            this._navigate('next')
        });

    }

    private _navigate(direction: string) {
        // check if transition is still happening
        if (this.isSliding) {
            return;
        }
        this.isSliding = true;
        let prev = this.current === 0 ? this.sectionsCount - 1 : this.current - 1;
        let next = this.current < this.sectionsCount - 1 ? this.current + 1 : 0;
        let nextSection;
        if (direction === 'next') {
            nextSection = next < this.sectionsCount - 1 ? next + 1 : 0;
        }
        if (direction === 'prev') {
            nextSection = prev > 0 ? prev - 1 : this.sectionsCount - 1;
        }

        this._transitionSlide(nextSection, direction, prev, next);
        // Add TransitionEnd eventlistener to the active slide
        this.sections[this.current].addEventListener(this.sectionTransition, () => this._triggertransitionEnd(), false)
    }

    private _triggertransitionEnd() {
        this.isSliding = false;
    }

    // Trigger Transition Event
    private _transitionSlide(nextSection: number, direction: string, prev: number, next: number) {
        // Remove the eventlistener from the previous active slider
        this.sections[nextSection].removeEventListener(this.sectionTransition, () => this._triggertransitionEnd(), false);
        this.sections.forEach((el) => {
            el.className = 'slide-item';
        });
        if (direction === 'next') {
            this.sections[this.current].classList.add('prev-item');
            this.sections[next].classList.add('active-item');
            this.sections[nextSection].classList.add('next-item');
            this.current = this.current < this.sectionsCount - 1 ? this.current + 1 : 0;
        }

        if (direction === 'prev') {
            this.sections[prev].classList.add('active-item');
            this.sections[this.current].classList.add('next-item', 'moving-right');
            this.sections[nextSection].classList.add('prev-item');
            this.current = this.current > 0 ? this.current - 1 : this.sectionsCount - 1;
        }
    }


    // Clone Items for circular effect
    // if the slides are less than or equal to 2 clone 3 times so as to have atleast 6 slides
    private _itemsClone(items) {
        for (let itemsCount = items.length <= 2 ? 3 : items.length; itemsCount <= items.length; itemsCount++) {
            for (let itemsKey in items) {
                if (items.hasOwnProperty(itemsKey)) {
                    let clone = items[itemsKey].cloneNode(true);
                    this.wrapper.appendChild(clone)
                }
            }
        }

    }

    // Find which transition is being used by the browser
    private _transitionFinder(): string {
        for (let transition in this.transitions) {
            if (this.transitions.hasOwnProperty(transition)) {
                if (this.sections[this.current].style[transition] !== undefined) {
                    return this.transitions[transition]
                }
            }
        }
    }


}

const container = document.getElementById('op-container');
const opSlider = new OPSlider(container, 1000);

