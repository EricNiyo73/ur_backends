/**
 * @swagger
 * components:
 *   schemas:
 *     UserModel:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           description: First name of the user
 *         lastname:
 *           type: string
 *           description: Last name of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *         emailToken:
 *           type: string
 *           description: Email verification token of the user
 *         isVerified:
 *           type: boolean
 *           description: Whether the user's email has been verified
 *         role:
 *           type: string
 *           description: Role of the user
 *           enum:
 *             - user
 *             - admin
 *             - leader
 *           default: user
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date and time when the user was created
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - emailToken
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user account and sends a verification email
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                 data:
 *                   type: object
 *                   description: Response data
 *                   properties:
 *                     user:
 *                       type: object
 *                       description: Created user object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: Unique ID of the user
 *                         firstname:
 *                           type: string
 *                           description: First name of the user
 *                         lastname:
 *                           type: string
 *                           description: Last name of the user
 *                         email:
 *                           type: string
 *                           description: Email address of the user
 *                         emailToken:
 *                           type: string
 *                           description: Verification token for the user's email address
 *       '400':
 *         description: Invalid email format
 *       '409':
 *         description: Email already exists
 *       '500':
 *         description: Unexpected error
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Authenticate user and get a JWT token
 *     description: Authenticate user with email and password, and return a JWT token
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Status message
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user
 *       '201':
 *         description: Invalid email or password
 *       '500':
 *         description: Unexpected error
 */

// =====================get all=========================

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags:
 *       - users
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       '500':
 *         description: Unexpected error
 */
// =============================update users=========================
/**
 * @swagger
 *
 * /user/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update a user with the given ID.
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: user
 *         description: The user object to update
 *         required: true
 *     responses:
 *       200:
 *         description: The updated user
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

// ======================delete========================

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a user based on their ID. Only the user who owns the account can delete their account.
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user making the request
 *             example:
 *               userId: 1234567890
 *     responses:
 *       '200':
 *         description: User successfully deleted
 *       '401':
 *         description: Only the user who owns the account can delete their account
 *       '404':
 *         description: User not found
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a users item by ID
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the users item to retrieve
 *     responses:
 *       200:
 *         description: Returns the users item with the specified ID
 *         schema:
 *           $ref: '#/definitions/users'
 *       404:
 *         description: users item not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /userbooking/cancel/{id}:
 *   patch:
 *     summary: Cancel a booking request
 *     tags:
 *       - Booking
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the booking request to cancel
 *     requestBody:
 *       description: Request body for canceling booking request
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 default: Cancelled
 *     responses:
 *       204:
 *         description: Booking cancelled successfully
 *       400:
 *         description: Failed to cancel booking request
 *       403:
 *         description: You can't cancel this booking
 *       404:
 *         description: Booking not found
 */
