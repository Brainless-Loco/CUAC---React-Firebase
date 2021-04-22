// These are collection names of Firebase's Firestore database.
// Look up the firebase console for data structure and organization.
const CollectionNames = {
    slides: 'slides',
    affiliates: 'affiliates',
    items: 'items',
    pending_members: 'pending_members'
}

// Make all sorts of error messages here. Do not hard-code texts. This kind of practice helps us to reuse resources.
const ErrorMessages = {
    not_found: '404 Not found',
    internal_error: 'Internal error',
    server_no_response: 'The server didn\'t respond.\nPlease check your internet connection or try again later.',
    file_not_found: 'The requested file doesn\'t exist or has been removed.'
}

// Make warning messages here.
const WarningMessages = {
    invalid_email: 'The email you\'ve entered is either not associated with an account or is invalid.'
}

// Commonly used string data
const Strings = {
    placeholder_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' +
                        'magna aliqua. Duis convallis convallis tellus id interdum. Morbi enim nunc faucibus a pellentesque sit. ' +
                        'Quisque non tellus orci ac auctor. Pharetra et ultrices neque ornare. Aliquam nulla facilisi cras fermentum ' +
                        'odio eu. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Ultrices gravida dictum fusce ' +
                        'ut placerat orci. Ultrices neque ornare aenean euismod elementum nisi. Sit amet massa vitae tortor. Enim ' +
                        'facilisis gravida neque convallis a. Vitae ultricies leo integer malesuada nunc. Montes nascetur ridiculus mus ' +
                        'mauris vitae ultricies leo. Sed cras ornare arcu dui.',
    phone_hint: '+88 01X-YYYY-ZZZZ',
    more_frequently_used_text: 'Your text here',
}

// Add more commonly used attributes here, such as dimentions, numbers, placeholders etc.











export {CollectionNames, ErrorMessages, WarningMessages, Strings};