var OPSlider = /** @class */ (function () {
    function OPSlider(selector, transitionTime) {
        this.selector = selector;
        this.transitionTime = transitionTime;
        this.isSliding = false;
        this.transitions = {
            "transition": "transitionend",
            "OTransition": "oTransitionEnd",
            "MozTransition": "transitionend",
            "WebkitTransition": "webkitTransitionEnd"
        };
        this.wrapper = this.selector.querySelector('.op-wrapper');
        var items = this.wrapper.querySelectorAll('.slide-item');
        this._itemsClone(items);
        this.sections = Array.prototype.slice.call(this.wrapper.querySelectorAll('.slide-item'));
        this.sectionsCount = this.sections.length;
        this.current = 0;
        this.init();
    }
    OPSlider.prototype.init = function () {
        var _this = this;
        if (this.sectionsCount < 2) {
            console.log('Need minimum two slides');
            return;
        }
        // set transition time to :root to be used by CSS
        document.documentElement.style.setProperty('--transitiontime', this.transitionTime.toString() + "ms");
        // find which transitionEnd is being used by the browser
        this.sectionTransition = this._transitionFinder();
        //Setup initial Classes to the slider
        this.selector.classList.add('op-outer');
        this.sections[this.current].classList.add('active-item');
        this.sections[this.current + 1].classList.add('next-item');
        this.sections[this.sectionsCount - 1].classList.add('prev-item');
        // Setup Left Right Navigation
        var navLeft = document.createElement('div'), navRight = document.createElement('div'), nav = document.createElement('nav');
        navLeft.className = 'op-nav-left';
        navRight.className = 'op-nav-right';
        nav.className = 'op-nav';
        nav.appendChild(navLeft);
        nav.appendChild(navRight);
        this.selector.insertBefore(nav, this.wrapper);
        navLeft.addEventListener('click', function () {
            _this._navigate('prev');
        });
        navRight.addEventListener('click', function () {
            _this._navigate('next');
        });
    };
    OPSlider.prototype._navigate = function (direction) {
        var _this = this;
        // check if transition is still happening
        if (this.isSliding) {
            return;
        }
        this.isSliding = true;
        var prev = this.current === 0 ? this.sectionsCount - 1 : this.current - 1;
        var next = this.current < this.sectionsCount - 1 ? this.current + 1 : 0;
        var nextSection;
        if (direction === 'next') {
            nextSection = next < this.sectionsCount - 1 ? next + 1 : 0;
        }
        if (direction === 'prev') {
            nextSection = prev > 0 ? prev - 1 : this.sectionsCount - 1;
        }
        this._transitionSlide(nextSection, direction, prev, next);
        // Add TransitionEnd eventlistener to the active slide
        this.sections[this.current].addEventListener(this.sectionTransition, function () { return _this._triggertransitionEnd(); }, false);
    };
    OPSlider.prototype._triggertransitionEnd = function () {
        this.isSliding = false;
    };
    // Trigger Transition Event
    OPSlider.prototype._transitionSlide = function (nextSection, direction, prev, next) {
        var _this = this;
        // Remove the eventlistener from the previous active slider
        this.sections[nextSection].removeEventListener(this.sectionTransition, function () { return _this._triggertransitionEnd(); }, false);
        this.sections.forEach(function (el) {
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
    };
    // Clone Items for circular effect
    // if the slides are less than or equal to 2 clone 3 times so as to have atleast 6 slides
    OPSlider.prototype._itemsClone = function (items) {
        for (var itemsCount = items.length <= 2 ? 3 : items.length; itemsCount <= items.length; itemsCount++) {
            for (var itemsKey in items) {
                if (items.hasOwnProperty(itemsKey)) {
                    var clone = items[itemsKey].cloneNode(true);
                    this.wrapper.appendChild(clone);
                }
            }
        }
    };
    // Find which transition is being used by the browser
    OPSlider.prototype._transitionFinder = function () {
        for (var transition in this.transitions) {
            if (this.transitions.hasOwnProperty(transition)) {
                if (this.sections[this.current].style[transition] !== undefined) {
                    return this.transitions[transition];
                }
            }
        }
    };
    return OPSlider;
}());
var container = document.getElementById('op-container');
var opSlider = new OPSlider(container, 1000);
//# sourceMappingURL=stackslider.js.map