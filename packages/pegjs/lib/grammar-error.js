// Thrown when the grammar contains an error.
export class GrammarError {

    constructor( message, location ) {

        this.name = "GrammarError";
        this.message = message;
        this.location = location;

        if ( typeof Error.captureStackTrace === "function" ) {

            Error.captureStackTrace( this, GrammarError );

        }

    }

}
