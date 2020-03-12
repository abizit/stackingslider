# Stack Slider

> JavaScript Stacking and unstacking slider.

- [Demo](https://jsfiddle.net/studiomatrix/jcmgd7t4/)

## Main

```text
dist/
├── stackslider.css
├── stackslider.js 
```

## Getting started

### Installation

```shell
npm i stack-slider
```

In browser:

```html
<link  href="/path/to/stackslider.css" rel="stylesheet">
<script src="/path/to/stackslider.js"></script>
```

### Usage

#### Syntax

```js
var container = document.getElementById('op-container');
new OPSlider(container, 1000); 
```

- **element**
  - Type: `HTMLElement`
  - The target id of the slider.

- **options** 
  - Type: `Number`
  - Transition time in milliseconds

#### Example

```html
<section id="op-container">
    <div class="op-wrapper">
        <section id="slide-1" class="slide-item">
            {{content}}            
        </section>
        <section id="slide-2" class="slide-item">
            {{content}}            
        </section>
    </div>
</section>
```

```css
/* Ensure the slider fits perfectly */
 html,body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}
```
#### Notes

- There should atleast be 2 items in the slider.


## Browser support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer 9+

## License

[MIT](https://opensource.org/licenses/MIT) © [Studio Matrix](https://studiomatrix.com.np/)
