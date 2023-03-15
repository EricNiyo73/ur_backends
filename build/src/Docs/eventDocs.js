/**
 * @swagger
 * components:
 *   schemas:
 *     eventModel:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the event.
 *           readOnly: true
 *         eventTitle:
 *           type: string
 *           description: The title of the event.
 *           example: "My Event"
 *         eventContent:
 *           type: string
 *           description: The content of the event.
 *           example: "This is my event description."
 *         eventImage:
 *           type: string
 *           description: The URL of the image associated with the event.
 *           example: "https://example.com/images/my-event.jpg"
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date the event was created.
 *           readOnly: true
 *   requestBodies:
 *     EventRequestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               eventTitle:
 *                 type: string
 *                 description: The title of the event.
 *                 example: "My Event"
 *               eventContent:
 *                 type: string
 *                 description: The content of the event.
 *                 example: "This is my event description."
 *               eventImage:
 *                 type: string
 *                 format: binary
 *                 description: The image file for the event.
 *     UpdateEventRequestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               eventTitle:
 *                 type: string
 *                 description: The title of the event.
 *                 example: "My Event"
 *               eventContent:
 *                 type: string
 *                 description: The content of the event.
 *                 example: "This is my event description."
 *               eventImage:
 *                 type: string
 *                 format: binary
 *                 description: The updated image file for the event.
 */

// -==============================create events=========================

/**
 * @swagger
 * /events/create:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               eventImage:
 *                 type: string
 *                 format: binary
 *               eventTitle:
 *                 type: string
 *               eventContent:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully created a new event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 saveEvent:
 *                   type: object
 *                   $ref: '#/components/schemas/Event'
 *                 status:
 *                   type: string
 *       '400':
 *         description: Bad request, missing required fields
 *       '500':
 *         description: Internal server error
 */

// ===========================get all events==================

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     responses:
 *       200:
 *         description: A list of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 */

// ========================one events=====================
/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get a single event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the event object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error, please try again later
 */

// ===================get all=====================

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     description: Retrieve a list of all events.
 *     responses:
 *       200:
 *         description: OK. Returns a list of all events.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the event.
 *                       name:
 *                         type: string
 *                         description: The name of the event.
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time of the event.
 *                       location:
 *                         type: string
 *                         description: The location of the event.
 *                       description:
 *                         type: string
 *                         description: A description of the event.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */

// ==================update=============================

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event by ID
 *     tags: [Events]
 *     description: Update an existing event with new data.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the event to update.
 *     requestBody:
 *       required: true
 *       description: The updated event data, including an image file.
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               eventTitle:
 *                 type: string
 *                 description: The updated eventTitle of the event.
 *               eventContent:
 *                 type: string
 *                 description: The updated description of the event.
 *               eventImage:
 *                 type: string
 *                 format: binary
 *                 description: An updated image file for the event.
 *     responses:
 *       200:
 *         description: OK. Returns the updated event.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the updated event.
 *                 name:
 *                   type: string
 *                   description: The updated name of the event.
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: The updated date and time of the event.

 *                 description:
 *                   type: string
 *                   description: The updated description of the event.
 *                 image:
 *                   type: string
 *                   description: The URL of the updated image file for the event.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */

// ======================delete===========================

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     description: Delete an existing event by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the event to delete.
 *     responses:
 *       200:
 *         description: OK. Returns a success message indicating the event was deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the event was deleted.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */
"use strict";
//# sourceMappingURL=eventDocs.js.map