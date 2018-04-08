// $() function to ensure tests don't run until the DOM is ready.
$(function() {

    // 1st test suite: Checks RSS feeds definitions + allFeeds variable
    describe('RSS Feeds', function() {

        // Spec checks if allFeeds variable is defined and not empty
        it('are defined', function() {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length).not.toBe(0);
        });

        // Spec checks if each feed in allFeeds has a defined, not empty URL
         it('URLs are provided', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           });
         });

        // Spec checks if each feed in All feeds has a defined, not empty name
         it('Names are provided', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           });
         });
    });


    // 2nd test suite: Checks if menu functions correctly
    describe('The menu', function() {

        // Spec checks if menu element is hidden by default
        it('is hidden by default', function() {
           expect(document.getElementsByClassName('menu-hidden').length).not.toBe(0);
         });

        // Spec checks if menu changes visibility when menu icon is clicked
        it('changes visibility, when menu icon is clicked', function() {
          //Expectation at 1st click
          document.querySelector('.menu-icon-link').click();
          expect(document.getElementsByClassName('menu-hidden').length).toBe(0);
          //Expectation at 2nd click
          document.querySelector('.menu-icon-link').click();
          expect(document.getElementsByClassName('menu-hidden').length).not.toBe(0);
        });
    });

    // 3rd test suite: Checks if at least one entry is display on initial loadup
    describe('Initial Entries', function() {

        // Input because of asynchronous nature of loadFeed
        beforeEach(function(done) {
          loadFeed(0, done);
        });

        /* Spec checks that there's at least one entry after feed has loaded
        and accounts for asynchronous loadFeed function and beforeEach */
        it('has at least one entry element', function(done) {
          var container = $('.feed .entry');
          expect(container.length).toBeGreaterThan(0);
          done();
        });
    });

    // 4th test suite: Checks if content changes with new, selected feed
    describe('New Feed Selection', function() {

        // Input because of asynchronous nature of loadFeed
        beforeEach(function(done) {
          loadFeed(0, function() {
            initialFeed = $('.feed').html();
            // 2nd feed loaded for comparison
            loadFeed(1, function () {
              newFeed = $('.feed').html();
              done();
             });
           });
        });

        // Spec checks if new feed is loaded there is also new content
        it('changes content', function(done) {
          expect(initialFeed).not.toEqual(newFeed);
          done();
        });
    });

}());
