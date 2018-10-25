/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed in the allFeeds object 
         * and ensures it has a URL defined and that the URL is not empty.
         */
         it('have URL defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined(); //checks if allFeeds object has a URL defined
                expect(feed.url.length).toBeGreaterThan(0);//checks allFeeds object URL is not empty
            })
         })


        /* A test that loops through each feed in the allFeeds object 
         * and ensures it has a name defined and that the name is not empty.
         */
         it('have name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();//checks allFeeds object has a name defined
                expect(feed.name.length).toBeGreaterThan(0);//checks allFeeds object's name is not empty
            })
         })

    });

    /*----------------------------------------------------
    ------------------------------------------------------
            A new test suite named "The menu" 
    ------------------------------------------------------
    ----------------------------------------------------*/

    describe('The menu', function() {

        it('hidden by default', function() {
            /* A test that ensures the menu element 
             * is hidden by default
             */
            const body = document.querySelector('body'); 
            expect(body.classList.contains('menu-hidden')).toBe(true);
         });



        it('changes visibility when the menu icon is clicked', function() {
            /* A test that ensures the menu changes
             * visibility when the menu icon is clicked
             */
            const body = document.querySelector('body');
            const menuIcon = document.querySelector('.menu-icon-link');

            menuIcon.click();//first click at menu 
            expect(body.classList.contains('menu-hidden')).toBe(false);//after first click the menu should be visibility
            menuIcon.click();//second click at menu
            expect(body.classList.contains('menu-hidden')).toBe(true);//after second click the menu should be hidden
        })
    })


    /*----------------------------------------------------
    ------------------------------------------------------
           A new test suite named "Initial Entries"
    ------------------------------------------------------
    ----------------------------------------------------*/
    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed function is called
         * function is called and completes its work
         * there is at least a single .entry element within 
         * the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should have at least a single entry element within the feed container', function(done) {
            let entries = document.querySelector('.feed .entry');//select all entry(child) under feed (parent)
            expect(entries.length).not.toBe(0);//there should be at least one entry
            done();
        });


    });


    /*----------------------------------------------------
    ------------------------------------------------------
           A new test suite named "New Feed Selection"
    ------------------------------------------------------
    ----------------------------------------------------*/

    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that 
         * the content actually changes
         */
         
         let previousFeed, lastFeed;//declares variables for first and second feed

         beforeEach(function(done) {
         	loadFeed(0, function() {
         		previousFeed = $('.feed').html();
         		loadFeed(1, function() {
         			lastFeed = $('.feed').html();
         			done();
         		});
         	});

         });
    
        
         it('should the feeds content actually changes', function(done) {
            expect(previousFeed).not.toBe(lastFeed);//checks the new feed is different than the previous feed
            done();
         });
    });

}());
