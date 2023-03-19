/**
 * @swagger
 * components:
 *   schemas:
 *     bookUser:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - facility
 *         - maxPeople
 *         - desc
 *         - date
 *         - time
 *       properties:
 *         firstname:
 *           type: string
 *           description: First name of the user making the booking
 *         lastname:
 *           type: string
 *           description: Last name of the user making the booking
 *         email:
 *           type: string
 *           description: Email of the user making the booking
 *         facility:
 *           type: string
 *           description: Name of the facility being booked
 *         subFacility:
 *           type: string
 *           description: Name of the sub-facility being booked
 *         maxPeople:
 *           type: integer
 *           description: Maximum number of people allowed in the facility
 *         desc:
 *           type: string
 *           description: Description of the booking
 *         date:
 *           type: date
 *           description: Date of the booking
 *         time:
 *           type: string
 *           description: Time slot for the booking (Morning, Afternoon, or Fullday)
 *         isAvailable:
 *           type: boolean
 *           description: Availability status of the booking
 *         status:
 *           type: string
 *           description: Status of the booking (Pending, Approved, or Rejected)
 *           enum:
 *             - Pending
 *             - Approved
 *             - Rejected
 *       example:
 *         firstname: Eric
 *         lastname: NIYO
 *         email: ericniyokwizerwa1@gmail.com
 *         facility: Gym
 *         subFacility: Treadmill
 *         maxPeople: 5
 *         desc: Booked for a workout session
 *         date: 2023-03-10
 *         time: Morning
 *         isAvailable: false
 *         status: Pending
 */


/** 
 * @swagger
 * 
 * userbooking/checkAvailability:
 *   put:
 *     summary: Check availability for a booking
 *     tags: [Booking]
 *     description: Check if a booking is available for the specified date and time
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subFacility:
 *                 type: string
 *                 description: Sub-facility name
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Booking date
 *               time:
 *                 type: string
 *                 enum: [Morning, Afternoon, Fullday]
 *                 description: Booking time
 *             required:
 *               - subFacility
 *               - date
 *               - time
 *     responses:
 *       '200':
 *         description: You can book now
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "you can book now"
 *       '201':
 *         description: Available booking
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Availablebooking"
 *       '403':
 *         description: No available booking for the specified date and time
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "No available booking for the specified date and time1"
 */


/**
 * @swagger
 * /userbooking/createbook/{userId}:
 *   post:
 *     summary: Create a new booking for a user
 *     description: Creates a new booking for a user for a specific date and time, for a sub-facility.
 *     tags:
 *       - Booking
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to create the booking for.
 *     requestBody:
 *       description: The booking details to create a new booking.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               facility:
 *                 type: string
 *                 description: The Main-facility for which the user wants to create a booking.
 *               subFacility:
 *                 type: string
 *                 description: The sub-facility for which the user wants to create a booking.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date on which the user wants to create the booking.
 *               time:
 *                 type: string
 *                 format: time
 *                 description: The time at which the user wants to create the booking. May be Morning, Afternoon or Fullday.
 *               maxPeople:
 *                 type: number
 *                 description: The capacity of the sub-facility.
 *               desc:
 *                 type: string
 *                 description: The description of the sub-facility.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Booking request submitted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A message indicating the success of the operation.

 *       400:
 *         description: Invalid input parameters
 *       401:
 *         description: No available booking for the specified date and time
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   definitions:
 *     Booking:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the booking.
 *         facility:
 *           type: string
 *           description: The Main-facility for which the user wants to create a booking.
 *         subFacility:
 *           type: string
 *           description: The sub-facility for which the user wants to create a booking.
 *         date:
 *           type: string
 *           format: date
 *           description: The date on which the user wants to create the booking.
 *         time:
 *           type: string
 *           format: time
 *           description: The time at which the user wants to create the booking.
 *         capacity:
 *           type: number
 *           description: The capacity of the sub-facility.
 *         firstname:
 *           type: string
 *           description: The first name of the user who made the booking.
 *         lastname:
 *           type: string
 *           description: The last name of the user who made the booking.
 *         email:
 *           type: string
 *           description: The email of the user who made the booking
 */



// ===========================update your booking=============================

/**
 * @swagger
 * /userbooking/{id}:
 *   put:
 *     summary: Update an existing booking
 *     description: Updates an existing booking for a user with a given booking ID.
 *     tags:
 *       - Booking
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the booking to update.
 *     requestBody:
 *       description: Request body for updating a booking.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               facility:
 *                 type: string
 *                 description: The Main-facility for which the user wants to create a booking.
 *               subFacility:
 *                 type: string
 *                 description: The sub-facility for which the user wants to create a booking.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date on which the user wants to create the booking.
 *               time:
 *                 type: string
 *                 format: time
 *                 description: The time at which the user wants to create the booking. May be Morning, Afternoon or Fullday.
 *               maxPeople:
 *                 type: number
 *                 description: The capacity of the sub-facility.
 *               desc:
 *                 type: string
 *                 description: The description of the sub-facility.
 *             example:
 *               facility: Main Facility
 *               subFacility: Sub Facility
 *               date: 2023-03-10
 *               time: Morning
 *               maxPeople: 10
 *               desc: Sample Description
 *     responses:
 *       '200':
 *         description: Successfully updated the booking.
 *       '404':
 *         description: The booking with the provided ID was not found.
 *       '500':
 *         description: An internal server error occurred while trying to update the booking.
 */

// ======================get one booking=====================
/**
 * @swagger
 * /userbooking/{id}:
 *   get:
 *     summary: Get a specific booking
 *     description: Returns a specific booking based on the provided ID.
 *     tags:
 *       - Booking
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the booking to retrieve.
 *     responses:
 *       200:
 *         description: The booking object with the provided ID.
 *         content:
 *       404:
 *         description: A booking with the provided ID was not found.
 *       500:
 *         description: Internal server error.
 */


// =====================get all booking====================
/**
 * @swagger
 * /userbooking:
 *   get:
 *     summary: Get all bookings
 *     description: Retrieve a list of all bookings.
 *     tags:
 *       - Booking
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Server error
 */
// ================delete====================
/**
 * @swagger
 * /userbooking/{id}:
 *   delete:
 *     summary: Delete a booking
 *     description: Deletes a booking by its ID.
 *     tags:
 *       - Booking
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the booking to delete.
 *     responses:
 *       204:
 *         description: Successfully deleted the booking.
 *       404:
 *         description: Booking not found.
 *       400:
 *         description: Error while deleting the booking.
 */