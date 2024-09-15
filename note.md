//Below is the pattern of the pattern you use in writing codes. both in code and off codes and why they are used. Use it to document your codes.



// Importing the Express framework to create our web server
import express from 'express';

// Importing the MongoDB driver to interact with MongoDB
import { MongoClient } from 'mongodb';

// Importing the dotenv package to securely manage environment variables
import dotenv from 'dotenv';




// Initializing the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to enable CORS
app.use(cors());

// Route to handle GET requests for retrieving users
app.get('/users', async (req, res) => {
    try {
        // Connecting to the MongoDB database
        const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Getting the database instance
        const db = client.db(process.env.DB_NAME);

        // Retrieving users from the 'users' collection
        const users = await db.collection('users').find().toArray();

        // Sending the users back to the client
        res.status(200).json(users);
    } catch (error) {
        // Handling errors
        console.error(error);
        res.status(500).send('An error occurred while fetching users.');
    } finally {
        // Closing the database connection
        client.close();
    }
});

// Starting the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



/**
 * Short description of the function.
 *
 * Long description of the function detailing its purpose, usage, and side effects.
 *
 * @param type $paramName Description of the parameter including expected type and what it represents.
 * @return type|null Description of the return value including type and meaning. Mention null return if applicable.
 * @throws ExceptionType Description of circumstances under which the exception is thrown.
 * @since x.x.x Version when this was added.
 * @todo Add any future considerations or improvements here.
 *
 * @example
 * <code>
 * // Example usage of the function.
 * </code>
 */
function functionName($paramName) {
    // Function body starts here.
}



/**
 * Short description of the class.
 *
 * Long description of the class detailing its purpose, usage, and how it fits within the larger system.
 *
 * @package PackageName
 * @author Your Name <your.email@example.com>
 * @since x.x.x Version when this class was introduced.
 * @todo Add any future considerations or improvements here.
 */
class ClassName {
    
    /**
     * Short description of the property.
     *
     * Long description of the property detailing its purpose and usage.
     *
     * @var type Description of the variable type and what it represents.
     */
    private $propertyName;

    /**
     * Constructor.
     *
     * Detailed description of the constructor including its parameters and what it initializes.
     *
     * @param type $paramName Description of the parameter including expected type and what it represents.
     */
    public function __construct($paramName) {
        // Constructor body starts here.
    }

    /**
     * Short description of the method.
     *
     * Long description of the method detailing its purpose, usage, and side effects.
     *
     * @param type $paramName Description of the parameter including expected type and what it represents.
     * @return type|null Description of the return value including type and meaning. Mention null return if applicable.
     * @throws ExceptionType Description of circumstances under which the exception is thrown.
     * @since x.x.x Version when this method was added.
     */
    public function methodName($paramName) {
        // Method body starts here.
    }
}



### pages 
/dashboard 
/