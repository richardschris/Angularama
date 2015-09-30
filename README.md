# angularama

An NFL schedule browser.

## Build & development

Use `npm install` & `bower install` to prepare appropriate packages.

Run `grunt` for building and `grunt serve` for preview.

You need to also run app/nflserve.py for the Flask-based REST service (only tested with Python 3). You need
flask-cors installed, as well.

## Testing

Running `grunt test` will run the unit tests with karma.
